import { useEffect, useState, useRef } from 'react';

/**
 * Orange dot + outer circle that follows the cursor
 */
export function MouseFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [outerPos, setOuterPos] = useState({ x: -100, y: -100 });
  const posRef = useRef(pos);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    let raf: number;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      const { x: tx, y: ty } = posRef.current;
      setOuterPos((prev) => ({
        x: lerp(prev.x, tx, 0.12),
        y: lerp(prev.y, ty, 0.12),
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block" aria-hidden>
      {/* Outer circle - slightly larger, trails the dot */}
      <div
        className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#f97316]/40 transition-none"
        style={{ left: outerPos.x, top: outerPos.y }}
      />
      {/* Orange dot - follows cursor */}
      <div
        className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f97316] transition-none"
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  );
}
