import { getServers, startServer, stopServer } from "../service/server";
import { StartStop } from "../icons/StartStop";
import { useState } from "react";

export function ServerCard({ server }: { server: unknown }) {
  const [running, setRunning] = useState(server?.running);

  const sentence = server?.name.replace(/-/g, " ");
  const name = sentence.charAt(0).toUpperCase() + sentence.slice(1);

  return (
    <div
      className={
        server?.running
          ? "flex flex-col justify-between w-96 h-48 p-2 border border-[rgba(34,_197,_94,_0.5)] shadow-[0px_0px_6px_2px_rgba(34,_197,_94,_0.5)] rounded-lg"
          : "flex flex-col justify-between w-96 h-48 p-2 border-2 rounded-lg bg-white"
      }
    >
      <div className="flex flex-row gap-4 justify-between">
        <div className="text-[2rem] p-2 font-medium">{name}</div>
        <div className="flex flex-col p-2 text-semibold text-white h-full items-center justify-center">
          <div className="bg-blue-400 p-1 rounded">
            {server?.type[0].toUpperCase() + server?.type.substring(1)}
          </div>
        </div>
      </div>

      <div className="transition-all duration-300 w-12 h-12 self-end m-2">
        <StartStop
          running={running}
          execute={() => {
            if (!running) {
              startServer(server?.id);
            } else {
              stopServer(server?.id);
            }
          }}
        />
      </div>
    </div>
  );
}
