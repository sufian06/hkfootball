"use client";

import { apiClient } from "@/lib/api-client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function PlayerCreateForm() {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      jersyNumber: "",
      position: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await apiClient.createplayer(data);
      toast.success("Player Added");
      reset();
    } catch (error) {}
  };

  return (
    <div className="py-6 flex flex-col items-center justify-center bg-radial-[at_50%] from-white to-indigo-600 to-90%">
      <h2>Add Player </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1 py-2 items-start">
          <label className="capitalize">name</label>
          <input
            {...register("name")}
            type="text"
            className="border py-1 px-2 rounded-md outline-none"
            placeholder="Player Name"
          />
        </div>
        <div className="flex flex-col gap-1 py-2 items-start">
          <label className="capitalize">jersy Number</label>
          <input
            {...register("jersyNumber")}
            type="text"
            className="border py-1 px-2 rounded-md outline-none"
            placeholder="Jersy Number"
          />
        </div>
        <div className="flex flex-col gap-1 py-2 items-start">
          <label className="capitalize">position</label>
          <input
            {...register("position")}
            type="text"
            className="border py-1 px-2 rounded-md outline-none"
            placeholder="Player Position"
          />
        </div>
        <div>
          <button
            className=" cursor-pointer mt-6 py-2.5 font-semibold text-md px-4 rounded bg-[#14142b] text-white hover:bg-[#14142b]/90"
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
