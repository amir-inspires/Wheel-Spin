import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TABS = [
  { label: "Profile", route: "/profile", icon: "👤" },
  { label: "Game", route: "/", icon: "🎮" },
  { label: "Leaderboard", route: "/leaderboard", icon: "🏆" },
];

export default function Layout({ children, liveHighlight, stats, onToggleTheme, isDark }) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = TABS.find(tab => location.pathname === tab.route) || TABS[1];

  return (
    <div className="w-screen h-screen flex bg-[#0D0E1A] dark:bg-[#0D0E1A]">
      {/* Tab Navigation */}
  <nav className="w-24 bg-[#1A1C2C] dark:bg-[#1A1C2C] flex flex-col items-center py-8 shadow-2xl">
        <div className="mb-10 text-3xl font-extrabold tracking-wide text-[#FFD700]">🎁</div>
        {TABS.map(tab => (
          <button
            key={tab.route}
            className={`mb-6 w-16 h-16 flex flex-col items-center justify-center rounded-full font-bold text-lg shadow-lg transition-all duration-200
              ${location.pathname === tab.route ? 'bg-gradient-to-br from-[#FF6B35] to-[#9D4EDD] text-white scale-105 ring-4 ring-[#FFD700]' : 'bg-[#1A1C2C] text-[#B0B3C7] hover:bg-[#23243a]'}
            `}
            onClick={() => navigate(tab.route)}
            aria-label={tab.label}
          >
            <span className="text-2xl mb-1">{tab.icon}</span>
            <span className="text-xs font-semibold">{tab.label}</span>
          </button>
        ))}
      </nav>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full px-10 py-7 bg-gradient-to-r from-[#23243a] to-[#1A1C2C] text-white flex items-center justify-between shadow-lg">
          <div className="text-3xl font-extrabold tracking-wide text-[#FFD700]">Gift Wheel</div>
          <div className="flex items-center gap-4">
            {stats && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#B0B3C7]">Score:</span>
                  <span className="px-2 py-1 rounded bg-[#23243a] text-[#FFD700] font-bold">{stats.score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#B0B3C7]">Balance:</span>
                  <span className="px-2 py-1 rounded bg-[#23243a] text-[#4ADE80] font-bold">{stats.balance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#B0B3C7]">Spins left:</span>
                  <span className="px-2 py-1 rounded bg-[#23243a] text-[#00C2FF] font-bold">{stats.spinsLeft}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[#B0B3C7]">Last:</span>
                  <span className="px-2 py-1 rounded bg-[#23243a] text-[#FFD700] font-bold">{stats.last.n} → +{stats.last.delta}</span>
                </div>
              </>
            )}
            <button
              aria-label="toggle theme"
              onClick={onToggleTheme}
              className="grid h-9 w-9 place-content-center rounded-xl bg-white shadow-card ring-1 ring-zinc-200/70 transition hover:scale-105 active:scale-95 dark:bg-zinc-900 dark:ring-zinc-800"
              title="Toggle dark mode"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
              </svg>
            </button>
          </div>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Live highlight banner */}
          {liveHighlight && (
            <div className="absolute top-8 left-1/2 -translate-x-1/2 px-8 py-4 rounded-3xl bg-gradient-to-r from-[#00C2FF] to-[#9D4EDD] text-white shadow-2xl text-lg font-semibold flex items-center gap-4 animate-pulse z-10 border-4 border-[#FFD700]">
              <span>🔥 Live Player:</span>
              <span className="font-bold text-2xl">{liveHighlight.avatar} {liveHighlight.username}</span>
              <span>Score: <span className="font-bold">{liveHighlight.score}</span></span>
            </div>
          )}
          <div className="w-full flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
