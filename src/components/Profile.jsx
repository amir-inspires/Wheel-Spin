import React from "react";

export default function Profile({ username, balance, recentSpins }) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 dark:from-[#0D0E1A] dark:via-[#0D0E1A] dark:to-[#0D0E1A]">
      <div className="w-full max-w-md mx-auto mt-10 p-6 rounded-3xl bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 shadow-2xl">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="text-3xl font-extrabold text-purple-700 dark:text-purple-300 tracking-wide flex items-center gap-2">
            <span className="inline-block w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl">👤</span>
            Profile
          </div>
          <div className="text-lg font-bold text-zinc-700 dark:text-zinc-200">{username || "Guest"}</div>
          <div className="text-base font-semibold text-pink-600 dark:text-pink-300">Balance: <span className="font-bold text-green-600 dark:text-green-400">{balance}</span></div>
        </div>
        <div>
          <div className="font-bold text-lg mb-2 text-purple-700 dark:text-purple-300">Recent Spins</div>
          {recentSpins && recentSpins.length ? (
            <ul className="space-y-2">
              {recentSpins.slice(0, 10).map((spin, idx) => (
                <li key={idx} className="flex justify-between items-center px-4 py-2 rounded-xl bg-gradient-to-r from-blue-100 to-pink-100 dark:from-zinc-800 dark:to-zinc-900 shadow">
                  <span className="font-semibold text-purple-700 dark:text-purple-200">Spin #{spin.n}</span>
                  <span className="font-bold text-green-600 dark:text-green-400">{spin.delta > 0 ? `+${spin.delta}` : spin.delta}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-zinc-500 dark:text-zinc-400">No spins yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
