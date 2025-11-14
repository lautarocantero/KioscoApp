import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import RegisterPage from "../auth/pages/RegisterPage/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/auth/authSlice";
import { startCheckAuth } from "../../store/auth/thunks";
import HomePage from "../app/HomePage";
import SellsPage from "../sells/SellsPage";
import NewSellPage from "../sells/NewSell";
import CartPage from "../cart/CartPage";
import QrEscaner from "../sells/QrEscaner";
import SellsHistoryPage from "../sells/SellsHistory";
import SellsHistoryFiltersPage from "../sells/SellsHistoryFilter";
import ShopPage from "../shop/ShopPage";
import ShopAdminPage from "../shop/ShopAdminPage";
import ShopAdminListPage from "../shop/ShopAdminsListPage";
import ShopAdminCreatePage from "../shop/ShopAdminCreatePage";
import ShopAdminEditPage from "../shop/ShopAdminEditPage";
import ShopSellersPage from "../shop/ShopSellersPage";
import ShopSellersListPage from "../shop/ShopSellersListPage copy";
import ShopSellersCreatePage from "../shop/ShopSellersCreatePage";
import ShopSellersEditPage from "../shop/ShopSellersEditPage";
import ShopStadisticsPage from "../shop/ShopStadisticsPage";
import AccountPage from "../account/AccountPage";
import AccountEditPage from "../account/AccountEditPage";
import AccountSubscriptionPage from "../account/AccountSubscriptionPage";

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
              {/* sells */}
              <Route path="/sells" element={<SellsPage />} />
              <Route path="/new-sell" element={<NewSellPage />} />
              <Route path="/qr-scan" element={<QrEscaner />} />
              <Route path="/sells-history" element={<SellsHistoryPage />} />
              <Route path="/sells-history-filters" element={<SellsHistoryFiltersPage />} />
              {/* shopping cart */}
              <Route path="/cart" element={<CartPage />} />
              {/* shop */}
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop-administrators" element={<ShopAdminPage />} />
              <Route path="/shop-administrators-list" element={<ShopAdminListPage />} />
              <Route path="/shop-administrators-create" element={<ShopAdminCreatePage />} />
              <Route path="/shop-administrators-edit" element={<ShopAdminEditPage />} />
              <Route path="/shop-sellers" element={<ShopSellersPage />} />
              <Route path="/shop-sellers-list" element={<ShopSellersListPage />} />
              <Route path="/shop-sellers-create" element={<ShopSellersCreatePage />} />
              <Route path="/shop-sellers-edit" element={<ShopSellersEditPage />} />
              <Route path="/shop-stadistics" element={<ShopStadisticsPage />} />
              {/* Account */}
              <Route path="/account" element={<AccountPage />} />
              <Route path="/account-edit" element={<AccountEditPage />} />
              <Route path="/account-subscription" element={<AccountSubscriptionPage />} />
              {/*  */}
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
