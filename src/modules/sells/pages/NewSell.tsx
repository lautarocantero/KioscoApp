
// # Página: NewSellPage  

// ## Descripción 📦  
// Página principal para iniciar una nueva venta.  
// Gestiona la obtención de productos desde el store, muestra un exhibidor con los más vendidos y habilita el diálogo de producto.  
// También ofrece un flujo alternativo para escanear QR o seleccionar productos manualmente.  

// ## Lógica 🔧  
// - **Estados locales**:  
//   - `showProducts`: controla si se muestran los productos o si se habilita la vista alternativa (QR/manual).  
// - **Redux**:  
//   - `useDispatch`: dispara el thunk `getProducts` para obtener productos desde el backend.  
//   - `useSelector`: accede al estado global `product` y extrae `products`.  
// - **React Router**:  
//   - `useNavigate`: permite redirigir al flujo de escaneo QR.  
// - **useEffect**:  
//   - Al montar el componente, ejecuta `dispatch(getProducts())` para cargar los productos disponibles.  

// ## Renderizado 🎨  
// - Si `showProducts` es `false`:  
//   - Renderiza dos botones:  
//     - Escanear QR (`navigate('/qr-scan')`).  
//     - Selección manual (`setShowProducts(true)`).  
// - Si `showProducts` es `true`:  
//   - Renderiza dentro de `AppLayout`:  
//     - `ProductsExhibitor`: muestra los productos con título "Más vendido".  
//     - `ProductDialog`: diálogo para gestionar selección y detalles del producto.  

// ## Notas técnicas 💽  
// - Modularidad: delega la presentación de productos a `ProductsExhibitor` y la interacción a `ProductDialog`.  
// - Escenarios de uso:  
//   - Venta rápida mediante QR.  
//   - Venta manual mediante selección visual de productos.  
// - Mantiene consistencia visual al usar `AppLayout` como contenedor principal.  


import { useEffect, useState } from "react";
import { useNavigate} from 'react-router-dom';
import AppLayout from "../../shared/layout/AppLayout";
import ProductsExhibitor from "./components/ProductsExhibitor";
import ProductDialog from "./components/ProductDialog/ProductDialog";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/product/productSlice";
import { getProducts } from "../../../store/product/thunks";

const NewSellPage = ():React.ReactNode => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
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