
//─────────────────── Componente 🧩: AppRouter ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Definición de rutas para el flujo de la aplicacion.  
// Renderiza la página principal dentro del sistema de enrutamiento. 
// Si autenticado: rutas privadas (Home, Ventas, Carrito, Tienda, Cuenta, Proveedores, Productos). 
// Si no: rutas de Auth.
// ShopRoutes: Maneja rutas de Tienda. 
// Incluye administradores (lista, crear, editar), vendedores (lista, crear, editar) y estadísticas.
// Otros módulos: 
// - SellsRoutes (ventas) 
// - CartRoutes (carrito) 
// - AccountRoutes (cuenta) 
// - ProvidersRoutes (proveedores) 
// - ProductsRoutes (productos) 
// - AuthRoutes (autenticación)

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Usa `react-router-dom` para la gestión de rutas.  

//-----------------------------------------------------------------------------//

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AccountRoutes from "../modules/account/AccountRoutes";
import HomePage from "../modules/app/Home/HomePage";
import AuthRoutes from "../modules/auth/AuthRoutes";
import CartRoutes from "../modules/cart/CartRoutes";
import ProductsRoutes from "../modules/products/ProductsRoutes";
import ProvidersRoutes from "../modules/providers/ProvidersRoutes";
import SellsRoutes from "../modules/sells/SellsRoutes";
import ShopRoutes from "../modules/shop/ShopRoutes";
import type { AppDispatch, RootState } from "../store/auth/authSlice";
import { startCheckAuth } from "../store/auth/thunks";
import RouteTracker from "./RouteTracker";

const AppRouter = ():React.ReactNode => {
  const {auth} = useSelector((state: RootState) => state);
  const {status} = auth;
  const location = useLocation();
  const lastRoute: string = localStorage.getItem("lastRoute") || "/new-sell";
  const safeRoute: string = lastRoute === "/" ? "/home" : lastRoute;

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
