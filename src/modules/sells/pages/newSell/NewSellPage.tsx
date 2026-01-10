
//─────────────────── Pagina 📑: NewSellPage ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Página principal para iniciar una nueva venta.  
// Al ingresar da 2 opciones, agregar productos de forma manual o mediante lector de codigo de barras, tambien
// gestiona la obtención de productos desde el store, muestra un exhibidor con los más vendidos y habilita el diálogo de producto. 


//──────────────────── Funciones 🔧 ─────────────────────//
// -NewSellPage Renderiza la vista
//      -setShowProducts Por defecto es false, lo que muestra un cartel de seleccion (barcode - manual)
//      -ProductsExhibitor Muestra todos los productos existentes
//      -ProductDialog Modal que se abre al seleccionar un producto, da la posibilidad de agregar al carrito
//      -ModeButtonComponent Muestra las 2 opciones para escanear, con codigo de barras y de forma manual
//      -SimpleSnackbar Muestra un snackbar para dar feedback al usuario.

//-----------------------------------------------------------------------------//

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../store/product/productSlice";
import { getProducts } from "../../../../store/product/thunks";
import type { Product } from '../../../../typings/product/productTypes';
import SimpleSnackbar from "../../../shared/components/SnackBar/SnackBarComponent";
import AppLayout from "../../../shared/layout/AppLayout";
import ProductDialog from "../../components/ProductDialog/ProductDialog";
import ProductsExhibitor from "../../components/ProductList/ProductsExhibitorComponent";

const NewSellPage = ():React.ReactNode => {

    const dispatch = useDispatch<AppDispatch>();

    const { product } = useSelector((state: RootState) => state);
    const { products } : {products: Product[]} = product;


    useEffect(() => {
      const fetchProducts = async () => {
        await dispatch(getProducts());
      };
      fetchProducts();
    }, []);

    return (
        <AppLayout>
            <ProductsExhibitor products={products} title={'Más vendido'} />
            <ProductDialog />
            <SimpleSnackbar  />
        </AppLayout>

    )

}

export default NewSellPage;