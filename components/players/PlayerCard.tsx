import { PlayerModel } from "@/app/generated/prisma";
import Image from "next/image";

const PlayerCard = ({ player }: { player: PlayerModel }) => {
  const { avatar, goals, playerName, playedMatches } = player;
  return (
    <div>
      <div className="card card-side bg-base-300 shadow-sm h-56">
        <figure>
          {avatar ? (
            <Image
              width={300}
              height={300}
              src={avatar}
              alt="Movie"
              className="object-cover"
            />
          ) : (
            "No Image Found"
          )}
        </figure>
        <div className="card-body gap-6">
          <h2 className="card-title text-4xl font-bold capitalize">
            {playerName}
          </h2>
          <div className="flex gap-8">
            <p className="text-xl">
              Goals <span className="font-bold text-2xl">{goals}</span>
            </p>
            <p className="text-xl">
              Matches{" "}
              <span className="font-bold text-2xl">{playedMatches}</span>
            </p>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
