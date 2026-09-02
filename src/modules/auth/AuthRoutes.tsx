import { Navigate, Route } from "react-router-dom"
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
            {/* Login y registro son un único componente/ruta (LoginPage, alternado
                por ?mode=register) para que AuthLayout no se remonte al cambiar de
                formulario. "/register" se conserva como alias por los links externos
                que ya apuntan ahí (landing, useJoinKioscoAccess, etc). */}
            <Route path="/register" element={<Navigate to="/login?mode=register" replace />} />
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