import PlayerList from "@/components/ui/players/PlayerList";

export default function Home() {
  return (
    <div className="w-7xl mx-auto">
      Welcome to football app
      <div>
        <PlayerList />
      </div>
    </div>
  );
}
