/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  playerName: string;
  number: string;
  mobileNumber: string;
  position: string;
  avatar: FileList;
};

export default function AddPlayerPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setMessage("");

    const avatarFile = data.avatar[0];

    if (!avatarFile) {
      setMessage("Please upload an avatar image.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("playerName", data.playerName);
    formData.append("number", data.number);
    formData.append("mobileNumber", data.mobileNumber);
    formData.append("position", data.position);
    formData.append("avatar", avatarFile);

    try {
      await axios.post("/api/v1/player-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Player uploaded successfully!");
      reset();
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Player</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Player Name"
            {...register("playerName", { required: "Player name is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.playerName && (
            <p className="text-red-500">{errors.playerName.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Number"
            {...register("number", { required: "Number is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.number && (
            <p className="text-red-500">{errors.number.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Mobile Number"
            {...register("mobileNumber", {
              required: "Mobile number is required",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.mobileNumber && (
            <p className="text-red-500">{errors.mobileNumber.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Position"
            {...register("position", { required: "Position is required" })}
            className="w-full border p-2 rounded"
          />
          {errors.position && (
            <p className="text-red-500">{errors.position.message}</p>
          )}
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            {...register("avatar", { required: "Avatar image is required" })}
            className="w-full"
          />
          {errors.avatar && (
            <p className="text-red-500">{errors.avatar.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Add Player"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}
