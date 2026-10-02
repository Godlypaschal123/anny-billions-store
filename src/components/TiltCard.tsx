import React, { useRef, useState, useCallback, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default: 8 for subtle luxury look)
  scale?: number; // Scale factor on hover (default: 1.02)
  perspective?: number; // 3D perspective depth in px (default: 1000)
  glare?: boolean; // Enable gold specular glare reflection (default: true)
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  perspective = 1000,
  glare = true,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
  });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
  });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(media.matches);
    const handler = () => setIsReducedMotion(media.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isReducedMotion || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates from -1 to 1
      const xPercent = (clientX / rect.width) * 2 - 1;
      const yPercent = (clientY / rect.height) * 2 - 1;

      // Subtle rotation values
      const rotateX = -yPercent * maxTilt;
      const rotateY = xPercent * maxTilt;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`,
        transition: 'transform 0.1s ease-out',
      });

      if (glare) {
        const glareX = ((clientX / rect.width) * 100).toFixed(1);
        const glareY = ((clientY / rect.height) * 100).toFixed(1);
        setGlareStyle({
          opacity: 0.85,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(251, 191, 36, 0.22) 0%, rgba(245, 158, 11, 0.08) 35%, transparent 75%)`,
          transition: 'opacity 0.2s ease-out',
        });
      }
    },
    [isReducedMotion, maxTilt, perspective, scale, glare]
  );

  const handleMouseEnter = useCallback(() => {
    if (isReducedMotion) return;
    setStyle((prev) => ({
      ...prev,
      transition: 'transform 0.15s ease-out',
    }));
  }, [isReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
    });
    if (glare) {
      setGlareStyle({
        opacity: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
        transition: 'opacity 0.6s ease-out',
      });
    }
  }, [perspective, glare]);

  // Touch handlers for mobile devices
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (isReducedMotion || !cardRef.current || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = cardRef.current.getBoundingClientRect();
      const clientX = touch.clientX - rect.left;
      const clientY = touch.clientY - rect.top;

      // Check if touch is within bounds
      if (
        clientX < 0 ||
        clientX > rect.width ||
        clientY < 0 ||
        clientY > rect.height
      ) {
        return;
      }

      // Halved tilt on mobile touch to keep it ultra smooth
      const xPercent = (clientX / rect.width) * 2 - 1;
      const yPercent = (clientY / rect.height) * 2 - 1;
      const rotateX = -yPercent * (maxTilt * 0.5);
      const rotateY = xPercent * (maxTilt * 0.5);

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1)`,
        transition: 'transform 0.15s ease-out',
      });

      if (glare) {
        const glareX = ((clientX / rect.width) * 100).toFixed(1);
        const glareY = ((clientY / rect.height) * 100).toFixed(1);
        setGlareStyle({
          opacity: 0.6,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(251, 191, 36, 0.18) 0%, transparent 70%)`,
          transition: 'opacity 0.2s ease-out',
        });
      }
    },
    [isReducedMotion, maxTilt, perspective, glare]
  );

  const handleTouchEnd = useCallback(() => {
    handleMouseLeave();
  }, [handleMouseLeave]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={style}
      className={`relative will-change-transform transform-gpu ${className}`}
    >
      {children}
      {glare && !isReducedMotion && (
        <div
          aria-hidden="true"
          style={glareStyle}
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-20 mix-blend-screen"
        />
      )}
    </div>
  );
};
