"use client";

import { apiClient } from "@/lib/axios-client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function PlayerCreateForm() {
  const { handleSubmit, register, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("jersyNumber", data.jersyNumber);
    formData.append("position", data.position);

    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    if (data.coverImage && data.coverImage[0]) {
      formData.append("coverImage", data.coverImage[0]);
    }

    try {
      await apiClient.createPlayerWithImage(formData);
      toast.success("Player added successfully");
      reset();
    } catch (error) {
      toast.error("Failed to add player");
      console.error(error);
    }
  };

  return (
    <div className="py-6 flex flex-col items-center justify-center bg-radial-[at_50%] from-white to-indigo-600 to-90%">
      <h2 className="text-xl font-semibold mb-4">Add Player</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="flex flex-col gap-1 py-2 items-start">
          <label className="capitalize">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="border py-1 px-2 rounded-md outline-none"
            placeholder="Player Name"
          />
        </div>

        <div className="flex flex-col gap-1 py-2 items-start">
          <label className="capitalize">Jersey Number</label>
          <input
            {...register("jersyNumber", { required: true })}
            type="text"
            className="border py-1 px-2 rounded-md outline-none"
            placeholder="Jersey Number"
          />
        </div>

        <div className="flex flex-col gap-1 py-2 items-start">
          <label className="capitalize">Position</label>
          <input
            {...register("position", { required: true })}
            type="text"
            className="border py-1 px-2 rounded-md outline-none"
            placeholder="Player Position"
          />
        </div>

        <div className="flex flex-col gap-1 py-2 items-start">
          <label className="capitalize">Avatar</label>
          <input
            {...register("avatar", { required: true })}
            type="file"
            accept="image/*"
            className="border py-1 px-2 rounded-md outline-none"
          />
        </div>

        <div className="flex flex-col gap-1 py-2 items-start">
          <label className="capitalize">Cover Image</label>
          <input
            {...register("coverImage")}
            type="file"
            accept="image/*"
            className="border py-1 px-2 rounded-md outline-none"
          />
        </div>

        <div>
          <button
            className="cursor-pointer mt-6 py-2.5 font-semibold text-md px-4 rounded bg-[#14142b] text-white hover:bg-[#14142b]/90"
            type="submit"
          >
            Add Player
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlayerCreateForm;
