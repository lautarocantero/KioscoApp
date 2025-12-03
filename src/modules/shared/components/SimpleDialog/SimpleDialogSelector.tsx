import { Box, FormControl, InputLabel, MenuItem, Select, Typography, type SelectChangeEvent } from "@mui/material";
import type { ProductVariant } from "../../../../typings/productVariant/productVariant";
import { useEffect, useState } from "react";

const SimpleDialogSelector = ({ products }: { products: ProductVariant[] }): React.ReactNode => {
    const isEmpty: boolean = products?.length <= 0;
    const isLoading: boolean = typeof products[0]?._id !== 'string';
    const [selectedId, setSelectedId] = useState<string>( products?.length > 0  ? String(products[0]?._id) : "");

    useEffect(() => {
        const myfunction = () => {
            if(products?.length<=0) return;
            if(typeof products[0]?._id !== 'string') return;
            if(selectedId === "") setSelectedId(products[0]?._id);
            
        }
        myfunction();
    }, [products, selectedId])
    

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
        setSelectedId(event.target.value as string);
    }

    return (
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth> 
            <InputLabel id="product-select-label">Product</InputLabel> 
            <Select
                labelId="product-select-label"
                id="product-select"
                value={String(selectedId)}
                label="Product"
                onChange={handleChange}
                renderValue={(selected: string) => {
                    const prod = products.find(p => String(p._id) === String(selected));
                    return prod ? prod.name : "";
                }}
            >
                {
                    products.map((prod: ProductVariant) => (
                        <MenuItem key={prod._id} value={prod._id as string}>{prod.name}</MenuItem>
                    ))
                }
            </Select> 
        </FormControl> 
    </Box> 
    );

};


export default SimpleDialogSelector;
