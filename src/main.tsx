import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import StokoApp from "./StokoApp";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "animate.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StokoApp />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);