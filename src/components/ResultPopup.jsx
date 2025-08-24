import React from "react";

export default function ResultPopup({ delta, show }) {
  if (!show) return null;
  return (
    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-pink-400 text-white text-2xl font-extrabold shadow-2xl animate-bounce z-50">
      +{delta} points!
    </div>
  );
}
