import { Route } from "react-router-dom";
import type { ReactNode } from "react";
import KioscoSelectorPage from "../pages/KioscoSelectorPage";
import CreateKioscoPage from "../pages/CreateKioscoPage";

// Standalone: sin AppShell (sin sidebar), como el resto de las pantallas de
// onboarding. /join-kiosco vive aparte en AppRouter porque también debe ser
// alcanzable deslogueado (ver useJoinKioscoAccess).
const KioscoRoutes = (): ReactNode => {
    return (
        <>
            <Route path="/select-kiosco" element={<KioscoSelectorPage />} />
            <Route path="/create-kiosco" element={<CreateKioscoPage />} />
        </>
    );
};

export default KioscoRoutes;
