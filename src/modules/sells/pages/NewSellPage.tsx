
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

//-----------------------------------------------------------------------------//

import BarcodeReaderIcon from '@mui/icons-material/BarcodeReader';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { Grid, Typography, type Theme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import type { AppDispatch, RootState } from "../../../store/product/productSlice";
import { getProducts } from "../../../store/product/thunks";
import AppLayout from "../../shared/layout/AppLayout";
import ModeButtonComponent from "./components/ModeButton";
import ProductDialog from "./components/ProductDialog/ProductDialog";
import ProductsExhibitor from "./components/ProductsExhibitorComponent";
import BackButton from '../../shared/components/Buttons/BackButton';
import { ThemeContext } from '../../../theme/ThemeContext';
import type { Product } from '../../../typings/product/productTypes';

const NewSellPage = ():React.ReactNode => {
    const { appTheme } = useContext(ThemeContext);

    const dispatch = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();

    const { product } = useSelector((state: RootState) => state);
    const { products } : {products: Product[]} = product;
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
                    m: '6em auto',
                    width : { xs: '100%' , sm: '80%'},
                }}
            >
                <Grid
                  sx={(theme: Theme) => ({
                    alignContent: 'center',
                    backgroundColor: !appTheme ? theme.custom.backgroundDark : theme.custom.backgroundLigth,
                    borderRadius: '1em',
                    color: !appTheme ? theme?.custom?.fontColor : theme.custom.fontColorDark,
                    width: { xs: '90%'},
                    padding: {xs: '1em' },
                    margin: '0 auto'
                  })}
                >
                  <Typography
                    variant="h1"
                    sx={(theme: Theme) => ({
                        fontSize: {xs: theme?.typography?.h4.fontSize, sm: theme?.typography?.h2.fontSize, md: theme?.typography?.h1.fontSize },
                        textAlign: 'center',
                        
                    })}
                  >
                    Tipo de venta
                  </Typography>
                </Grid>
                <Grid
                    container
                    sx={(theme: Theme) => ({
                        display: 'flex',
                        flexDirection: 'column',
                        width : '100%',
                        backgroundColor: theme?.custom?.blackTranslucid,
                    })}
                >
                    <Grid
                        sx={{
                            height: { xs: '8em', sm: '14em'},
                            marginTop: { xs: '1em'},
                            width : '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '2em'
                        }}
                    >
                        <ModeButtonComponent 
                            functionAction={() => navigate('/qr-scan')} 
                            text={'Escanear QR'} 
                            icon={
                                <BarcodeReaderIcon 
                                    sx={(theme: Theme) => ({
                                        fontSize: {xs:'6em',sm:'12em'},
                                        color: theme?.palette?.primary?.main,
                                        '&:hover': {
                                           color: theme?.custom?.fontColor, 
                                        }
                                    })}
                                />
                            } 
                        />
                        <ModeButtonComponent 
                            functionAction={() => setShowProducts(true)} 
                            text={'Manualmente'} 
                            icon={
                                <KeyboardIcon 
                                    sx={(theme: Theme) => ({
                                        fontSize: {xs:'6em',sm:'12em'},
                                        color: theme?.palette?.primary?.main,
                                        '&:hover': {
                                           color: theme?.custom?.fontColor, 
                                        }
                                    })} 
                                />
                            } 
                        />
                    </Grid>
                    <BackButton appTheme={appTheme} />
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