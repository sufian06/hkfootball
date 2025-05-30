import Link from "next/link";

const Navbar = () => {
  return (
    <div className="relative">
      <div className="mb-4 shadow-2xs sticky left-0 top-0 z-40">
        <nav className="flex justify-between items-center py-6 px-12">
          <div>
            <Link href="/">HK Football</Link>
          </div>
          <div>
            <ul className="flex gap-3 text-2xl">
              <li>
                <Link href={"/player/add"}>add player</Link>
              </li>
              <li>
                <Link href={"/player"}>all players</Link>
              </li>
              <li>one</li>
            </ul>
          </div>
          <div className="border-2 rounded-lg cursor-pointer border-[#14142B] py-2 px-4">
            Sign in
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
