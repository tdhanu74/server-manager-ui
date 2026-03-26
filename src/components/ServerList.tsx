import { ServerListItem } from "./";
import { type Server } from "../types";
import { getLogs } from "../service/server";
import { useSelectedServerContext } from "../contexts/SelectedServer";
import { useDarkModeContext } from "../contexts/DarkMode";
import clsx from "clsx";

export function ServerList({ serverList }: { serverList: Server[] }) {
  const { selectedServer, setSelectedServer } = useSelectedServerContext();
  const { darkMode } = useDarkModeContext();

  return (
    <div
      className={clsx(
        "flex flex-col w-full h-full min-w-64 max-w-80 shadow-sm z-10",
        {
          "shadow-gray-300": !darkMode,
          "shadow-dark-700 bg-dark-500": darkMode,
        },
      )}
    >
      {serverList.map((server) => {
        return (
          <ServerListItem
            key={server.id}
            server={server}
            click={async () => {
              if (selectedServer?.id !== server.id) {
                const logs = await getLogs(server.id);
                setSelectedServer({ ...server, logs: logs });
              }
            }}
            selected={selectedServer?.id === server.id}
          />
        );
      })}
    </div>
  );
}
