import { Route } from "react-router-dom"
import AccountPage from "./pages/AccountPage";
import AccountEditPage from "./pages/AccountEditPage";
import AccountSubscriptionPage from "./pages/AccountSubscriptionPage";

const AccountRoutes = ():React.ReactNode  => {

    return (
        <>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account-edit" element={<AccountEditPage />} />
            <Route path="/account-subscription" element={<AccountSubscriptionPage />} />
        </>
    )
}

export default AccountRoutes;