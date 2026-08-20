import { Navigate, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import VerificationPage from "./pages/VerificationPage/VerificationPage";
import CheckEmailPage from "./pages/CheckEmailPage/CheckEmailPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import TermsConditionsPage from "./pages/TermsConditionsPage/TermsConditionsPage";

const AuthRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/check-email" element={<CheckEmailPage />} />
            <Route path="/verify-email" element={<VerificationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/tems-conditions" element={<TermsConditionsPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </>
    )
}

export default AuthRoutes;