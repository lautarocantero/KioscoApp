import { Route } from "react-router-dom";
import ReceiptPage from "./pages/ReceiptPage/ReceiptPage";

const ReceiptRoutes = (): React.ReactNode => (
    <>
        <Route path="/receipts" element={<ReceiptPage />} />
    </>
);

export default ReceiptRoutes;
