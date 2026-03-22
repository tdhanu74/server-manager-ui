import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { type Server } from "../types";

interface SelectedServerContextType {
  selectedServer: Server;
  setSelectedServer: (server: Server) => void;
}

const SelectedServerContext = createContext<SelectedServerContextType | null>();

export const useSelectedServerContext = () => {
  const ctx = useContext(SelectedServerContext);
  if (ctx === null) {
    throw Error("SelectedServerContext is not within SelectedServerProvider");
  }
  return ctx;
};

export const SelectedServerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedServer, setSelectedServer] = useState<Server>();

  return (
    <SelectedServerContext.Provider
      value={{ selectedServer, setSelectedServer }}
    >
      {children}
    </SelectedServerContext.Provider>
  );
};
