import { Route } from "react-router-dom"
import ProvidersPage from "./pages/ProvidersPage"
import ProvidersListPage from "./pages/ProvidersListPage"
import ProvidersCreatePage from "./pages/ProvidersCreatePage"
import ProvidersEditPage from "./pages/ProvidersEditPage"



const ProvidersRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/providers" element={<ProvidersPage />} />
            <Route path="/providers-list" element={<ProvidersListPage />} />
            <Route path="/providers-create" element={<ProvidersCreatePage />} />
            <Route path="/providers-edit" element={<ProvidersEditPage />} />
        </>
    )
}

export default ProvidersRoutes;