import { useDarkModeContext } from "../contexts/DarkMode";
import { DarkModeIcon } from "../icons";
import clsx from "clsx";

export function Header() {
  const { darkMode } = useDarkModeContext();

  return (
    <div
      className={clsx(
        "transition duration-500 flex flex-row w-full py-4 px-6 justify-between z-20 shadow-sm",
        {
          "bg-dark-500 shadow-dark-700": darkMode,
        },
      )}
    >
      <div className="text-2xl font-semibold">Server Dashboard</div>
      <div className="w-8 h-8">
        <DarkModeIcon />
      </div>
    </div>
  );
}
