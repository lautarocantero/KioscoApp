import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import RegisterPage from "../auth/pages/RegisterPage/RegisterPage";
import HomePage from "../auth/pages/HomePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/auth/authSlice";
import { startCheckAuth } from "../../store/auth/thunks";

const AppRouter = () => {
  const {auth} = useSelector((state: RootState) => state);
  const {status} = auth;

  const dispatch = useDispatch<AppDispatch>();

  const checkAuthentication = async () => {
    await dispatch(startCheckAuth());
    // const response = await dispatch(startCheckAuth());
    // console.log('response', response);
  }
 
  if(status === 'authenticated'){
    checkAuthentication();
  }
  
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
