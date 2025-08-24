import React from "react";

export default function SpinButton({ onClick, disabled }) {
  return (
    <button
      className={`mt-8 px-10 py-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-2xl text-white text-2xl font-extrabold tracking-wide transition-transform duration-200 hover:scale-105 active:scale-95 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Spin the wheel"
    >
      🎰 Spin!
    </button>
  );
}
