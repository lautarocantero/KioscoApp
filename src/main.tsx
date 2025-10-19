import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import KioscoApp from "./KioscoApp";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <KioscoApp />
    </BrowserRouter>
  </StrictMode>
);
