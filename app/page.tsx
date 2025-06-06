/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import PlayerCard from "@/components/players/PlayerCard";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { PlayerModel } from "./generated/prisma";

export default function Home() {
  const [players, setPlayers] = useState<PlayerModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayers = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/v1/players");
      if (Array.isArray(response.data)) {
        setPlayers(response.data);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="py-3">
        {players.length === 0 ? (
          <div className="text-center text-lg text-gray-500">
            No players available
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
