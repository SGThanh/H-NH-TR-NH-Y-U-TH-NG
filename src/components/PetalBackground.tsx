import React, { useMemo } from 'react';

interface PetalBackgroundProps {
  enabled?: boolean;
}

export const PetalBackground: React.FC<PetalBackgroundProps> = ({ enabled = true }) => {
  const elements = useMemo(() => {
    // Royal court mixture: Lotus petals (sen hoàng cung) and subtle gold leaf sparkles (vàng lá hoàng triều)
    return Array.from({ length: 22 }).map((_, i) => {
      const isGoldSparkle = i % 3 === 0;
      return {
        id: i,
        isGoldSparkle,
        left: `${(i * 4.6 + (i * 7.3) % 9) % 100}%`,
        animationDuration: isGoldSparkle ? `${9 + (i % 4) * 3}s` : `${14 + (i % 5) * 3}s`,
        animationDelay: `${(i * 0.6) % 9}s`,
        size: isGoldSparkle ? `${6 + (i % 3) * 3}px` : `${12 + (i % 4) * 4}px`,
        opacity: isGoldSparkle ? 0.45 : 0.22 + (i % 3) * 0.1,
        rotateInit: `${(i * 40) % 360}deg`,
        swayDuration: `${3.5 + (i % 3)}s`,
      };
    });
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes royalFall {
          0% {
            transform: translateY(-4vh) rotate(0deg);
          }
          100% {
            transform: translateY(105vh) rotate(360deg);
          }
        }
        @keyframes royalSway {
          0%, 100% {
            margin-left: 0px;
          }
          50% {
            margin-left: 28px;
          }
        }
      `}</style>
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute"
          style={{
            left: el.left,
            top: 0,
            animation: `royalFall ${el.animationDuration} linear infinite`,
            animationDelay: el.animationDelay,
          }}
        >
          <div
            style={{
              animation: `royalSway ${el.swayDuration} ease-in-out infinite alternate`,
              width: el.size,
              height: el.isGoldSparkle ? el.size : `calc(${el.size} * 1.35)`,
              borderRadius: el.isGoldSparkle ? '50%' : '50% 0 50% 50%',
              backgroundColor: el.isGoldSparkle ? '#E5C158' : '#F4D2D8',
              opacity: el.opacity,
              boxShadow: el.isGoldSparkle
                ? '0 0 8px rgba(212, 175, 55, 0.6)'
                : '0 2px 6px rgba(140, 29, 47, 0.15)',
              transform: `rotate(${el.rotateInit})`,
            }}
          />
        </div>
      ))}
    </div>
  );
};
