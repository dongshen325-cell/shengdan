
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FloatingParticles: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 1. 深空繁星
    const starsCount = 2000;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount * 3; i++) {
      starPositions[i] = (Math.random() - 0.5) * 80;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      size: 0.035,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // 2. 细腻飘雪 (缓慢、轻盈)
    const snowCount = 800;
    const snowGeometry = new THREE.BufferGeometry();
    const snowPositions = new Float32Array(snowCount * 3);
    const snowVelocities = new Float32Array(snowCount);
    for (let i = 0; i < snowCount; i++) {
      snowPositions[i * 3] = (Math.random() - 0.5) * 30;
      snowPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      snowPositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      snowVelocities[i] = 0.005 + Math.random() * 0.015;
    }
    snowGeometry.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
    const snowMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const snow = new THREE.Points(snowGeometry, snowMaterial);
    scene.add(snow);

    // 3. 唯美博凯光斑 (Bokeh)
    const bokehCount = 40;
    const bokehGeometry = new THREE.BufferGeometry();
    const bokehPositions = new Float32Array(bokehCount * 3);
    for (let i = 0; i < bokehCount * 3; i++) {
      bokehPositions[i] = (Math.random() - 0.5) * 40;
    }
    bokehGeometry.setAttribute('position', new THREE.BufferAttribute(bokehPositions, 3));
    const bokehMaterial = new THREE.PointsMaterial({
      size: 1.5,
      color: 0xffb6c1,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const bokeh = new THREE.Points(bokehGeometry, bokehMaterial);
    scene.add(bokeh);

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);
      
      const positions = snow.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < snowCount; i++) {
        positions[i * 3 + 1] -= snowVelocities[i];
        positions[i * 3] += Math.sin(Date.now() * 0.0005 + i) * 0.002;
        if (positions[i * 3 + 1] < -15) positions[i * 3 + 1] = 15;
      }
      snow.geometry.attributes.position.needsUpdate = true;

      const bokehPos = bokeh.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < bokehCount; i++) {
        bokehPos[i * 3 + 1] += 0.002;
        if (bokehPos[i * 3 + 1] > 20) bokehPos[i * 3 + 1] = -20;
      }
      bokeh.geometry.attributes.position.needsUpdate = true;

      stars.rotation.y += 0.0001;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-[#07040d] pointer-events-none" />
      {/* 极光层：多层次渐变 */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[-10%] left-[-20%] w-[140%] h-[70%] bg-gradient-to-br from-indigo-900/30 via-purple-900/30 to-pink-900/30 blur-[150px] animate-aurora" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[50%] bg-gradient-to-tl from-blue-900/20 via-pink-900/20 to-transparent blur-[120px] animate-aurora-reverse" />
      </div>
      <style>{`
        @keyframes aurora {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); opacity: 0.3; }
          50% { transform: translate(5%, 2%) rotate(5deg) scale(1.1); opacity: 0.6; }
        }
        @keyframes aurora-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.2; }
          50% { transform: translate(-5%, -2%) rotate(-5deg); opacity: 0.5; }
        }
        .animate-aurora { animation: aurora 20s ease-in-out infinite; }
        .animate-aurora-reverse { animation: aurora-reverse 25s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default FloatingParticles;
