import { createContext, useContext } from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType | null>(null);

export const useDarkModeContext = () => {
  const ctx = useContext(DarkModeContext);
  if (ctx === null) {
    throw Error("DarkModeContext is not within DarkModeProvider");
  }
  return ctx;
};
