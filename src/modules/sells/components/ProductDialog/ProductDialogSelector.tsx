//─────────────────── Componente 🧩: ProductDialogSelector ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Selector de variantes de producto dentro del diálogo. 
// Permite al usuario elegir un producto específico y actualiza los valores del formulario con sus datos. 

//──────────────────── Funciones 🔧 ─────────────────────//
// ## Funciones 🔧
// - `ProductDialogSelector`: componente principal que recibe props tipadas con `DialogSelectorProps`.  
//   - `products`: listado de variantes de producto disponibles.  
// - Lógica interna:  
//   - `isLoading`: si esta cargando los productos mostrara un loader.  
//   - `isEmpty`: si no hay productos, muestra mensaje "No se han encontrado Productos".  

//-----------------------------------------------------------------------------//

import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography, type SelectChangeEvent, type Theme } from "@mui/material";
import type { DialogSelectorProps } from "@typings/sells/reactComponents";
import type { HandleProductDialogSelectorChangeInterface } from "@typings/sells/types";
import React, { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDelegatedHandler } from "../../../../hooks/shared/useDelegatedHandler";
import type { RootState as ProductVariantState } from "../../../../store/productVariant/productVariantSlice";
import type { ProductVariant } from "../../../../typings/productVariant/productVariant";
import handleChangeSelector from "../../helpers/ProductDialog/handleProductDialogSelectorChange";

const ProductDialogSelector = ({ products, values, setFieldValue }: DialogSelectorProps): React.ReactNode => {

    const isEmpty = useMemo(() => { return (products?.length ?? 0) === 0; }, [products]);

    const { productVariant } = useSelector((state: ProductVariantState) => state);
    const { isLoading } : { isLoading: boolean } = productVariant;

    const renderValue = useCallback( 
        (selected: string) => { 
            const productObject: ProductVariant | undefined = products.find( 
                (prodFind: ProductVariant) => String(prodFind?._id) === String(selected) 
            ); 
            return productObject ? productObject.name : "";
        }, 
        [products] 
    );

    const productOptions = useMemo( () => 
        products.map((productObject: ProductVariant) => 
            ( 
                <MenuItem 
                    key={String(productObject?._id)} 
                    value={String(productObject?._id)}
                > 
                    {productObject?.name} 
                </MenuItem> 
            )), 
        [products] 
    );

    const handleChange = useDelegatedHandler(({ event, products, setFieldValue }: HandleProductDialogSelectorChangeInterface) =>
        handleChangeSelector({ event, products, setFieldValue }),
        [products, setFieldValue]
    );

    if(isLoading) return (<CircularProgress />);
    if(isEmpty) return (<Box><Typography>No se han encontrado Productos</Typography></Box>);

    return (
        <Box sx={{ minWidth: 120 }} >
            <FormControl fullWidth> 
                <InputLabel 
                    id="product-select-label"
                    sx={(theme: Theme) => ({
                        color: theme?.custom?.fontColor,
                    })}
                >
                    Producto
                </InputLabel> 
                <Select
                    labelId="product-select-label"
                    id="product-select"
                    value={values?.productVariantId ?? ""}
                    label="Product"
                    onChange={(event: SelectChangeEvent<string>) => handleChange({event,products, setFieldValue})}
                    sx={(theme: Theme) => ({
                        color: theme?.custom?.fontColor,
                        fontSize: theme?.typography?.body2?.fontSize,
                    })}
                    renderValue={renderValue}
                >
                {productOptions}
            </Select> 
        </FormControl> 
    </Box> 
    );
};


export default React.memo(ProductDialogSelector);
