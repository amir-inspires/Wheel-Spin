// leaderboardResource.js
// Resource wrapper for leaderboard API (fetch, add, error handling)

export async function fetchLeaderboard() {
  try {
    const res = await fetch("http://localhost:4000/api/leaderboard");
    if (!res.ok) throw new Error("Failed to fetch leaderboard");
    return await res.json();
  } catch (err) {
    throw err;
  }
}

export async function addLeaderboardEntry(username, score) {
  try {
    const res = await fetch("http://localhost:4000/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, score }),
    });
    if (!res.ok) throw new Error("Failed to add leaderboard entry");
    return await res.json();
  } catch (err) {
    throw err;
  }
}
