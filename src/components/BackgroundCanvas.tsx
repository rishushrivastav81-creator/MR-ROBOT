import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  type: 'star' | 'heart' | 'orb';
  rotation: number;
  rotSpeed: number;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create subtle particles
    const particleCount = Math.min(45, Math.floor((width * height) / 18000));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isHeart = Math.random() < 0.2; // 20% delicate hearts
      const isOrb = Math.random() < 0.25;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isHeart ? Math.random() * 6 + 7 : isOrb ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
        speedY: -(Math.random() * 0.4 + 0.15), // Slow gentle upward float
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1,
        maxOpacity: Math.random() * 0.5 + 0.3,
        type: isHeart ? 'heart' : isOrb ? 'orb' : 'star',
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
      });
    }

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      // Top left curve
      context.bezierCurveTo(-size / 2, -topCurveHeight, -size, size / 3, 0, size);
      // Top right curve
      context.bezierCurveTo(size, size / 3, size / 2, -topCurveHeight, 0, topCurveHeight);
      context.closePath();
      context.fillStyle = `rgba(244, 114, 182, ${opacity * 0.45})`;
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark Luxury / Travel Theme Radial Gradient
      const bgGradient = ctx.createRadialGradient(
        width * 0.85,
        height * 0.15,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 1.1
      );
      bgGradient.addColorStop(0, '#3d0d1a');
      bgGradient.addColorStop(0.45, '#1a050b');
      bgGradient.addColorStop(1, '#0d0205');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Deep ruby luxury glow orbs
      const topOrb = ctx.createRadialGradient(
        width * 0.9,
        0,
        0,
        width * 0.9,
        0,
        Math.min(width, height) * 0.7
      );
      topOrb.addColorStop(0, 'rgba(77, 10, 27, 0.45)');
      topOrb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topOrb;
      ctx.fillRect(0, 0, width, height);

      const bottomOrb = ctx.createRadialGradient(
        0,
        height,
        0,
        0,
        height,
        Math.min(width, height) * 0.8
      );
      bottomOrb.addColorStop(0, 'rgba(99, 11, 30, 0.35)');
      bottomOrb.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bottomOrb;
      ctx.fillRect(0, 0, width, height);

      // Draw and update particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        // Wrap around
        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.rotation);
        } else if (p.type === 'orb') {
          const radial = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          radial.addColorStop(0, `rgba(253, 164, 175, ${p.opacity * 0.8})`);
          radial.addColorStop(1, 'rgba(253, 164, 175, 0)');
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = radial;
          ctx.fill();
        } else {
          // Tiny glowing star speck
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 230, 240, ${p.opacity * 0.75})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(244, 114, 182, 0.8)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="romantic-canvas-bg"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
