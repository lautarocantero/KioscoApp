import { Route } from "react-router-dom";
import PresentationCreatePage from "./pages/PresentationCreate/PresentationCreatePage";
import PresentationDetailPage from "./pages/PresentationDetail/PresentationDetailPage";
import PresentationListPage   from "./pages/PresentationList/PresentationListPage";
import PresentationEditPage from "./pages/PresentationEdit/PresentationEditPage";

const PresentationsRoutes = (): React.ReactNode => {
    return (
        <>
            {/* Estáticos primero */}
            <Route path="/products/:product_id/presentations/new"                      element={<PresentationCreatePage />} />
            {/* Dinámicos después */}
            <Route path="/products/:product_id/presentations/:presentation_id/edit"    element={<PresentationEditPage />} />
            <Route path="/products/:product_id/presentations/:presentation_id"         element={<PresentationDetailPage />} />
            <Route path="/products/:product_id/presentations"                          element={<PresentationListPage />} />
        </>
    );
};

export default PresentationsRoutes;
