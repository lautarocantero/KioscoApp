import { Navigate, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VerificationPage from "./pages/VerificationPage/VerificationPage";

const AuthRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerificationPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </>
    )
}

export default AuthRoutes;