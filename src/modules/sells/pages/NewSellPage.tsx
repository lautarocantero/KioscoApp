
//─────────────────── Pagina 🧩: NewSellPage ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Página principal para iniciar una nueva venta.  
// Gestiona la obtención de productos desde el store, muestra un exhibidor con los más vendidos y habilita el diálogo de producto.  
// También ofrece un flujo alternativo para escanear QR o seleccionar productos manualmente.  
//   - Renderiza dos botones:  
//     - Escanear QR (`navigate('/qr-scan')`).  
//     - Selección manual (`setShowProducts(true)`).  

//──────────────────── Funciones 🔧 ─────────────────────//
// -NewSellPage Renderiza la vista
//      -setShowProducts Por defecto es false, lo que muestra un cartel de seleccion (qr - manual)
//      -ProductsExhibitor Muestra todos los productos existentes
//      -ProductDialog Modal que se abre al seleccionar un producto, da la posibilidad de agregar al carrito

//─────────────────── Notas técnicas 💽 ───────────────────//
//   - Venta rápida mediante QR.  
//   - Venta manual mediante selección visual de productos.  

//-----------------------------------------------------------------------------//

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import type { AppDispatch, RootState } from "../../../store/product/productSlice";
import { getProducts } from "../../../store/product/thunks";
import AppLayout from "../../shared/layout/AppLayout";
import ProductDialog from "./components/ProductDialog/ProductDialog";
import ProductsExhibitor from "./components/ProductsExhibitorComponent";

const NewSellPage = ():React.ReactNode => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();
    const { product } = useSelector((state: RootState) => state);
    const { products } = product;
    const [showProducts, setShowProducts] = useState<boolean>(true);


    useEffect(() => {
      const fetchProducts = async () => {
        await dispatch(getProducts());
      };
      fetchProducts();
    }, []);

    if(!showProducts) return (
        <>
            <button onClick={ () => navigate('/qr-scan')}>escanear qr</button>
            <button onClick={ () => setShowProducts(true)}>manualmente</button>
        </>
    )

    return (
        <AppLayout>
            <ProductsExhibitor products={products} title={'Más vendido'} />
            <ProductDialog />
        </AppLayout>

    )

}

export default NewSellPage;