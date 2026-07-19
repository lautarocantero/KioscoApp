import { Box } from "@mui/material";
import type { DialogDataProps } from "@typings/sells/SellComponentTypes"; // 🔎 agregar name/category/description/image_url
import React from "react";
import ProductDialogHeaderComponent from "./ProductDialogHeaderComponent";
import ProductDialogSelector from "./ProductDialogSelector";

const ProductDialogDataComponent = ({ products, values, setFieldValue, name, category, description, image_url }: DialogDataProps): React.ReactNode => {

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <ProductDialogHeaderComponent
                name={name}
                category={category}
                description={description}
                image_url={image_url}
                products={products}
            />
            <ProductDialogSelector
                products={products}
                values={values}
                setFieldValue={setFieldValue}
            />
        </Box>
    );
};

export default React.memo(ProductDialogDataComponent);