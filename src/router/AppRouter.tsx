import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/auth/authSlice";
import { startCheckAuth } from "../store/auth/thunks";
import HomePage from "../modules/app/Home/HomePage";
import SellsRoutes from "../modules/sells/SellsRoutes";
import ShopRoutes from "../modules/shop/ShopRoutes";
import AccountRoutes from "../modules/account/AccountRoutes";
import ProvidersRoutes from "../modules/providers/ProvidersRoutes";
import ProductsRoutes from "../modules/products/ProductsRoutes";
import CartRoutes from "../modules/cart/CartRoutes";
import AuthRoutes from "../modules/auth/AuthRoutes";
import { useEffect } from "react";
import RouteTracker from "./RouteTracker";

const AppRouter = ():React.ReactNode => {
  const {auth} = useSelector((state: RootState) => state);
  const {status} = auth;
  const location = useLocation();
  // To do, remover esto para que funcione normalmente, forzado a mostrar la nueva venta
  // const lastRoute = localStorage.getItem("lastRoute") || "/new-sell";
  // const safeRoute = lastRoute === "/" ? "/home" : lastRoute;
  const lastRoute = "/new-sell";
  const safeRoute =  lastRoute;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkAuthentication = async () => {
      try{
        await dispatch(startCheckAuth());
      } catch (error: unknown) {
        if(!(error instanceof Error)) throw new Error("NO se ha encontrado un refreshToken, deslogueando");
        throw new Error(error.message);
      }
    }

  checkAuthentication();
  },[dispatch])
  
  return (
    <>
      <RouteTracker />
      <Routes>
        {
          status === 'authenticated'
            ? (
              <>
                <Route path="/home" element={<HomePage />} />
                {SellsRoutes()}
                {CartRoutes()}
                {ShopRoutes()}
                {AccountRoutes()}
                {ProvidersRoutes()}
                {ProductsRoutes()}
                <Route path="*" element={<Navigate to={'/home'} />} />
              </>
            )
            : (
              <>
                {AuthRoutes()}
              </>
            )
        }
      </Routes>

      {status === "authenticated" && location.pathname === "/" && (
        <Navigate to={safeRoute} replace />
      )}
    </>
  );
};

export default AppRouter;
