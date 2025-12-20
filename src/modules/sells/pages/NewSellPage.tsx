
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

import BarcodeReaderIcon from '@mui/icons-material/BarcodeReader';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { Grid, Typography, type Theme } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import type { AppDispatch, RootState } from "../../../store/product/productSlice";
import { getProducts } from "../../../store/product/thunks";
import AppLayout from "../../shared/layout/AppLayout";
import ModeButtonComponent from "./components/ModeButton";
import ProductDialog from "./components/ProductDialog/ProductDialog";
import ProductsExhibitor from "./components/ProductsExhibitorComponent";

const NewSellPage = ():React.ReactNode => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();
    const { product } = useSelector((state: RootState) => state);
    const { products } = product;
    const [showProducts, setShowProducts] = useState<boolean>(false);


    useEffect(() => {
      const fetchProducts = async () => {
        await dispatch(getProducts());
      };
      fetchProducts();
    }, []);

    if(!showProducts) return (
        <AppLayout>
            <Grid
                container
                sx={{
                    mt: '9em',
                    width : '100%',
                }}
            >
                <Grid
                    sx={(theme: Theme) => ({
                        backgroundColor: theme?.custom?.blackTranslucid,
                        display: {xs: 'none', sm: 'block'}
                    })}
                >
                    <Typography>Tipo de venta</Typography>
                </Grid>
                <Grid
                    sx={(theme: Theme) => ({
                        height: { xs: '10em'},
                        marginTop: { xs: '1em'},
                        backgroundColor: theme?.custom?.blackTranslucid,
                        width : '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: '2em'
                    })}
                >
                    <ModeButtonComponent 
                        functionAction={() => navigate('/qr-scan')} 
                        text={'escanear qr'} 
                        icon={
                            <BarcodeReaderIcon 
                                sx={(theme: Theme) => ({
                                    fontSize: '6em',
                                    color: theme?.palette?.primary?.main
                                })}
                            />
                        } 
                    />
                    <ModeButtonComponent 
                        functionAction={() => setShowProducts(true)} 
                        text={'manualmente'} 
                        icon={
                            <KeyboardIcon 
                                sx={(theme: Theme) => ({
                                    fontSize: '6em',
                                    color: theme?.palette?.primary?.main
                                })} 
                            />
                        } 
                    />
                </Grid>
            </Grid>
            
            
        </AppLayout>
    )

    return (
        <AppLayout>
            <ProductsExhibitor products={products} title={'Más vendido'} />
            <ProductDialog />
        </AppLayout>

    )

}

export default NewSellPage;