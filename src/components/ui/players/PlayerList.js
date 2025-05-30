"use client";

import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getPlayers();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {players.map((player) => (
        <PlayerCard key={player._id} player={player} />
      ))}
    </div>
  );
};

export default PlayerList;
