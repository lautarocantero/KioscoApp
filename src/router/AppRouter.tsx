import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/auth/authSlice";
import { startCheckAuth } from "../store/auth/thunks";
import HomePage from "../modules/app/Home/HomePage";
import SellsPage from "../modules/sells/SellsPage";
import NewSellPage from "../modules/sells/NewSell";
import QrEscaner from "../modules/sells/QrEscaner";
import SellsHistoryPage from "../modules/sells/SellsHistory";
import SellsHistoryFiltersPage from "../modules/sells/SellsHistoryFilter";
import CartPage from "../modules/cart/CartPage";
import ShopPage from "../modules/shop/ShopPage";
import ShopAdminPage from "../modules/shop/ShopAdminPage";
import ShopAdminListPage from "../modules/shop/ShopAdminsListPage";
import ShopAdminCreatePage from "../modules/shop/ShopAdminCreatePage";
import ShopAdminEditPage from "../modules/shop/ShopAdminEditPage";
import ShopSellersPage from "../modules/shop/ShopSellersPage";
import ShopSellersListPage from "../modules/shop/ShopSellersListPage copy";
import ShopSellersCreatePage from "../modules/shop/ShopSellersCreatePage";
import ShopSellersEditPage from "../modules/shop/ShopSellersEditPage";
import ShopStadisticsPage from "../modules/shop/ShopStadisticsPage";
import AccountPage from "../modules/account/AccountPage";
import AccountEditPage from "../modules/account/AccountEditPage";
import AccountSubscriptionPage from "../modules/account/AccountSubscriptionPage";
import ProvidersPage from "../modules/providers/ProvidersPage";
import ProvidersListPage from "../modules/providers/ProvidersListPage";
import ProvidersCreatePage from "../modules/providers/ProvidersCreatePage";
import ProvidersEditPage from "../modules/providers/ProvidersEditPage";
import ProductsPage from "../modules/products/ProductsPage";
import ProductsListPage from "../modules/products/ProductsListPage";
import ProductsCreatePage from "../modules/products/ProductsCreatePage";
import ProductsEditPage from "../modules/products/ProductsEditPage";
import CategoriesPage from "../modules/products/CategoriesPage";
import CategoriesListPage from "../modules/products/CategoriesListPage";
import CategoriesCreatePage from "../modules/products/CategoriesCreatePage";
import CategoriesEditPage from "../modules/products/CategoriesEditPage";
import { LoginPage } from "../modules/auth/pages/LoginPage";
import RegisterPage from "../modules/auth/pages/RegisterPage/RegisterPage";

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
              {/* providers */}
              <Route path="/providers" element={<ProvidersPage />} />
              <Route path="/providers-list" element={<ProvidersListPage />} />
              <Route path="/providers-create" element={<ProvidersCreatePage />} />
              <Route path="/providers-edit" element={<ProvidersEditPage />} />
              {/* products */}
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products-list" element={<ProductsListPage />} />
              <Route path="/products-create" element={<ProductsCreatePage />} />
              <Route path="/products-edit" element={<ProductsEditPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories-list" element={<CategoriesListPage />} />
              <Route path="/categories-create" element={<CategoriesCreatePage />} />
              <Route path="/categories-edit" element={<CategoriesEditPage />} />
              
              
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
