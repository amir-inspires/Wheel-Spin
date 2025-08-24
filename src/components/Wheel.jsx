import { useMemo, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const SEGMENT_ICONS = ['💰','🎁','⭐️','🎉','💎','🍀','🏆'];
const COLORS = [
  'url(#grad1)', 'url(#grad2)', 'url(#grad3)', 'url(#grad4)', 'url(#grad5)', 'url(#grad6)', 'url(#grad7)'
];

function polar(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
function arcPath(cx, cy, r, start, end) {
  const s = polar(cx, cy, r, start);
  const e = polar(cx, cy, r, end);
  const large = end - start <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`;
}

const Wheel = forwardRef(function Wheel({ segments, onFinish, disabled, spinButtonClass, size = 340 }, ref) {
  const angle = 360 / segments.length;
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const wheelRef = useRef(null);

  const spin = () => {
    if (spinning || disabled) return;
    setSpinning(true);
    const targetIndex = Math.floor(Math.random() * segments.length);
    const targetBase = -targetIndex * angle;
    const normalized = ((rotation % 360) + 360) % 360;
    const delta = targetBase - normalized;
    const next = rotation + 360 * 4 + delta;
    setRotation(next);

    const done = () => {
      setSpinning(false);
      onFinish(segments[targetIndex]);
      wheelRef.current?.removeEventListener('transitionend', done);
    };
    wheelRef.current?.addEventListener('transitionend', done);
  };

  useImperativeHandle(ref, () => ({ spin }), [spinning, disabled, segments]);
  const wedges = useMemo(() => {
    const r = 45, cx = 50, cy = 50;
    return segments.map((s, i) => {
      const start = -90 + i * angle;
      const end = start + angle;
      const mid = (start + end) / 2;
      const textPos = polar(cx, cy, r * 0.62, mid);
      return { s, i, start, end, mid, textPos };
    });
  }, [segments]);

  // Gloss effect overlay
  const gloss = (
    <ellipse
      cx="50" cy="40" rx="38" ry="18"
      fill="url(#gloss)" opacity="0.5"
    />
  );

  return (
    <div className="relative flex flex-col items-center">
      {/* Downward pointing triangle above wheel */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-10 h-0 w-0 border-l-[16px] border-r-[16px] border-t-[24px] border-l-transparent border-r-transparent border-t-white" style={{ filter: 'drop-shadow(0 2px 8px #9D4EDD)' }} />
      <div
        ref={wheelRef}
        className={`relative select-none rounded-full shadow-2xl ring-4 ring-pink-400 dark:ring-purple-700 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900`}
        style={{
          height: `${size}px`,
          width: `${size}px`,
          transition: spinning ? 'transform 5s cubic-bezier(.17,.67,.2,1.02)' : 'transform 0s',
          transform: `rotate(${rotation}deg)`
        }}
        onClick={spin}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#60a5fa" />
            </linearGradient>
            <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <linearGradient id="grad4" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="grad5" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="grad6" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
            <linearGradient id="grad7" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <radialGradient id="gloss" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          {wedges.map(({ i, start, end }) => (
            <path
              key={i}
              d={arcPath(50,50,45,start,end)}
              fill={COLORS[i % COLORS.length]}
              stroke="rgba(0,0,0,.06)"
              strokeWidth="0.5"
            />
          ))}
          {wedges.map(({ i, mid, textPos, s }) => (
            <g key={`g-${i}`}
              transform={`rotate(${mid + 90}, ${textPos.x}, ${textPos.y})`}>
              <text
                x={textPos.x}
                y={textPos.y - 4}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="16"
                fontWeight="900"
                fill="white"
                style={{
                  textShadow: '0 2px 8px #000, 0 0px 2px #fff'
                }}
              >
                {SEGMENT_ICONS[i % SEGMENT_ICONS.length]}
              </text>
              <text
                x={textPos.x}
                y={textPos.y + 8}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fontWeight="700"
                fill="#FFD700"
                style={{
                  textShadow: '0 1px 4px #000'
                }}
              >
                {s}
              </text>
            </g>
          ))}
          {gloss}
          <circle cx="50" cy="50" r="7" fill="#fff" stroke="#fbbf24" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
});
export default Wheel;
