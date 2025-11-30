import { Navigate, Route } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const AuthRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </>
    )
}

export default AuthRoutes;