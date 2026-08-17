import React, { useEffect, useRef } from 'react';

export const BackgroundMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth spring interpolation
    const mouse = {
      x: width * 0.2,
      y: height * 0.3,
      targetX: width * 0.2,
      targetY: height * 0.3,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth interpolation for mouse position
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Clean 5-Dot Square Pattern (Quincunx Grid)
      // 4 corner dots form the square, 5th dot sits directly in the center
      const spacing = 22;
      const fadeRadius = Math.max(width, height) * 0.75;

      for (let x = 0; x < width + spacing; x += spacing) {
        for (let y = 0; y < height + spacing; y += spacing) {
          // 1. Primary grid corner dots
          const distToTopLeft = Math.hypot(x - 60, y - 60);
          const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);

          // Phase wave for organic dot pulse
          const wavePhase = Math.sin(x * 0.015 + y * 0.015 + time) * 0.06;

          let cornerAlpha = Math.max(0, 1 - distToTopLeft / fadeRadius) * (0.16 + wavePhase);
          if (distToMouse < 220) {
            cornerAlpha += (1 - distToMouse / 220) * 0.18;
          }

          if (cornerAlpha > 0.01) {
            ctx.fillStyle = `rgba(148, 163, 184, ${cornerAlpha})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.15, 0, Math.PI * 2);
            ctx.fill();
          }

          // 2. 5th Center Dot (strictly in the center of every 4-dot square)
          const cx = x + spacing / 2;
          const cy = y + spacing / 2;

          if (cx < width && cy < height) {
            const centerDistToTopLeft = Math.hypot(cx - 60, cy - 60);
            const centerDistToMouse = Math.hypot(cx - mouse.x, cy - mouse.y);
            const centerWavePhase = Math.sin(cx * 0.015 + cy * 0.015 + time + 1.5) * 0.05;

            let centerAlpha = Math.max(0, 1 - centerDistToTopLeft / fadeRadius) * (0.12 + centerWavePhase);
            if (centerDistToMouse < 220) {
              centerAlpha += (1 - centerDistToMouse / 220) * 0.16;
            }

            if (centerAlpha > 0.01) {
              ctx.fillStyle = `rgba(217, 154, 0, ${centerAlpha * 1.2})`; // Warm gold-tinted center 5th dot
              ctx.beginPath();
              ctx.arc(cx, cy, 1.05, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Subtle ambient cursor light aura
      const radialLight = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 280);
      radialLight.addColorStop(0, 'rgba(254, 243, 199, 0.18)');
      radialLight.addColorStop(0.6, 'rgba(254, 243, 199, 0.04)');
      radialLight.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = radialLight;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 280, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
