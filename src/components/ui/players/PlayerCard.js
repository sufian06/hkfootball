import Image from "next/image";
import Link from "next/link";

const PlayerCard = ({ player }) => {
  const { name, jersyNumber, position } = player;
  return (
    <div className="bg-linear-180 from-cyan-50 to-[#2106a8] relative">
      <Link href={`/player/${player._id}`}>
        <div>
          <Image
            className="w-full h-72 px-6"
            src={player.avatar !== "" ? player.avatar : "/images/mbappe.webp"}
            alt={name}
            width={200}
            height={200}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 backdrop-opacity-25 bg-linear-180 from-[#0f2145]/0 to-[#0f2145]/95">
          <div className="flex items-center gap-1.5 text-white p-3 pb-0">
            <div className="text-[68px] font-bold">{jersyNumber}</div>
            <div className="flex flex-col gap-0">
              <h3 className="text-2xl font-bold leading-5 capitalize">
                {name}
              </h3>
              <p className="text-lg capitalize">{position}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlayerCard;
