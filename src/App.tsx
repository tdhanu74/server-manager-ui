import { useState, useEffect } from "react";
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
    events.addEventListener("update", (event: Event) => {
      const updateEvent = event as MessageEvent;
      if (updateEvent.data) {
        const message = JSON.parse(updateEvent.data);
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
              message.id === selectedServer?.id
                ? message.running
                : selectedServer?.running,
          } as Server;
        });
      }
    });

    events.addEventListener("log", (event: Event) => {
      const logEvent = event as MessageEvent;
      if (
        logEvent.data &&
        !selectedServer?.logs?.filter((log) => {
          return logEvent.lastEventId === log.id;
        })
      ) {
        const message = JSON.parse(logEvent.data);
        setSelectedServer((selectedServer) => {
          const tempLogs: { id: string; log: string }[] = selectedServer?.logs
            ? [...selectedServer.logs]
            : [];
          if (selectedServer?.id === message.id) {
            tempLogs.push({
              id: logEvent.lastEventId,
              log: message.log,
            });
          }
          return {
            ...selectedServer,
            logs: tempLogs,
          } as Server;
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
  }, [setSelectedServer]);

  return (
    <div
      className={clsx(
        "transition duration-500 flex flex-col h-screen max-h-screen",
        {
          "bg-white text-black": !darkMode,
          "bg-dark-500 text-white": darkMode,
        },
      )}
    >
      <Header />
      <div className="flex flex-row w-full h-full max-w-full max-h-full">
        <ServerList serverList={servers} />
        <ServerPane server={selectedServer} />
      </div>
    </div>
  );
}

export default App;
