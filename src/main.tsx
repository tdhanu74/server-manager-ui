import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DarkModeProvider } from "./contexts/DarkMode";
import { SelectedServerProvider } from "./contexts/SelectedServer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DarkModeProvider>
      <SelectedServerProvider>
        <App />
      </SelectedServerProvider>
    </DarkModeProvider>
  </StrictMode>,
);
