import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Background3DProps {
  theme: 'dark' | 'light';
}

export const Background3D: React.FC<Background3DProps> = ({ theme }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  const updateColorsRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(
      themeRef.current === 'dark' ? 0x09090b : 0xfafaf9,
      0.0018
    );

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 85;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Particle Nebula (Warm Gold, Emerald, Ruby - NO BLUE)
    const particleCount = prefersReducedMotion ? 400 : (window.innerWidth < 768 ? 600 : 1200);
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 40 + Math.random() * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = (Math.random() - 0.5) * 160;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const colorAttribute = new THREE.BufferAttribute(colors, 3);
    particleGeometry.setAttribute('color', colorAttribute);

    // Soft circle canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.35, 'rgba(255,255,255,0.7)');
      gradient.addColorStop(0.8, 'rgba(255,255,255,0.1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.75 : 0.45,
      blending: themeRef.current === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    mainGroup.add(particles);

    // 2. Central Geometric Cyber Core (Wireframe Gold & Emerald - NO BLUE)
    const coreGroup = new THREE.Group();
    coreGroup.position.set(25, 5, -10);

    const icoGeo = new THREE.IcosahedronGeometry(18, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: themeRef.current === 'dark' ? 0xf59e0b : 0xb45309,
      wireframe: true,
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.22 : 0.16,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icoMesh);

    const innerIcoGeo = new THREE.IcosahedronGeometry(10, 0);
    const innerIcoMat = new THREE.MeshBasicMaterial({
      color: themeRef.current === 'dark' ? 0x10b981 : 0x059669,
      wireframe: true,
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.32 : 0.2,
    });
    const innerIcoMesh = new THREE.Mesh(innerIcoGeo, innerIcoMat);
    coreGroup.add(innerIcoMesh);

    const ringGeo = new THREE.TorusGeometry(26, 0.4, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: themeRef.current === 'dark' ? 0xf43f5e : 0xe11d48,
      wireframe: true,
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.24 : 0.15,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreGroup.add(ringMesh);

    mainGroup.add(coreGroup);

    // Color updater function for Dark vs Light mode
    const applyColors = () => {
      const isDark = themeRef.current === 'dark';
      
      const c1 = isDark ? new THREE.Color(0xf59e0b) : new THREE.Color(0xb45309); // Amber / Gold
      const c2 = isDark ? new THREE.Color(0x10b981) : new THREE.Color(0x059669); // Emerald
      const c3 = isDark ? new THREE.Color(0xf43f5e) : new THREE.Color(0x78716c); // Rose or Warm Stone

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const mixRatio = Math.random();
        const pColor = mixRatio < 0.5 
          ? c1.clone().lerp(c2, mixRatio * 2) 
          : c2.clone().lerp(c3, (mixRatio - 0.5) * 2);

        colors[i3] = pColor.r;
        colors[i3 + 1] = pColor.g;
        colors[i3 + 2] = pColor.b;
      }
      colorAttribute.needsUpdate = true;

      particleMaterial.opacity = isDark ? 0.75 : 0.45;
      particleMaterial.blending = isDark ? THREE.AdditiveBlending : THREE.NormalBlending;
      particleMaterial.needsUpdate = true;

      icoMat.color.setHex(isDark ? 0xf59e0b : 0xb45309);
      icoMat.opacity = isDark ? 0.22 : 0.16;

      innerIcoMat.color.setHex(isDark ? 0x10b981 : 0x059669);
      innerIcoMat.opacity = isDark ? 0.32 : 0.2;

      ringMat.color.setHex(isDark ? 0xf43f5e : 0xe11d48);
      ringMat.opacity = isDark ? 0.24 : 0.15;

      scene.fog = new THREE.FogExp2(isDark ? 0x09090b : 0xfafaf9, 0.0018);
    };

    applyColors();
    updateColorsRef.current = applyColors;

    // Mouse and Scroll tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollProgress = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let isVisible = true;

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      particles.rotation.y = elapsedTime * 0.04 + scrollProgress * Math.PI * 0.8;
      particles.rotation.x = currentY * 0.2 + scrollProgress * 0.5;

      icoMesh.rotation.x = elapsedTime * 0.15;
      icoMesh.rotation.y = elapsedTime * 0.2;
      innerIcoMesh.rotation.x = -elapsedTime * 0.25;
      innerIcoMesh.rotation.y = -elapsedTime * 0.3;
      ringMesh.rotation.z = elapsedTime * 0.1;
      ringMesh.rotation.y = elapsedTime * 0.08;

      coreGroup.position.y = 5 - scrollProgress * 30;
      coreGroup.position.x = 25 - scrollProgress * 45;
      coreGroup.rotation.z = scrollProgress * Math.PI;

      camera.position.x += (currentX * 12 - camera.position.x) * 0.04;
      camera.position.y += (-currentY * 8 - (scrollProgress * 25) - camera.position.y) * 0.04;
      camera.lookAt(0, -scrollProgress * 15, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);

      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      innerIcoGeo.dispose();
      innerIcoMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Watch for theme updates and re-apply colors seamlessly without re-creating scene
  useEffect(() => {
    if (updateColorsRef.current) {
      updateColorsRef.current();
    }
  }, [theme]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
