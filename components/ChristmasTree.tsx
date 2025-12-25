
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ChristmasTree: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const isMobile = window.innerWidth < 768;
    const width = isMobile ? window.innerWidth : 600;
    const height = isMobile ? 450 : 600;
    
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const treeGroup = new THREE.Group();
    scene.add(treeGroup);

    // 树冠粒子层
    const layers = isMobile ? 6 : 8;
    for (let i = 0; i < layers; i++) {
      const radius = (layers - i) * (isMobile ? 0.8 : 0.9);
      const h = 1.4;
      const yPos = i * 0.8 - 3;
      
      const leafCount = 1000 - i * 100;
      const geometry = new THREE.BufferGeometry();
      const pos = new Float32Array(leafCount * 3);
      for (let j = 0; j < leafCount; j++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 0.8) * radius;
        pos[j * 3] = Math.cos(angle) * r;
        pos[j * 3 + 1] = Math.random() * h + yPos;
        pos[j * 3 + 2] = Math.sin(angle) * r;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const material = new THREE.PointsMaterial({
        size: 0.05,
        color: new THREE.Color(0x0a4d1c).lerp(new THREE.Color(0x1fb34c), i / layers),
        transparent: true,
        opacity: 0.8,
      });
      treeGroup.add(new THREE.Points(geometry, material));
    }

    // 树顶星
    const star = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.MeshBasicMaterial({ color: 0xffd700 })
    );
    star.position.y = 2.8;
    treeGroup.add(star);

    camera.position.z = 12;
    camera.position.y = 0;

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      treeGroup.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = window.innerWidth < 768 ? window.innerWidth : 600;
      const h = window.innerWidth < 768 ? 450 : 600;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="flex justify-center items-center w-full overflow-hidden" />
  );
};

export default ChristmasTree;
