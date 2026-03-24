import { useEffect } from "react";
import { useDarkModeContext } from "../contexts/DarkMode";
import { useSelectedServerContext } from "../contexts/SelectedServer";
import { ServerStatusIcon } from "../icons";
import { type Server } from "../types";
import { startServer, stopServer } from "../service/server";
import clsx from "clsx";

export function ServerPane({ server }: { server: Server | null }) {
  const { darkMode } = useDarkModeContext();
  const { setSelectedServer } = useSelectedServerContext();

  const sentence = server?.name.replace(/-/g, " ");
  const name = sentence
    ? sentence[0].toUpperCase() + sentence?.substring(1)
    : "";

  useEffect(() => {}, [server]);

  return (
    <div
      className={clsx("transition duration-500 flex flex-col w-full grow", {
        "items-center justify-center": !server,
        "bg-white text-black shadow": !darkMode,
        "bg-gray-600 text-white": darkMode,
      })}
    >
      {server ? (
        <>
          <div className="transition duration-300 flex flex-row justify-between items-baseline px-8 py-6">
            <div className="flex flex-row gap-4 items-center text-2xl font-medium">
              <div className="transition duration-300 text-[2.5rem] font-semibold pr-4">
                {name}
              </div>
              <div
                className={clsx("transition duration-300 font-regular", {
                  "text-red-500": !server?.running,
                  "text-green-500": server?.running,
                })}
              >
                {server?.running ? "Online" : "Offline"}
              </div>
              <div className="w-4 h-4">
                <ServerStatusIcon running={server?.running} />
              </div>
            </div>
            <button
              className={clsx(
                "transition duration-300 flex items-center justify-center min-w-32 max-w-48 text-xl font-semibold px-8 py-2",
                {
                  "border-2 text-black hover:bg-gray-300": !server?.running,
                  "bg-red-500 hover:bg-red-700 text-white": server?.running,
                },
              )}
              onClick={() => {
                if (!server?.running) {
                  setSelectedServer((selectedServer) => {
                    return {
                      ...selectedServer,
                      logs: [],
                    } as Server;
                  });
                  startServer(server.id);
                } else {
                  stopServer(server.id);
                }
              }}
            >
              {server?.running ? "Stop Server" : "Start Server"}
            </button>
          </div>
          <div className="transition duration-300 flex flex-col gap-1 bg-black grow p-4 overflow-y-auto">
            {(server?.logs ?? []).map((log) => {
              return (
                <div
                  key={log.id}
                  className="border-l-3 border-green-500 text-green-500 pl-3 text-lg break-words"
                >
                  {log.log}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-[2.5rem] text-gray-300 font-semibold">
          No Server Selected
        </div>
      )}
    </div>
  );
}
