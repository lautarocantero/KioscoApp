import { Navigate, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VerificationPage from "./pages/VerificationPage/VerificationPage";
import CheckEmailPage from "./pages/CheckEmailPage/CheckEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";

const AuthRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/check-email" element={<CheckEmailPage />} />
            <Route path="/verify-email" element={<VerificationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </>
    )
}

export default AuthRoutes;