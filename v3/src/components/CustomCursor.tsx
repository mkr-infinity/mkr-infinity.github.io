import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch / coarse pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let rafId: number;
    let targetX = -100;
    let targetY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable or interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!(
          target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('[role="button"]') ||
          target.closest('[data-cursor="pointer"]') ||
          window.getComputedStyle(target).cursor === 'pointer'
        );
        setIsHovered(isClickable);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth trailing physics
    let currentTrailX = -100;
    let currentTrailY = -100;

    const render = () => {
      currentTrailX += (targetX - currentTrailX) * 0.18;
      currentTrailY += (targetY - currentTrailY) * 0.18;
      setTrailingPos({ x: currentTrailX, y: currentTrailY });
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision Lead Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${
            isClicking ? 0.7 : isHovered ? 1.4 : 1
          })`,
        }}
      >
        <div
          className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
            isHovered
              ? 'bg-cyan-300 shadow-[0_0_12px_#00f2fe]'
              : 'bg-cyan-400 shadow-[0_0_8px_#00f2fe]'
          }`}
        />
      </div>

      {/* Trailing Reactive Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,border-color,background-color] duration-300 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
          width: isHovered ? '56px' : isClicking ? '26px' : '36px',
          height: isHovered ? '56px' : isClicking ? '26px' : '36px',
          marginLeft: isHovered ? '-28px' : isClicking ? '-13px' : '-18px',
          marginTop: isHovered ? '-28px' : isClicking ? '-13px' : '-18px',
          border: isHovered
            ? '1.5px solid rgba(0, 242, 254, 0.8)'
            : '1px solid rgba(139, 92, 246, 0.45)',
          backgroundColor: isHovered
            ? 'rgba(0, 242, 254, 0.12)'
            : 'rgba(139, 92, 246, 0.03)',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
        }}
      />
    </>
  );
};
