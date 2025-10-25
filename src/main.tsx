import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import KioscoApp from "./KioscoApp";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <KioscoApp />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
