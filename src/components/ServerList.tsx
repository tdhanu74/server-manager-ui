import { ServerListItem } from "./";
import { type Server } from "../types";
import { getLogs } from "../service/server";
import { useSelectedServerContext } from "../contexts/SelectedServer";

export function ServerList({ serverList }: { serverList: Server[] }) {
  const { selectedServer, setSelectedServer } = useSelectedServerContext();

  return (
    <div className="flex flex-col w-full h-full min-w-64 max-w-80 shadow-sm shadow-gray-300 z-10">
      {serverList.map((server) => {
        return (
          <ServerListItem
            key={server.id}
            server={server}
            click={async () => {
              const logs = await getLogs(server.id);
              setSelectedServer({ ...server, logs: logs });
            }}
            selected={selectedServer?.id === server.id}
          />
        );
      })}
    </div>
  );
}
