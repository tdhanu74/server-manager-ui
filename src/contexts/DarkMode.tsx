import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

interface DarkModeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | null>();

export const useDarkModeContext = () => {
  const ctx = useContext(DarkModeContext);
  if (ctx === null) {
    throw Error("DarkModeContext is not within DarkModeProvider");
  }
  return ctx;
};

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
