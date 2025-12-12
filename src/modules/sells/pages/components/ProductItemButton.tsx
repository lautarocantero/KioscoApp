
// # Componente: ProductItemButton  

// ## Descripción 📦
// Botón de acción para añadir un producto al carrito desde la vista de ítem.  
// Controla la apertura del diálogo de producto y despacha la selección al store de Redux.  

// ## Funciones 🔧
// - `ProductItemButton`: componente principal que recibe `product` tipado con `ProductItemButtonType`.  
//   - Usa `ProductDialogContext` para abrir el modal (`setShowModal`).  
//   - Usa `useDispatch` para enviar la acción `selectProductThunk`.  
// - `selectProduct`: función asíncrona que:  
//   - Valida que exista un producto seleccionado.  
//   - Despacha `selectProductThunk` con los datos del producto.  
// - Renderiza un `Button` con ícono `AddShoppingCartIcon` y estilos personalizados.  
//   - Al hacer click:  
//     - Abre el modal (`setShowModal(true)`).  
//     - Ejecuta `selectProduct({product})`.  

// ## Notas técnicas 💽
// - Usa `Grid` de MUI como contenedor para controlar el ancho responsivo.  
// - Estilos dinámicos aplicados con `Theme` de MUI para coherencia visual.  
// - El botón mantiene un diseño compacto (`size="small"`) y evita transformación de texto (`textTransform: "none"`).  
// - Se integra en `ProductItemEspecificationsRight` como acción principal de compra.  
//-----------------------------------------------------------------------------//

import { Button, Grid, type Theme } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContext } from "react";
import type { ProductItemButtonType } from "../../../../typings/sells/sellsComponentTypes";
import { ProductDialogContext } from "../context/ProductDialogContext";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/seller/sellerSlice";
import { selectProductThunk } from "../../../../store/seller/sellerThunks";
import type { getProductSelectedPayload } from "../../../../typings/seller/sellerTypes";

const ProductItemButton = ({product} : ProductItemButtonType):React.ReactNode => {
    const { setShowModal } = useContext(ProductDialogContext)!;
    const dispatch = useDispatch<AppDispatch>();

    const selectProduct = async({product}: Partial<getProductSelectedPayload>): Promise<void> => {
        if(!product) throw new Error('No se ha seleccionado un producto');
        await dispatch(selectProductThunk({productData: product }));
    }

    return (
        <Grid 
            container
            sx={{ width: {xs: 'auto', sm: '50%', md: '100%' }}}
        >
            <Button
                variant="contained"
                size="small"
                sx={(theme: Theme) => ({
                    backgroundColor: {xs: theme?.custom?.blackTranslucid, md: theme?.palette?.primary?.main },
                    border: `0.1em solid ${theme?.palette?.primary?.main}`,
                    borderRadius: '0.7em',
                    color: theme?.custom?.fontColor,
                    textTransform: "none",
                    fontSize: theme?.typography?.caption?.fontSize,
                    padding: "0.3em 1em",
                    width: { xs: '100%'}
                })}
                onClick={ () => { 
                    setShowModal(true);
                    // setProductData(product);
                    selectProduct({product});
                }}
            >
                Añadir
                <AddShoppingCartIcon 
                    sx={(theme: Theme) => ({
                        backgroundColor: theme?.palette?.primary?.main,
                        borderRadius: '1em',
                        fontSize: theme?.typography?.h2?.fontSize,
                        padding: '0.1em',
                        marginLeft: '0.3em',
                    })}
                />
            </Button>
        </Grid>
    )
}

export default ProductItemButton;