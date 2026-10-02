import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleAngle: number;
  hue: number; // 38 to 48 (amber/gold)
  hasCrossGlow: boolean;
}

export const GoldenDustCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000, active: false };
    let isRunning = true;

    // Check for user reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const initSize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      createParticles();
    };

    const createParticles = () => {
      const isMobile = width < 768;
      // Low particle count for high 60fps performance on mobile
      const count = isMobile ? 30 : 65;
      particles = [];

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2.2 + 0.8;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          // Gentle upward float with slight drift
          vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25),
          vy: -(Math.random() * 0.35 + 0.1),
          size,
          baseAlpha: Math.random() * 0.5 + 0.2,
          alpha: Math.random() * 0.5 + 0.2,
          twinkleSpeed: Math.random() * 0.025 + 0.01,
          twinkleAngle: Math.random() * Math.PI * 2,
          hue: 38 + Math.floor(Math.random() * 12), // Rich warm gold to amber
          hasCrossGlow: size > 2.2 && Math.random() > 0.6
        });
      }
    };

    // Render loop
    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Slow vertical floating & gentle harmonic drift
          p.x += p.vx + Math.sin(p.twinkleAngle * 0.5) * 0.12;
          p.y += p.vy;

          // Twinkle effect
          p.twinkleAngle += p.twinkleSpeed;
          p.alpha = p.baseAlpha + Math.sin(p.twinkleAngle) * 0.25;
          if (p.alpha < 0.05) p.alpha = 0.05;
          if (p.alpha > 0.85) p.alpha = 0.85;

          // Gentle mouse displacement
          if (mouse.active) {
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120 && dist > 0) {
              const force = (120 - dist) / 120;
              p.x += (dx / dist) * force * 0.8;
              p.y += (dy / dist) * force * 0.8;
            }
          }

          // Screen wrapping
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        // Draw golden particle with soft aura
        ctx.save();
        ctx.beginPath();
        const radGrad = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size * 3.5
        );
        radGrad.addColorStop(0, `hsla(${p.hue}, 95%, 70%, ${p.alpha})`);
        radGrad.addColorStop(0.4, `hsla(${p.hue}, 90%, 55%, ${p.alpha * 0.6})`);
        radGrad.addColorStop(1, `hsla(${p.hue}, 85%, 45%, 0)`);

        ctx.fillStyle = radGrad;
        ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue + 8}, 100%, 92%, ${Math.min(1, p.alpha * 1.3)})`;
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Subtle 4-point star twinkle for select magical particles
        if (p.hasCrossGlow && p.alpha > 0.4) {
          ctx.strokeStyle = `hsla(${p.hue}, 100%, 85%, ${p.alpha * 0.5})`;
          ctx.lineWidth = 0.75;
          const flareLen = p.size * 3;
          ctx.beginPath();
          ctx.moveTo(p.x - flareLen, p.y);
          ctx.lineTo(p.x + flareLen, p.y);
          ctx.moveTo(p.x, p.y - flareLen);
          ctx.lineTo(p.x, p.y + flareLen);
          ctx.stroke();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    initSize();
    render();

    // Event listeners
    const handleResize = () => {
      initSize();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // Pause animation when tab is inactive to preserve battery & CPU
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          render();
        }
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] opacity-75 mix-blend-screen transition-opacity duration-1000"
    />
  );
};
