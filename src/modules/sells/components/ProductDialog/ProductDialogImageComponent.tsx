import { Box, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ProductDialogHeaderProps } from "@typings/sells/SellComponentTypes";
import { memo, type ReactNode } from "react";


const ProductDialogImageComponent = ({
    product
}: ProductDialogHeaderProps): ReactNode => {

    const { name, image = '/images/stocko_images/empty_product_list.png' } = product;

    return (
        <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'flex-start'}
            gap={2}
            sx={(theme: Theme) => ({
                position: 'relative',
                borderColor: alpha(theme.custom.white, 0.1),
                height: { xs: "15em", sm: "100%" },
                width: { xs: "100%", sm: "8em" },
            })}
        >
            <Box
                component={'img'}
                src={image}
                alt={`${name} Image`}
                sx={{
                    height: { xs: "15em", sm: "30em" },
                    width: { xs: "100%", sm: "8em" },
                    objectFit: 'cover',
                    borderRadius: '0.5em',
                }}
            />
        </Box>
    );
};

export default memo(ProductDialogImageComponent);