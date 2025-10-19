import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";


const AppRouther = () => {
  
  return (
  <Routes>
        <Route path="*" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRouther;