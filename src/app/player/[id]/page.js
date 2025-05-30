"use client";

import Player from "@/components/ui/players/Player";
import { apiClient } from "@/lib/api-client";
import { use, useEffect, useState } from "react";

const PlayerDetailsPage = ({ params }) => {
  const { id } = use(params);

  const [player, setPlayer] = useState({});

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await apiClient.getAPlayer(`/${id}`);
        setPlayer(data);
      } catch (error) {
        console.error("error fetching single player");
      }
    };
    fetchVideo();
  }, [id]);

  return (
    <div>
      <Player player={player} />
    </div>
  );
};

export default PlayerDetailsPage;
