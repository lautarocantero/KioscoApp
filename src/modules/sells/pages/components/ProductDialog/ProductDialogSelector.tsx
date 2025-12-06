import { Box, FormControl, InputLabel, MenuItem, Select, Typography, type SelectChangeEvent, type Theme } from "@mui/material";
import type { ProductVariant } from "../../../../../typings/productVariant/productVariant";
import type { DialogSelectorType } from "../../../../../typings/sells/sellsComponentTypes";

const ProductDialogSelector = ({ products, values, setFieldValue }: DialogSelectorType): React.ReactNode => {
    const isEmpty: boolean = products?.length <= 0;
    const isLoading: boolean = typeof products[0]?._id !== 'string';

    if(isEmpty) return (
        <Box>
            <Typography>No se han encontrado Productos</Typography>
        </Box>
    );

    if(isLoading) return (
        <Box>
            <Typography>Cargando Productos...</Typography>
        </Box>
    );

    const handleChange = (event: SelectChangeEvent) => {
        const valueObject: Partial<ProductVariant> = event.target.value as unknown as Partial<ProductVariant>;

        if(!valueObject._id) return; 
            setFieldValue('productId', valueObject._id );
        if(!valueObject.stock) return; 
            setFieldValue('productAvailableStock', String(valueObject.stock) );
        if(!valueObject.price) return; 
            setFieldValue('productPrice', String(valueObject.price) );
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
                value={String(values?.productId)}
                label="Product"
                onChange={handleChange}
                sx={(theme: Theme) => ({
                    color: theme?.custom?.fontColor,
                    fontSize: theme?.typography?.body2?.fontSize,
                })}
                renderValue={(selected: string) => {
                    const prod = products.find(p => String(p._id) === String(selected));
                    return prod ? prod.name : "";
                }}
            >
                {
                    products.map((prod: Partial<ProductVariant>) => (
                        <MenuItem key={prod._id} value={prod as string}>{prod.name}</MenuItem>
                    ))
                }
            </Select> 
        </FormControl> 
    </Box> 
    );

};


export default ProductDialogSelector;
