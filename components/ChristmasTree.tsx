
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ChristmasTree: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const isMobile = window.innerWidth < 768;
    const canvasSize = isMobile ? Math.min(window.innerWidth * 0.9, 400) : 600;
    
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(canvasSize, canvasSize * 1.2);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const treeGroup = new THREE.Group();
    scene.add(treeGroup);

    const layers = isMobile ? 7 : 8;
    for (let i = 0; i < layers; i++) {
      const radius = (layers - i) * (isMobile ? 0.7 : 0.9);
      const height = isMobile ? 1.2 : 1.4;
      const yPos = i * (isMobile ? 0.7 : 0.85) - 3.5;
      
      const leafCount = (isMobile ? 800 : 1200) - i * 80;
      const geometry = new THREE.BufferGeometry();
      const pos = new Float32Array(leafCount * 3);
      for (let j = 0; j < leafCount; j++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.8) * radius;
        pos[j * 3] = Math.cos(angle) * r;
        pos[j * 3 + 1] = Math.random() * height + yPos;
        pos[j * 3 + 2] = Math.sin(angle) * r;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      
      const material = new THREE.PointsMaterial({
        size: isMobile ? 0.04 : 0.05,
        color: new THREE.Color(0x052d11).lerp(new THREE.Color(0x2ed15d), i / layers),
        transparent: true,
        opacity: 0.8,
      });
      const points = new THREE.Points(geometry, material);
      treeGroup.add(points);
    }

    const ornamentColors = [0xe63946, 0xffd700, 0xf1faee, 0xff85a1, 0x48cae4];
    const ornaments: THREE.Mesh[] = [];
    const ballCount = isMobile ? 40 : 60;
    for (let i = 0; i < ballCount; i++) {
      const height = Math.random() * 6 - 3.5;
      const progress = (height + 3.5) / 6; 
      const radius = (1 - progress) * (isMobile ? 4.5 : 5.5) * 0.8;
      const angle = Math.random() * Math.PI * 2;
      
      const sphereGeo = new THREE.SphereGeometry(isMobile ? 0.1 : 0.14, 12, 12);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: ornamentColors[Math.floor(Math.random() * ornamentColors.length)],
        roughness: 0.2,
        metalness: 0.7,
        emissive: 0x111111,
      });
      const ball = new THREE.Mesh(sphereGeo, sphereMat);
      ball.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      treeGroup.add(ball);
      ornaments.push(ball);
    }

    const lightCount = isMobile ? 150 : 300;
    const lightPos = new Float32Array(lightCount * 3);
    for (let i = 0; i < lightCount; i++) {
      const t = i / lightCount;
      const angle = t * Math.PI * (isMobile ? 12 : 18); 
      const radius = (1 - t) * (isMobile ? 4.8 : 6.5) * 0.8;
      lightPos[i * 3] = Math.cos(angle) * radius;
      lightPos[i * 3 + 1] = t * 6 - 3.5;
      lightPos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const lightGeo = new THREE.BufferGeometry();
    lightGeo.setAttribute('position', new THREE.BufferAttribute(lightPos, 3));
    const lightMat = new THREE.PointsMaterial({
      size: isMobile ? 0.14 : 0.18,
      color: 0xffffee,
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.7
    });
    const lightPoints = new THREE.Points(lightGeo, lightMat);
    treeGroup.add(lightPoints);

    const starShape = new THREE.IcosahedronGeometry(isMobile ? 0.45 : 0.6, 1);
    const starMat = new THREE.MeshBasicMaterial({ color: 0xfff000 });
    const star = new THREE.Mesh(starShape, starMat);
    star.position.y = isMobile ? 2.6 : 3.2;
    treeGroup.add(star);

    const glowGeo = new THREE.SphereGeometry(isMobile ? 0.7 : 1.0, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 0.3
    });
    const starGlow = new THREE.Mesh(glowGeo, glowMat);
    starGlow.position.y = star.position.y;
    treeGroup.add(starGlow);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1.2, 15);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = isMobile ? 12 : 15;
    camera.position.y = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      treeGroup.rotation.y += 0.005;
      star.rotation.y += 0.02;
      starGlow.scale.setScalar(1 + Math.sin(Date.now() * 0.003) * 0.2);
      lightMat.opacity = 0.4 + Math.sin(Date.now() * 0.01) * 0.3;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      const newSize = newIsMobile ? Math.min(window.innerWidth * 0.9, 400) : 600;
      renderer.setSize(newSize, newSize * 1.2);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center pt-10 pb-4">
      <div ref={mountRef} className="filter drop-shadow-[0_0_50px_rgba(255,215,0,0.2)]" />
      <div className="mt-4 text-pink-100/30 font-serif-elegant italic tracking-[0.4em] text-xs animate-pulse uppercase">
        Infinite Love 2025
      </div>
    </div>
  );
};

export default ChristmasTree;
