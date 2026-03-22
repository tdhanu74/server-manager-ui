import { useState, useEffect, useContext } from "react";
import "./App.css";
import { type Server } from "./types";
import { getServers } from "./service/server";
import { Header, ServerList, ServerPane } from "./components";
import { useDarkModeContext } from "./contexts/DarkMode";
import { useSelectedServerContext } from "./contexts/SelectedServer";
import clsx from "clsx";

function App() {
  const [servers, setServers] = useState<Server[]>([]);
  const { selectedServer, setSelectedServer } = useSelectedServerContext();
  const { darkMode } = useDarkModeContext();

  useEffect(() => {
    const fetchServers = async () => {
      const servers = await getServers();
      setServers(servers);
    };

    fetchServers();

    const events = new EventSource(`${import.meta.env.VITE_SERVER_URL}/events`);
    events.addEventListener("update", (event) => {
      if (event.data) {
        const message = JSON.parse(event.data);
        setServers((servers) =>
          servers.map((server) => {
            return {
              ...server,
              running:
                message.id === server.id ? message.running : server.running,
            };
          }),
        );
        setSelectedServer((selectedServer) => {
          return {
            ...selectedServer,
            running:
              message.id === selectedServer.id
                ? message.running
                : selectedServer.running,
          };
        });
      }
    });

    events.addEventListener("log", (event) => {
      if (event.data) {
        const message = JSON.parse(event.data);
        setSelectedServer((selectedServer) => {
          const tempLogs = [...selectedServer.logs];
          if (selectedServer.id === message.id) {
            tempLogs.push(message.log);
          }
          return {
            ...selectedServer,
            logs: tempLogs,
          };
        });
      }
    });

    events.onerror = (err) => {
      console.error(err);
      events.close();
    };

    return () => {
      events.close();
    };
  }, []);

  return (
    <div
      className={clsx(
        "transition transition-all duration-500 flex flex-col h-screen",
        {
          "bg-white text-black": !darkMode,
          "bg-gray-600 text-white": darkMode,
        },
      )}
    >
      <Header />
      <div className="flex flex-row w-full h-full">
        <ServerList serverList={servers} />
        <ServerPane server={selectedServer} />
      </div>
    </div>
  );
}

export default App;
