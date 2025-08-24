import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MainGame from './components/MainGame';
import LeaderboardPage from './components/LeaderboardPage';
import Profile from './components/Profile';
import { useLeaderboard } from './hooks/useLeaderboard';
import { useDarkMode } from './hooks/userDarkMode';



export default function App() {
  const { isDark, setIsDark } = useDarkMode();
  const { players, addPlayer } = useLeaderboard();
  // Remove game state from App, move to MainGame
  const [balance, setBalance] = useState(100);
  const [username, setUsername] = useState("");
  const [recentSpins, setRecentSpins] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  useEffect(() => {
    // Show welcome modal only on first load
    setShowWelcome(true);
  }, []);

  // Track username and recent spins from MainGame
  function handleUsernameChange(name) {
    setUsername(name);
  }
  function handleSpinRecord(spin) {
    setRecentSpins(prev => [spin, ...prev].slice(0, 20));
  }

  return (
    <Router>
      <div className="w-screen h-screen flex bg-[#0D0E1A] dark:bg-[#0D0E1A]">
        
  <Sidebar />
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Navbar will get state from MainGame via render prop */}
          <div className="flex-1 flex flex-col items-center justify-center relative">
            {showWelcome && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center gap-6 border-2 border-purple-400">
                  <div className="text-3xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">Welcome to Gift Wheel!</div>
                  <div className="text-base text-zinc-700 dark:text-zinc-200 text-center">
                    Spin the wheel to win points!<br />
                    <span className="font-bold text-purple-600 dark:text-purple-300">Target:</span> Reach <span className="font-bold text-yellow-500">2000</span> points to win.<br />
                    <span className="font-bold text-pink-600 dark:text-pink-300">Balance:</span> You start with <span className="font-bold text-green-600 dark:text-green-400">100</span> coins.<br />
                    <span className="font-bold text-blue-600 dark:text-blue-300">Score:</span> Increases with every spin.<br />
                    Buy more spins if you run out!
                  </div>
                  <button onClick={() => setShowWelcome(false)} className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105">Let's Play!</button>
                </div>
              </div>
            )}
            <Routes>
              <Route
                path="/"
                element={
                  <MainGame
                    balance={balance}
                    setBalance={setBalance}
                    addPlayer={addPlayer}
                    isDark={isDark}
                    onToggleTheme={() => setIsDark(!isDark)}
                    onUsernameChange={handleUsernameChange}
                    onSpinRecord={handleSpinRecord}
                    renderNavbar={(navbarProps) => (
                      <Navbar {...navbarProps} />
                    )}
                  />
                }
              />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/profile" element={<Profile username={username} balance={balance} recentSpins={recentSpins} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}