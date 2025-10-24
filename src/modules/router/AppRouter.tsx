import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import RegisterPage from "../auth/pages/RegisterPage/RegisterPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
