import { useState, useEffect } from "react";
import "./App.css";
import { getServers } from "./service/server";
import { ServerCard } from "./components";

function App() {
  const [servers, setServers] = useState<unknown[]>([]);

  useEffect(() => {
    const fetchServers = async () => {
      const servers = await getServers();
      setServers(servers);
    };
    fetchServers();
  }, []);
  return (
    <div className="flex flex-col gap-8 h-full w-3/4 items-center justify-center, self-center">
      <div className="w-full text-[3rem] font-semibold text-left p-4">
        Servers
      </div>
      <div className="flex flex-row flex-wrap w-full gap-8 p-4">
        {servers.map((server) => {
          return <ServerCard key={server.id} server={server} />;
        })}
      </div>
    </div>
  );
}

export default App;
