//─────────────────── Componente 🧩: ProductDialogSelector ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Selector de variantes de producto dentro del diálogo. 
// Permite al usuario elegir un producto específico y actualiza los valores del formulario con sus datos. 

//──────────────────── Funciones 🔧 ─────────────────────//
// ## Funciones 🔧
// - `ProductDialogSelector`: componente principal que recibe props tipadas con `DialogSelectorType`.  
//   - `products`: listado de variantes de producto disponibles.  
// - Lógica interna:  
//   - `isLoading`: si esta cargando los productos mostrara un loader.  
//   - `isEmpty`: si no hay productos, muestra mensaje "No se han encontrado Productos".  

//-----------------------------------------------------------------------------//

import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography, type SelectChangeEvent, type Theme } from "@mui/material";
import type { ProductVariant } from "../../../../../typings/productVariant/productVariant";
import type { DialogSelectorType } from "../../../../../typings/sells/sellsComponentTypes";
import { useSelector } from "react-redux";
import type { RootState as ProductVariantState  } from "../../../../../store/productVariant/productVariantSlice";

const ProductDialogSelector = ({ products, values, setFieldValue }: DialogSelectorType): React.ReactNode => {
    const isEmpty: boolean = products?.length <= 0;
    const { productVariant } = useSelector((state: ProductVariantState) => state);
    const { isLoading } : { isLoading: boolean } = productVariant;

    if(isLoading) return (
        <CircularProgress />
    );

    if(isEmpty) return (
        <Box>
            <Typography>No se han encontrado Productos</Typography>
        </Box>
    );

    const handleChange = (event: SelectChangeEvent<string>) => {
        const productId: string = event.target.value as string;

        if(!productId) return;
        if(!(typeof(productId) === 'string')) return;

        const productObject: ProductVariant | undefined = products.find((prod: ProductVariant) => prod._id === productId);

        if(!productObject) return;
        if(productObject === undefined) return;

        setFieldValue('productVariantId', productId );
        setFieldValue('productVariant', productObject);
    }

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
                    onChange={handleChange}
                    sx={(theme: Theme) => ({
                        color: theme?.custom?.fontColor,
                        fontSize: theme?.typography?.body2?.fontSize,
                    })}
                    renderValue={(selected: string) => {
                      const productObject: ProductVariant | undefined = products.find((prodFind: ProductVariant) => String(prodFind?._id) === String(selected));
                      return productObject ? productObject.name : "";
                    }}
                >
                {
                    products.map((productObject: ProductVariant ) => (
                        <MenuItem key={String(productObject?._id)} value={String(productObject?._id)}>{productObject?.name}</MenuItem>
                    ))
                }
            </Select> 
        </FormControl> 
    </Box> 
    );
};


export default ProductDialogSelector;
