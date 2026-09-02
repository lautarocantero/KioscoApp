import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AccountRoutes from "../modules/account/AccountRoutes";
import AuthRoutes from "../modules/auth/AuthRoutes";
import CartRoutes from "../modules/cart/routes/CartRoutes";
import ProductsRoutes from "../modules/products/routes/ProductsRoutes";
import PresentationsRoutes from "../modules/presentations/PresentationsRoutes";
import ProviderRoutes from "../modules/providers/routes/ProviderRoutes";
import SellsRoutes from "../modules/sells/routes/SellsRoutes";
import SellerRoutes from "../modules/sellers/routes/SellerRoutes";
import ShopRoutes from "../modules/shop/routes/ShopRoutes";
import ReceiptRoutes from "../modules/receipt/ReceiptRoutes";
import NotificationRoutes from "../modules/notifications/routes/NotificationRoutes";
import MembershipRoutes from "../modules/membership/routes/MembershipRoutes";
import type { AppDispatch, RootState } from "../store/auth/authSlice";
import { startCheckAuth } from "../store/auth/authThunks";
import RouteTracker from "./RouteTracker";
import AppShell from "../modules/shared/layout/AppShell";
import LoadingScreen from "../modules/shared/components/LoadingScreen/LoadingScreen";
import { AuthStatus } from "@typings/auth/authEnums";
import KioscoRoutes from "../modules/kiosco/routes/KioscoRoutes";
import JoinKioscoPage from "../modules/kiosco/pages/JoinKioscoPage";
import { useHandlePendingInviteCode } from "../hooks/kiosco/useHandlePendingInviteCode";
import LandingRoutes from "../modules/landing/routes/LandingRoutes";

const AppRouter = (): React.ReactNode => {
  const { status } = useSelector((state: RootState) => state.auth);
  const { myKioscos, activeKioscoId } = useSelector((state: RootState) => state.kiosco);
  const location = useLocation();
  const lastRoute: string = localStorage.getItem("lastRoute") || "/new-sell";
  const safeRoute: string = lastRoute === "/" ? "/shop" : lastRoute;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(startCheckAuth());
  }, [dispatch]);

  useHandlePendingInviteCode();

  if (status === AuthStatus.Checking) {
    return <LoadingScreen />;
  }

  const hasActiveKiosco = myKioscos.some((k) => k._id === activeKioscoId);

  return (
    <>
      <RouteTracker />
      <Routes>
        {/* Alcanzable logueado o no: useJoinKioscoAccess decide a dónde mandar. */}
        <Route path="/join-kiosco" element={<JoinKioscoPage />} />

        {status === AuthStatus.Authenticated ? (
          <>
            {KioscoRoutes()}
            {hasActiveKiosco ? (
              <Route element={<AppShell />}>
                {ShopRoutes()}
                {SellsRoutes()}
                {CartRoutes()}
                {SellerRoutes()}
                {AccountRoutes()}
                {ProviderRoutes()}
                {ProductsRoutes()}
                {ReceiptRoutes()}
                {PresentationsRoutes()}
                {NotificationRoutes()}
                {MembershipRoutes()}
                <Route path="*" element={<Navigate to={'/shop'} />} />
              </Route>
            ) : (
              <Route path="*" element={<Navigate to={'/select-kiosco'} />} />
            )}
          </>
        ) : (
          <>
            {LandingRoutes()}
            {AuthRoutes()}
          </>
        )}
      </Routes>

      {status === AuthStatus.Authenticated && hasActiveKiosco && location.pathname === "/" && (
        <Navigate to={safeRoute} replace />
      )}
    </>
  );
};

export default AppRouter;
