import React from "react";

export default function LiveFeed({ feed }) {
  if (!feed.length) return null;
  return (
    <div className="fixed right-8 bottom-16 z-40 w-72 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-2xl shadow-xl p-4 text-white text-base font-semibold animate-fadeIn">
      <div className="mb-2 font-bold text-lg">Live Feed</div>
      <ul className="space-y-2">
        {feed.slice(-5).reverse().map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span>🔥</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
