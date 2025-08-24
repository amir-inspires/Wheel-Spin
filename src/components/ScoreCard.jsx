import React from "react";

export default function ScoreCard({ score, balance }) {
  return (
    <div className="flex gap-6 justify-center items-center mt-4 mb-6">
      <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 shadow-lg text-white text-lg font-bold">
        <span className="text-2xl">🏆</span>
        <span>Score:</span>
        <span className="ml-2">{score}</span>
      </div>
      <div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-400 to-blue-400 shadow-lg text-white text-lg font-bold">
        <span className="text-2xl">💵</span>
        <span>Balance:</span>
        <span className="ml-2">{balance}</span>
      </div>
    </div>
  );
}
