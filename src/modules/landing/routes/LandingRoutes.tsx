import { Route } from "react-router-dom";
import type { ReactNode } from "react";
import LandingPage from "../pages/LandingPage/LandingPage";

const LandingRoutes = (): ReactNode => {
  return (
    <>
      <Route path="/landing" element={<LandingPage />} />
    </>
  );
};

export default LandingRoutes;
