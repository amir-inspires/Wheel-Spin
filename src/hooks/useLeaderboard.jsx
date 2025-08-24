
import { useState, useEffect } from "react";
import { fetchLeaderboard, addLeaderboardEntry } from "./leaderboardResource";

export function useLeaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  async function loadLeaderboard() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLeaderboard();
      setPlayers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeaderboard();
    // eslint-disable-next-line
  }, []);

  async function addPlayer(username, score) {
    setLoading(true);
    setError(null);
    try {
      await addLeaderboardEntry(username, score);
      setCurrentUser({ username, score });
      await loadLeaderboard();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return { players: sortedPlayers, addPlayer, currentUser, loading, error };
}
