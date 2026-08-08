import { Box, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ProductDialogHeaderProps } from "@typings/seller/sellerComponentTypes";
import { memo, useState, type ReactNode, type SyntheticEvent } from "react";

const FALLBACK_IMAGE = '/images/stocko_images/empty_product.png';

const ProductDialogImageComponent = ({
    product
}: ProductDialogHeaderProps): ReactNode => {

    const { name, image_url } = product;

    const [src, setSrc] = useState(image_url || FALLBACK_IMAGE);

    const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
        // evita loop infinito si el fallback también fallara
        if (src !== FALLBACK_IMAGE) setSrc(FALLBACK_IMAGE);
    };

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
                src={src}
                onError={handleError}
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