import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DarkModeProvider } from "./contexts/DarkModeProvider";
import { SelectedServerProvider } from "./contexts/SelectedServerProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <SelectedServerProvider>
        <App />
      </SelectedServerProvider>
    </DarkModeProvider>
  </StrictMode>,
);
