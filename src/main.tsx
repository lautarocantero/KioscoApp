import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./modules/app/App.tsx";
import { LoginPage } from "./modules/auth/pages/LoginPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginPage />
  </StrictMode>
);
