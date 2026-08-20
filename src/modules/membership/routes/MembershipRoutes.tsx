import { Route } from "react-router-dom";
import MembershipPlansPage from "../pages/MembershipPlansPage";
import MembershipCheckoutPage from "../pages/MembershipCheckoutPage";
import MembershipCheckoutResultPage from "../pages/MembershipCheckoutResultPage";

const MembershipRoutes = (): React.ReactNode => (
    <>
        <Route path="/membership/plans" element={<MembershipPlansPage />} />
        <Route path="/membership/checkout/result" element={<MembershipCheckoutResultPage />} />
        <Route path="/membership/checkout/:plan" element={<MembershipCheckoutPage />} />
    </>
);

export default MembershipRoutes;
