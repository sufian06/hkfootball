"use client";
import { useEffect, useState } from "react";

export default function PlayerDetails({ id }) {
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState("");

  console.log(id);

  useEffect(() => {
    async function fetchPlayer() {
      try {
        const res = await fetch(`/api/players/${id}`);
        if (!res.ok) throw new Error("Player not found");
        const data = await res.json();
        setPlayer(data);
      } catch (err) {
        setError(err.message);
      }
    }

    if (id) fetchPlayer();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!player) return <p>Loading...</p>;

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">{player.name}</h2>
      <p>Position: {player.position}</p>
      <p>Jersey Number: {player.jersyNumber}</p>
    </div>
  );
}
