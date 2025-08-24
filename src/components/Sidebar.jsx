import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const TABS = [
  { label: 'Profile', route: '/profile', icon: '👤' },
  { label: 'Game', route: '/', icon: '🎮' },
  { label: 'Leaderboard', route: '/leaderboard', icon: '🏆' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="w-20 bg-[#1A1C2C] dark:bg-[#1A1C2C] flex flex-col items-center py-8 shadow-2xl">
      <div className="mb-8 text-3xl font-extrabold tracking-wide text-[#FFD700]">🎁</div>
      {TABS.map(tab => (
        <button
          key={tab.route}
          className={`mb-6 w-14 h-14 flex flex-col items-center justify-center rounded-full font-bold text-lg shadow-lg transition-all duration-200
            ${location.pathname === tab.route ? 'bg-gradient-to-br from-[#FF6B35] to-[#9D4EDD] text-white scale-105 ring-4 ring-[#FFD700]' : 'bg-[#1A1C2C] text-[#B0B3C7] hover:bg-[#23243a]'}
          `}
          onClick={() => navigate(tab.route)}
          aria-label={tab.label}
        >
          <span className="text-2xl mb-1">{tab.icon}</span>
          <span className="text-xs font-semibold truncate w-12 text-center">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
