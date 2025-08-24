import React from "react";
import Leaderboard from "./Leaderboard";
import { useLeaderboard } from "../hooks/useLeaderboard";

export default function LeaderboardPage() {
  const { players } = useLeaderboard();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-12 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 dark:from-[#0D0E1A] dark:via-[#0D0E1A] dark:to-[#0D0E1A]">
      <Leaderboard players={players} />
    </div>
  );
}
