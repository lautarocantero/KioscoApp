import { Route } from "react-router-dom";
import type { ReactNode } from "react";
import ProvidersListPage from "../pages/ProvidersList/ProvidersListPage";
import ProviderCreatePage from "../pages/ProviderCreate/ProviderCreatePage";
import ProviderEditPage from "../pages/ProviderEdit/ProviderEditPage";
import ProviderDetailPage from "../pages/ProviderDetail/ProviderDetailPage";

const ProviderRoutes = (): ReactNode => {
    return (
        <>
            <Route path="/providers" element={<ProvidersListPage />} />
            <Route path="/provider-create" element={<ProviderCreatePage />} />
            <Route path="/provider/:provider_id" element={<ProviderDetailPage />} />
            <Route path="/provider/:provider_id/provider-edit" element={<ProviderEditPage />} />
        </>
    );
};

export default ProviderRoutes;
