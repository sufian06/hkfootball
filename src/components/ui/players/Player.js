import Image from "next/image";

const Player = ({ player }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-center gap-8 bg-radial-[at_50%] from-white to-indigo-600 to-90%">
      <div>
        <Image
          src="/images/mbappe.webp"
          alt="player name"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-6">
          <h2 className="text-8xl font-bold text-indigo-600">
            {player.jersyNumber}
          </h2>
          <div className="flex flex-col items-center">
            <h3 className="text-5xl font-bold">{player.name}</h3>
            <h4 className="capitalize">{player.position}</h4>
          </div>
        </div>
        <div className="bg-[#14142b] flex text-white rounded-lg py-9 px-20 gap-20">
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-4xl font-bold">{player.goals}</h3>
            <p>Goals</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-4xl font-bold">{player.matches}</h3>
            <p>Matches played</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
