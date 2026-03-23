import { type ReactNode, useState } from "react";
import { SelectedServerContext } from "./SelectedServer";
import { type Server } from "../types";

export const SelectedServerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);

  return (
    <SelectedServerContext.Provider
      value={{ selectedServer, setSelectedServer }}
    >
      {children}
    </SelectedServerContext.Provider>
  );
};
