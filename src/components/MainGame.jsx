
import React, { useMemo, useState, useEffect, useRef, Suspense } from "react";
import Wheel from "./Wheel";
const Leaderboard = React.lazy(() => import("./Leaderboard"));
import Alert from "./Alert";
import Navbar from "./Navbar";
import { ErrorBoundary } from "./ErrorBoundary";
import { useLeaderboard } from "../hooks/useLeaderboard";
import useAudio from "../hooks/useAudio";
import { useNavigate } from "react-router-dom";

export default function MainGame({
  isDark = false,
  onSpinRecord,
  onUsernameChange,
  addPlayer,
  onToggleTheme,
}) {
  // ---- state ----
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { players, addPlayer: addLeaderboardPlayer, currentUser, loading, error } = useLeaderboard();
  const [name, setName] = useState("");
  const [alert, setAlert] = useState(null);
  const [showBuySpins, setShowBuySpins] = useState(false);
  const [balance, setBalance] = useState(500);
  const [score, setScore] = useState(0);
  const [spinsLeft, setSpinsLeft] = useState(5);
  const [last, setLast] = useState({ n: null, delta: null });
  const [highlightedPlayer, setHighlightedPlayer] = useState(null);

  const target = 2000; // win goal
  const segments = useMemo(() => [1, 2, 3, 4, 5, 6, 7], []);

  // Ensure player starts with at least 500 balance points
  useEffect(() => {
    if (balance < 500) setBalance(500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only run once

  // Live highlight: show one random player every 2 seconds
  useEffect(() => {
    const mockPlayers = [
      { username: "charlie", avatar: "🦸", score: 2088 },
      { username: "alex", avatar: "🧙", score: 1800 },
      { username: "sam", avatar: "🧑‍🚀", score: 1500 },
    ];
    const interval = setInterval(() => {
      setHighlightedPlayer(mockPlayers[Math.floor(Math.random() * mockPlayers.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const [wheelSize, setWheelSize] = useState(440);

useEffect(() => {
  const updateWheelSize = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setWheelSize(260); // mobile size
    } else if (width < 768) {
      setWheelSize(320); // small tablets
    } else {
      setWheelSize(440); // default desktop
    }
  };

  updateWheelSize(); // call initially
  window.addEventListener("resize", updateWheelSize);

  return () => window.removeEventListener("resize", updateWheelSize);
}, []);


  // Audio hooks
  const { play: playCelebrate, audioRef: celebrateRef } = useAudio("/celebrate.mp3");
  const { play: playSpin, audioRef: spinRef } = useAudio("/spin.mp3");

  const wheelRef = useRef(null);

  // ---- handlers ----
  function handleFinish(result) {
    if (!name.trim()) {
      setAlert({
        title: "Missing Username",
        message: "Please enter your username before spinning.",
        type: "warning",
      });
      return;
    }
    if (spinsLeft <= 0) return;

    const delta = result * 100;
    const nextScore = score + delta;
    const nextSpins = Math.max(0, spinsLeft - 1);

  setScore(nextScore);
  setSpinsLeft(nextSpins);
    setLast({ n: result, delta });

  // Add to leaderboard via resource wrapper (handled in useLeaderboard)
  addLeaderboardPlayer(name, nextScore);

    if (onSpinRecord) onSpinRecord({ n: result, delta, nextScore, nextSpins });

    // If that was the last spin, decide win/lose
    if (nextSpins === 0) {
      if (nextScore >= target) {
        if (addPlayer) addPlayer(name, nextScore);
        addLeaderboardPlayer(name, nextScore); // local leaderboard

        setShowLeaderboard(true);
        setAlert({
          title: "Congratulations!",
          message: `You've reached the target (${target}) and are added to the leaderboard.`,
          type: "success",
          showLeaderboardBtn: true,
        });
        setBalance((b) => b + 200); // award
        playCelebrate();
        setShowConfetti(true);
        // no auto reset; user can view leaderboard
      } else {
        setAlert({
          title: "Try Again",
          message: `You didn't reach the target (${target}).`,
          type: "error",
          showBuySpinsBtn: true,
        });
      }
    }
  }

  function handleInputChange(e) {
    const v = e.target.value;
    setName(v);
    if (onUsernameChange) onUsernameChange(v);
    if (alert && alert.type === "warning") setAlert(null);
  }

  function handleBuySpins(amount = 3, cost = 300) {
    if (balance >= cost) {
      setBalance((b) => b - cost);
      setSpinsLeft((x) => x + amount);
      playCelebrate();
      setShowBuySpins(false);
    }
  }

  function handleCloseModal() {
    setShowBuySpins(false);
  }

  // ---- inline component for confetti overlay ----
  function ConfettiOverlay() {

    const navigate = useNavigate();
    function handlePlayAgain() {
      setShowConfetti(false);
      setScore(0);
      setSpinsLeft(5);
      setLast({ n: null, delta: null });
      setName("");
      setAlert(null);
      navigate("/leaderboard"); // redirect to leaderboard
    }
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
        {/* Confetti animation */}
        <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: 0,
                animation: `confettiUp 2.5s linear ${Math.random()}s forwards`,
              }}
            >
              <span style={{ fontSize: `${16 + Math.random() * 16}px` }}>
                {["🎉", "✨", "💎", "🎁", "⭐", "🏆", "🍀"][i % 7]}
              </span>
            </div>
          ))}
        </div>

        {/* Winner card */}
        <div className="relative z-10 bg-gradient-to-br from-purple-900/80 to-blue-900/80 rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-4 border-4 border-yellow-400/60 backdrop-blur-lg">
          <div className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">🎉 Winner!</div>
          <div className="text-2xl font-bold text-white">{name || "Player"}</div>
          <div className="text-xl font-semibold text-blue-300">Score: {score}</div>
          <div className="text-lg text-green-300">Balance: {balance}</div>
          <div className="text-base text-white/80 mb-2">Take a screenshot and share your win!</div>
          <button
            className="mt-2 px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-purple-500 text-black font-bold shadow-lg hover:scale-105 text-lg"
            onClick={handlePlayAgain}
          >
            Check Leaderboard
          </button>
        </div>

        <style>{`
          @keyframes confettiUp {
            0% { transform: translateY(0); opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(-80vh); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  // ---- render ----
  return (
    <>
      {/* preload audio */}
      <audio ref={celebrateRef} src="/celebrate.mp3" preload="auto" />
      <audio ref={spinRef} src="/spin.mp3" preload="auto" />

      {/* Always show Navbar at the top, passing current state */}
      <Navbar
        score={score}
        balance={balance}
        spinsLeft={spinsLeft}
        last={last}
        onToggleTheme={onToggleTheme}
        isDark={isDark}
      />

      {showConfetti && <ConfettiOverlay />}

      <div
        className={`w-full h-full flex items-center justify-center px-2 py-4 ${
          isDark ? "bg-[#0D0E1A]" : "bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl gap-8">
          {/* Left panel */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xs md:max-w-sm">
            <input
              value={name}
              onChange={handleInputChange}
              placeholder="Enter username to play"
              className="w-full rounded-xl bg-white px-4 py-2 text-sm ring-1 ring-zinc-200/70 shadow-card placeholder:text-zinc-400 focus-visible:ring-zinc-400 dark:bg-zinc-900 dark:ring-zinc-800"
            />

            {highlightedPlayer && (
              <div className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00C2FF] to-[#9D4EDD] text-white shadow-xl text-base font-semibold flex items-center gap-3 animate-pulse z-10 border-2 border-[#FFD700] w-full justify-center">
                <span>🔥 Live Player:</span>
                <span className="font-bold text-lg">
                  {highlightedPlayer.avatar} {highlightedPlayer.username}
                </span>
                <span>
                  Score: <span className="font-bold">{highlightedPlayer.score}</span>
                </span>
              </div>
            )}

            <button
              onClick={() => {
                wheelRef.current?.spin?.();
                playSpin();
              }}
              disabled={spinsLeft <= 0 || !name.trim()}
              className={`mt-2 px-10 py-5 rounded-full bg-gradient-to-r from-[#FF6B35] to-[#9D4EDD] shadow-2xl text-white text-2xl font-extrabold tracking-wide transition-transform duration-200 hover:scale-105 active:scale-95 w-full ${
                spinsLeft <= 0 || !name.trim() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              🎰 Spin!
            </button>

            {showLeaderboard && (
              <ErrorBoundary>
                <Suspense fallback={<div className="rounded-3xl bg-gradient-to-r from-blue-400 to-purple-700 text-white p-6 mt-8 shadow-2xl flex flex-col items-center"><div className="font-bold text-lg mb-2">Loading leaderboard...</div></div>}>
                  <Leaderboard players={players} userId={currentUser?.username} loading={loading} error={error} />
                </Suspense>
              </ErrorBoundary>
            )}

            <div className="w-full px-2 mt-2">
              {alert && (
                alert.title === "Try Again" && alert.showBuySpinsBtn ? (
                  <div className="rounded-xl bg-gradient-to-r from-red-900 to-zinc-900/80 p-4 mb-2 text-white shadow-lg flex flex-col gap-2">
                    <div className="font-bold text-lg text-red-300">{alert.title}</div>
                    <div className="text-base text-red-100">{alert.message}</div>
                    <button
                      className="mt-2 px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105"
                      onClick={() => setShowBuySpins(true)}
                    >
                      Buy Spins
                    </button>
                  </div>
                ) : alert.title === "Congratulations!" && alert.showLeaderboardBtn ? (
                  <div className="rounded-xl bg-gradient-to-r from-yellow-700 to-purple-900/80 p-4 mb-2 text-white shadow-lg flex flex-col gap-2 items-center">
                    <div className="font-bold text-lg text-yellow-300">{alert.title}</div>
                    <div className="text-base text-white/90 mb-2">{alert.message}</div>
                    <button
                      className="mt-2 px-6 py-2 rounded-xl bg-gradient-to-r from-[#9D4EDD] to-[#00C2FF] text-white font-bold shadow-lg hover:scale-105"
                      onClick={() => setShowLeaderboard(true)}
                    >
                      View Leaderboard
                    </button>
                  </div>
                ) : (
                  <Alert title={alert.title} message={alert.message} />
                )
              )}

              {showBuySpins && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 max-w-xs w-full">
                    <div className="font-bold text-lg text-purple-700 dark:text-purple-300">Buy More Spins?</div>
                    <div className="text-base text-zinc-700 dark:text-zinc-200">
                      Would you like to buy 3 more spins for{" "}
                      <span className="font-bold text-pink-500">300</span> coins?
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => handleBuySpins(3, 300)}
                        className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold shadow-lg hover:scale-105"
                      >
                        Yes
                      </button>
                      <button
                        onClick={handleCloseModal}
                        className="px-6 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 font-bold shadow-lg hover:scale-105"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Wheel */}
          <div className="flex items-center justify-center w-full max-w-[440px]">
            <Wheel
              ref={wheelRef}
              segments={segments}
              onFinish={handleFinish}
              disabled={spinsLeft <= 0 || !name.trim()}
              spinButtonClass="wheel-spin-btn"
              size={wheelSize}
            />
          </div>
        </div>
      </div>
    </>
  );
}
