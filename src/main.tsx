import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import StokoApp from "./StokoApp";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "animate.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <StokoApp />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
