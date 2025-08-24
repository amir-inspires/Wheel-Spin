import React, { useState } from 'react';

export default function Navbar({ score, balance, spinsLeft, last, onToggleTheme, isDark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4 bg-gradient-to-r from-[#23243a] to-[#1A1C2C] text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-extrabold tracking-wide text-[#FFD700]">Gift Wheel</div>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4">
          <NavItems score={score} balance={balance} spinsLeft={spinsLeft} last={last} />
          <ThemeButton onToggleTheme={onToggleTheme} />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col mt-4 gap-4 lg:hidden">
          <NavItems score={score} balance={balance} spinsLeft={spinsLeft} last={last} />
          <ThemeButton onToggleTheme={onToggleTheme} />
        </div>
      )}
    </header>
  );
}

function NavItems({ score, balance, spinsLeft, last }) {
  return (
    <>
      <InfoItem label="Score" value={score} color="#FFD700" />
      <InfoItem label="Balance" value={balance} color="#4ADE80" />
      <InfoItem label="Spins left" value={spinsLeft} color="#00C2FF" />
      <InfoItem label="Last" value={`${last.n} → +${last.delta}`} color="#FFD700" />
    </>
  );
}

function InfoItem({ label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-[#B0B3C7]">{label}:</span>
      <span className="px-2 py-1 rounded bg-[#23243a]" style={{ color }}><strong>{value}</strong></span>
    </div>
  );
}

function ThemeButton({ onToggleTheme }) {
  return (
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
  );
}
