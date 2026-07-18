import { Route } from "react-router-dom";
import PresentationCreatePage from "./pages/PresentationCreate/PresentationCreatePage";
import PresentationDetailPage from "./pages/PresentationDetail/PresentationDetailPage";
import PresentationListPage   from "./pages/PresentationList/PresentationListPage";
import PresentationEditPage from "./pages/PresentationEdit/PresentationEditPage";

const PresentationsRoutes = (): React.ReactNode => {
    return (
        <>
            <Route path="/products/:product_id/presentations"                          element={<PresentationListPage />} />
            <Route path="/products/:product_id/presentation-create"                      element={<PresentationCreatePage />} />
            <Route path="/products/:product_id/presentation/:presentation_id"         element={<PresentationDetailPage />} />
            <Route path="/products/:product_id/presentation/:presentation_id/presentation-edit"    element={<PresentationEditPage />} />
        </>
    );
};

export default PresentationsRoutes;
