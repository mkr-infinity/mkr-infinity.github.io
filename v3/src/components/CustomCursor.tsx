import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  theme: 'dark' | 'light';
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ theme }) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
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

  const isDark = theme === 'dark';

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
            isDark
              ? isHovered
                ? 'bg-amber-300 shadow-[0_0_12px_#fbbf24]'
                : 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
              : isHovered
              ? 'bg-amber-600 shadow-[0_0_10px_#d97706]'
              : 'bg-stone-900 shadow-[0_0_6px_rgba(0,0,0,0.4)]'
          }`}
        />
      </div>

      {/* Trailing Reactive Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,border-color,background-color] duration-300 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
          width: isHovered ? '54px' : isClicking ? '26px' : '34px',
          height: isHovered ? '54px' : isClicking ? '26px' : '34px',
          marginLeft: isHovered ? '-27px' : isClicking ? '-13px' : '-17px',
          marginTop: isHovered ? '-27px' : isClicking ? '-13px' : '-17px',
          border: isDark
            ? isHovered
              ? '1.5px solid rgba(245, 158, 11, 0.85)'
              : '1px solid rgba(245, 158, 11, 0.35)'
            : isHovered
            ? '1.5px solid rgba(217, 119, 6, 0.9)'
            : '1px solid rgba(41, 37, 36, 0.35)',
          backgroundColor: isDark
            ? isHovered
              ? 'rgba(245, 158, 11, 0.12)'
              : 'rgba(245, 158, 11, 0.02)'
            : isHovered
            ? 'rgba(217, 119, 6, 0.12)'
            : 'rgba(41, 37, 36, 0.03)',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
        }}
      />
    </>
  );
};
