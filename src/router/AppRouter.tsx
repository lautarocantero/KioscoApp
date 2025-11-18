// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
// import type { AppDispatch, RootState } from "../store/auth/authSlice";
import type { RootState } from "../store/auth/authSlice";
// import { startCheckAuth } from "../store/auth/thunks";
import HomePage from "../modules/app/Home/HomePage";
import SellsRoutes from "../modules/sells/SellsRoutes";
import ShopRoutes from "../modules/shop/ShopRoutes";
import AccountRoutes from "../modules/account/AccountRoutes";
import ProvidersRoutes from "../modules/providers/ProvidersRoutes";
import ProductsRoutes from "../modules/products/ProductsRoutes";
import CartRoutes from "../modules/cart/CartRoutes";
import AuthRoutes from "../modules/auth/AuthRoutes";

const AppRouter = ():React.ReactNode => {
  const {auth} = useSelector((state: RootState) => state);
  const {status} = auth;

  // const dispatch = useDispatch<AppDispatch>();

  // const checkAuthentication = async () => {
    // await dispatch(startCheckAuth());
    // // const response = await dispatch(startCheckAuth());
    // // console.log('response', response);
  // }
 
  // if(status === 'authenticated'){
    // checkAuthentication();
  // }
  
  return (
    <Routes>
      {
        status === 'authenticated'
          ? (
            <>
              <Route path="/home" element={<HomePage />} />
              {/* sells */}
              {SellsRoutes()}
              {/* shopping cart */}
              {CartRoutes()}
              {/* shop */}
              {ShopRoutes()}
              {/* Account */}
              {AccountRoutes()}
              {/* providers */}
              {ProvidersRoutes()}
              {/* products */}
              {ProductsRoutes()}
              {/*  */}
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )
          : (
            <>
              {AuthRoutes()}
            </>
          )
      }
    </Routes>


  );
};

export default AppRouter;
