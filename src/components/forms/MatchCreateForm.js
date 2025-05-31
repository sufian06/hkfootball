"use client";

import { apiClient } from "@/lib/api-client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function MatchCreateForm() {
  const { register, handleSubmit, control, reset, setValue, watch } = useForm({
    defaultValues: {
      scorers: [],
    },
  });

  const [players, setPlayers] = useState([]);
  const [scorer, setScorer] = useState({ playerId: "", goals: 1 });

  const scorers = watch("scorers");

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await fetch("/api/players");
      const data = await res.json();
      setPlayers(data);
    };
    fetchPlayers();
  }, []);

  const onSubmit = async (data) => {
    try {
      await apiClient.createMatch(data);

      toast.success("Match created successfully");
      reset();
    } catch (error) {
      toast.error("Match fail to create");
    }
  };

  const addScorer = () => {
    if (scorer.playerId && scorer.goals > 0) {
      setValue("scorers", [...scorers, scorer]);
      setScorer({ playerId: "", goals: 1 });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Football Match</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("oponentTeamName")}
          placeholder="Oponent Team"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("oponentTeamGoals", { required: true })}
          placeholder="Oponent Goals"
          className="w-full border p-2 rounded"
        />
        <input
          {...register("homeTeamGoals", { required: true })}
          placeholder="Our Goals"
          className="w-full border p-2 rounded"
        />

        {/* Scorers */}
        <div>
          <label className="block font-medium mb-1">Add Scorers</label>
          <div className="flex items-center gap-2 mb-2">
            <select
              value={scorer.playerId}
              onChange={(e) =>
                setScorer({ ...scorer, playerId: e.target.value })
              }
              className="border p-2 rounded w-full"
            >
              <option value="">Select player</option>
              {players.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              value={scorer.goals}
              onChange={(e) =>
                setScorer({ ...scorer, goals: Number(e.target.value) })
              }
              className="w-20 border p-2 rounded"
            />
            <button
              type="button"
              onClick={addScorer}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>

          <ul className="list-disc pl-6">
            {scorers.map((s, i) => {
              const player = players.find((p) => p._id === s.playerId);
              return (
                <li key={i}>
                  {player?.name} — {s.goals} goal(s)
                </li>
              );
            })}
          </ul>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Match
        </button>
      </form>
    </div>
  );
}
