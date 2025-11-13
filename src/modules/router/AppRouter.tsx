import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import RegisterPage from "../auth/pages/RegisterPage/RegisterPage";
import HomePage from "../auth/pages/HomePage/HomePage";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/auth/authSlice";

const AppRouter = () => {
  const {auth} = useSelector((state: RootState) => state);
  const {status} = auth;

  return (
    <Routes>
      {
        status === 'authenticated'
          ? (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )
          : (
            <>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )
      }
    </Routes>


  );
};

export default AppRouter;
