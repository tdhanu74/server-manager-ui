import clsx from "clsx";
import { type Server } from "../types";
import { ServerStatusIcon } from "../icons";
import { useDarkModeContext } from "../contexts/DarkMode";

export function ServerListItem({
  server,
  click,
  selected,
}: {
  server: Server;
  click: () => void;
  selected: boolean;
}) {
  const { darkMode } = useDarkModeContext();

  const sentence = server?.name.replace(/-/g, " ");
  const name = sentence.toUpperCase();

  return (
    <div
      className={clsx(
        "transition duration-300 flex flex-row justify-between items-baseline py-2 px-6 shadow-sm",
        {
          "hover:bg-gray-200": !darkMode,
          "hover:bg-dark-700 shadow-dark-700": darkMode,
          "cursor-default": selected,
          "cursor-pointer": !selected,
          "bg-gray-200": !darkMode && selected,
          "bg-dark-700": darkMode && selected,
        },
      )}
      onClick={click}
    >
      <div className="text-lg font-[forced-square]">{name}</div>
      <div className="flex flex-row gap-2 items-baseline cursor-default">
        <div
          className={clsx("font-light text-sm", {
            "text-red-500": !server?.running,
            "text-green-500": server?.running,
          })}
        >
          {server?.running ? "Online" : "Offline"}
        </div>
        <div className="w-2 h-2">
          <ServerStatusIcon running={server?.running} />
        </div>
      </div>
    </div>
  );
}
