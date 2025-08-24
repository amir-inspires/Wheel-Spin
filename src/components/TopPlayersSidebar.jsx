import React from "react";

export default function TopPlayersSidebar({ players }) {
  const topPlayers = players.slice(0, 3);
  return (
    <div className="fixed right-8 top-32 z-40 flex flex-col gap-6 items-center">
      {topPlayers.map((p, i) => (
        <div key={p.username} className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 shadow-xl text-white font-bold text-lg animate-pulse">
          <span className="text-2xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
          <span className="rounded-full bg-white/30 px-3 py-1 text-xl">{p.username}</span>
          <span className="ml-2">{p.score}</span>
        </div>
      ))}
    </div>
  );
}
