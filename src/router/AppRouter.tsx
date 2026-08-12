import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AccountRoutes from "../modules/account/AccountRoutes";
import HomePage from "../modules/app/Home/HomePage";
import AuthRoutes from "../modules/auth/AuthRoutes";
import CartRoutes from "../modules/cart/routes/CartRoutes";
import ProductsRoutes from "../modules/products/ProductsRoutes";
import PresentationsRoutes from "../modules/presentations/PresentationsRoutes";
import ProvidersRoutes from "../modules/providers/ProvidersRoutes";
import SellsRoutes from "../modules/sells/routes/SellsRoutes";
import SellerRoutes from "../modules/sellers/routes/SellerRoutes";
import ShopRoutes from "../modules/shop/ShopRoutes";
import ReceiptRoutes from "../modules/receipt/ReceiptRoutes";
import type { AppDispatch, RootState } from "../store/auth/authSlice";
import { startCheckAuth } from "../store/auth/authThunks";
import RouteTracker from "./RouteTracker";
import AppShell from "../modules/shared/layout/AppShell";
import LoadingSpinnerComponent from "../modules/shared/components/LoadingSpinner";
import { AuthStatus } from "@typings/auth/authEnums";

const AppRouter = (): React.ReactNode => {
  const { status } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const lastRoute: string = localStorage.getItem("lastRoute") || "/new-sell";
  const safeRoute: string = lastRoute === "/" ? "/home" : lastRoute;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(startCheckAuth());
  }, [dispatch]);

  if (status === AuthStatus.Checking) {
    return <LoadingSpinnerComponent />; // o null, o un spinner
  }

  return (
    <>
      <RouteTracker />
      <Routes>
        {status === AuthStatus.Authenticated ? (
          <Route element={<AppShell />}>
            <Route path="/home" element={<HomePage />} />
            {SellsRoutes()}
            {SellerRoutes()}
            {CartRoutes()}
            {ShopRoutes()}
            {AccountRoutes()}
            {ProvidersRoutes()}
            {ProductsRoutes()}
            {ReceiptRoutes()}
            {PresentationsRoutes()}
            <Route path="*" element={<Navigate to={'/home'} />} />
          </Route>
        ) : (
          <>{AuthRoutes()}</>
        )}
      </Routes>

      {status === AuthStatus.Authenticated && location.pathname === "/" && (
        <Navigate to={safeRoute} replace />
      )}
    </>
  );
};

export default AppRouter;
