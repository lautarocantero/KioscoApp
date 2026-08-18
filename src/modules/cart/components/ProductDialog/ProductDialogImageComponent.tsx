import { Box, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { ProductDialogHeaderProps } from "@typings/cart/cartComponentTypes";
import { memo, useState, type ReactNode } from "react";

const FALLBACK_IMAGE = '/images/stocko_images/empty_product.png';

const ProductDialogImageComponent = ({
    product
}: ProductDialogHeaderProps): ReactNode => {
    const { t } = useTranslation();

    const { name, image_url } = product;

    const [src, setSrc] = useState(image_url || FALLBACK_IMAGE);

    const handleError = () => {
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
                alt={t("cart.productDialog.imageAlt", { name })}
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