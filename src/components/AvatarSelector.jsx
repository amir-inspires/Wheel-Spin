import React, { useState } from "react";

const avatars = [
  "😀", "😎", "🦄", "👑", "🎩", "🐱", "🐶", "🧑‍🚀", "🧙‍♂️", "🧑‍🎤"
];

export default function AvatarSelector({ selected, onSelect }) {
  return (
    <div className="flex gap-2 items-center justify-center mb-4">
      {avatars.map((a) => (
        <button
          key={a}
          className={`text-3xl px-2 py-1 rounded-full border-2 ${selected === a ? 'border-pink-500 bg-pink-100' : 'border-transparent'} transition`}
          onClick={() => onSelect(a)}
          aria-label={`Select avatar ${a}`}
        >
          {a}
        </button>
      ))}
    </div>
  );
}
