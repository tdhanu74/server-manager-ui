import { createContext, useContext } from "react";
import { type Server } from "../types";

interface SelectedServerContextType {
  selectedServer: Server | null;
  setSelectedServer: React.Dispatch<React.SetStateAction<Server | null>>;
}

export const SelectedServerContext =
  createContext<SelectedServerContextType | null>(null);

export const useSelectedServerContext = () => {
  const ctx = useContext(SelectedServerContext);
  if (ctx === null) {
    throw Error("SelectedServerContext is not within SelectedServerProvider");
  }
  return ctx;
};
