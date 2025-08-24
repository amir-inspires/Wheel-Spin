import React from "react";

export default function ProgressCircle({ value, max }) {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="absolute top-0 left-0" width="96" height="96" viewBox="0 0 96 96">
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="#a78bfa"
          strokeWidth="8"
          fill="none"
          opacity="0.2"
        />
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="#f472b6"
          strokeWidth="8"
          fill="none"
          strokeDasharray={2 * Math.PI * 40}
          strokeDashoffset={2 * Math.PI * 40 * (1 - percent / 100)}
          style={{ transition: 'stroke-dashoffset 0.5s' }}
        />
      </svg>
      <span className="absolute text-lg font-bold text-purple-700 dark:text-purple-300">{value} / {max}</span>
    </div>
  );
}
