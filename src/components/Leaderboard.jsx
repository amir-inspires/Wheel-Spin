import React from "react";

const AVATARS = [
  '🦸', '🧙', '🧑‍🚀', '🧑‍🎤', '🧑‍💻', '🧑‍🏫', '🧑‍🔬', '🧑‍🍳', '🧑‍🎨', '🧑‍🌾', '🧑‍🚒', '🧑‍✈️', '🧑‍⚖️', '🧑‍🔧', '🧑‍🏭', '🧑‍🚀', '🧑‍🎤', '🧑‍💻', '🧑‍🏫', '🧑‍🔬'
];
function getAvatar(username, i) {
  return AVATARS[i % AVATARS.length];
}

const rankStyles = [
  // Gold, Silver, Bronze glow
  'bg-gradient-to-r from-yellow-300 via-yellow-100 to-pink-200 shadow-[0_0_16px_4px_rgba(255,215,0,0.5)]',
  'bg-gradient-to-r from-zinc-200 via-slate-100 to-blue-200 shadow-[0_0_16px_4px_rgba(192,192,192,0.4)]',
  'bg-gradient-to-r from-orange-300 via-yellow-100 to-pink-200 shadow-[0_0_16px_4px_rgba(205,127,50,0.4)]',
];
const avatarGlow = [
  'shadow-[0_0_8px_2px_rgba(255,215,0,0.7)] border-yellow-400',
  'shadow-[0_0_8px_2px_rgba(192,192,192,0.7)] border-blue-400',
  'shadow-[0_0_8px_2px_rgba(205,127,50,0.7)] border-orange-400',
];

export default function Leaderboard({ players, userId, loading, error }) {
  if (loading) {
    return (
      <div className="rounded-3xl bg-gradient-to-r from-blue-400 to-purple-700 text-white p-6 mt-8 shadow-2xl flex flex-col items-center">
        <div className="font-bold text-lg mb-2">Loading leaderboard...</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-3xl bg-gradient-to-r from-red-500 to-pink-700 text-white p-6 mt-8 shadow-2xl flex flex-col items-center">
        <div className="font-bold text-lg mb-2">Failed to load leaderboard</div>
        <div className="text-base">{error.message || "Unknown error."}</div>
      </div>
    );
  }
  if (!players.length) {
    return (
      <div className="rounded-3xl bg-gradient-to-r from-pink-500 to-purple-700 text-white p-6 mt-8 shadow-2xl flex flex-col items-center">
        <div className="font-bold text-lg mb-2">Leaderboard is empty</div>
        <div className="text-base">No players yet.</div>
      </div>
    );
  }
  // ...existing code...
  return (
    <div
      className="rounded-3xl p-4 sm:p-8 mt-8 flex flex-col items-center w-full max-w-md sm:max-w-xl mx-auto"
      style={{
        background: 'rgba(30, 27, 38, 0.65)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(12px)',
        border: '2px solid rgba(173, 91, 255, 0.35)'
      }}
    >
      {/* ...existing leaderboard table code... */}
      <div className="font-extrabold text-2xl sm:text-4xl mb-6 sm:mb-8 tracking-wide flex items-center gap-3 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(173,91,255,0.7)]">
  <span className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl">🔥</span>
        Top Spinners
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm sm:text-base rounded-2xl overflow-hidden shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white">
              <th className="text-left px-2 sm:px-4 py-3 font-bold text-base sm:text-lg rounded-tl-2xl">Rank</th>
              <th className="text-left px-2 sm:px-4 py-3 font-bold text-base sm:text-lg">Avatar</th>
              <th className="text-left px-2 sm:px-4 py-3 font-bold text-base sm:text-lg">Username</th>
              <th className="text-left px-2 sm:px-4 py-3 font-bold text-base sm:text-lg rounded-tr-2xl">Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, i) => (
              <tr key={player.username}
                className={`transition-all duration-200 ${
                  i === 0
                    ? 'bg-gradient-to-r from-yellow-200 via-yellow-100 to-white dark:from-yellow-400 dark:via-yellow-300 dark:to-zinc-900 text-yellow-900 dark:text-yellow-200 shadow-[0_0_16px_2px_rgba(255,215,0,0.18)]'
                    : i === 1
                    ? 'bg-gradient-to-r from-blue-100 via-slate-100 to-white dark:from-blue-400 dark:via-blue-300 dark:to-zinc-900 text-blue-900 dark:text-blue-200 shadow-[0_0_16px_2px_rgba(192,192,192,0.12)]'
                    : i === 2
                    ? 'bg-gradient-to-r from-orange-100 via-yellow-50 to-white dark:from-orange-400 dark:via-orange-300 dark:to-zinc-900 text-orange-900 dark:text-orange-200 shadow-[0_0_16px_2px_rgba(205,127,50,0.12)]'
                    : 'bg-gradient-to-r from-zinc-100 via-zinc-200 to-white dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 text-purple-700 dark:text-purple-200'
                } ${i === 0 ? 'rounded-t-2xl' : ''} ${i === players.length - 1 ? 'rounded-b-2xl' : ''}`}
              >
                <td className={`px-2 sm:px-4 py-3 font-extrabold text-lg sm:text-2xl ${i === 0 ? 'text-yellow-700 dark:text-yellow-400' : i === 1 ? 'text-blue-700 dark:text-blue-200' : i === 2 ? 'text-orange-700 dark:text-orange-200' : 'text-purple-500 dark:text-purple-300'}`}>{i + 1}</td>
                <td className="px-2 sm:px-4 py-3">
                  <span className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 sm:border-4 flex items-center justify-center text-xl sm:text-3xl bg-zinc-900 dark:bg-zinc-800 ${i === 0 ? 'border-yellow-400 shadow-[0_0_8px_2px_rgba(255,215,0,0.7)]' : i === 1 ? 'border-blue-400 shadow-[0_0_8px_2px_rgba(192,192,192,0.7)]' : i === 2 ? 'border-orange-400 shadow-[0_0_8px_2px_rgba(205,127,50,0.7)]' : 'border-purple-700 shadow-[0_0_4px_1px_rgba(173,91,255,0.3)]'}`}>{getAvatar(player.username, i)}</span>
                </td>
                <td className="px-2 sm:px-4 py-3 font-bold text-base sm:text-xl text-purple-200 dark:text-blue-200">{player.username}</td>
                <td className={`px-2 sm:px-4 py-3 font-extrabold text-lg sm:text-2xl ${i === 0 ? 'text-yellow-700 dark:text-yellow-300' : i === 1 ? 'text-blue-700 dark:text-blue-300' : i === 2 ? 'text-orange-700 dark:text-orange-300' : 'text-blue-600 dark:text-blue-400'}`}>{player.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
