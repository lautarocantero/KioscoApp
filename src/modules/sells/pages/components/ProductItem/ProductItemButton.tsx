//─────────────────── Componente 🧩: ProductItemButton ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Botón de acción para añadir un producto al carrito desde la vista de ítem.
// Controla la apertura del diálogo y despacha la selección al store de Redux.  

//──────────────────── Funciones 🔧 ─────────────────────//
// - ProductItemButton: componente principal.
//   - Recibe product.
//   - Usa ProductDialogContext para abrir el modal.
//   - Usa useDispatch para enviar la acción selectProductThunk.
//   - Renderiza Button con ícono AddShoppingCartIcon.
//     - Al hacer click: abre el modal y ejecuta selectProduct con el producto.

//-----------------------------------------------------------------------------//

import { Button, Grid, type Theme } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContext } from "react";
import { useDispatch } from "react-redux";
import type { ProductItemButtonType } from "../../../../../typings/sells/sellsComponentTypes";
import { ProductDialogContext } from "../../context/ProductDialogContext";
import type { AppDispatch } from "../../../../../store/seller/sellerSlice";
import { selectProductThunk } from "../../../../../store/seller/sellerThunks";
import type { getProductSelectedPayload } from "../../../../../typings/seller/sellerTypes";

const ProductItemButton = ({product} : ProductItemButtonType):React.ReactNode => {
    const { setShowModal } = useContext(ProductDialogContext)!;
    const dispatch = useDispatch<AppDispatch>();

    const selectProduct = async({product}: Partial<getProductSelectedPayload>): Promise<void> => {
        if(!product) throw new Error('No se ha seleccionado un producto');

        await dispatch(selectProductThunk({productData: product }));
        setShowModal(true);
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