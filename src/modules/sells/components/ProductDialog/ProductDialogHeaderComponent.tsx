
import { Box, Chip, Stack, Typography, type Theme } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import type { ProductDialogHeaderProps } from "@typings/sells/reactComponents"; // 🔎 crear este type
import type { Presentation } from "../../../../typings/presentation/presentationTypes";
import React, { useMemo } from "react";

const ProductDialogHeaderComponent = ({
    name,
    category,
    description,
    image_url = '/images/productExample/cocaCola.png',
    products,
}: ProductDialogHeaderProps): React.ReactNode => {

    const totalStock = useMemo(
        () => (products ?? []).reduce((acc: number, p: Presentation) => acc + (p?.stock ?? 0), 0),
        [products]
    );

    const formattedTotalStock = useMemo(
        () => new Intl.NumberFormat("es-AR").format(totalStock),
        [totalStock]
    );

    return (
        <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'flex-start'}
            gap={2}
            sx={{
                position: 'relative',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
        >
            <Box
                component={'img'}
                src={image_url}
                alt={`${name} Image`}
                sx={{
                    width: '4.5em',
                    height: '10em',
                    objectFit: 'cover',
                    borderRadius: '0.5em',
                }}
            />
            <Box display={'flex'} flexDirection={'column'} flex={1} sx={{ pr: 4 }} justifyContent={"space-between"}>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <Typography
                        sx={(theme: Theme) => ({
                            fontSize: theme?.typography?.h6?.fontSize,
                            fontWeight: 'bold',
                            color: theme?.custom?.fontColor,
                        })}
                    >
                        {name}
                    </Typography>
                    {category && (
                        <Chip
                            label={category}
                            size="small"
                            sx={(theme: Theme) => ({
                                backgroundColor: theme?.custom?.primaryTransparent ?? theme?.palette?.primary?.main,
                                color: theme?.palette?.primary?.light ?? theme?.palette?.primary?.main,
                                fontWeight: 500,
                            })}
                        />
                    )}
                </Stack>
                {description && (
                    <Typography
                        sx={(theme: Theme) => ({
                            fontSize: theme?.typography?.body2?.fontSize,
                            color: theme?.custom?.fontColorTransparent,
                            mt: 0.5,
                        })}
                    >
                        {description}
                    </Typography>
                )}
                <Stack direction={'row'} alignItems={'center'} gap={0.5} sx={{ mt: 2 }}>
                    <Inventory2OutlinedIcon
                        fontSize="small"
                        sx={(theme: Theme) => ({ color: theme?.custom?.fontColorTransparent })}
                    />
                    <Typography
                        sx={(theme: Theme) => ({
                            fontSize: theme?.typography?.caption?.fontSize,
                            color: theme?.custom?.fontColorTransparent,
                        })}
                    >
                        Total en stock (todas las presentaciones)
                    </Typography>
                </Stack>
                <Typography
                    sx={(theme: Theme) => ({
                        fontSize: theme?.typography?.h4?.fontSize,
                        fontWeight: 'bold',
                        color: theme?.custom?.fontColor,
                        mt: 0.5,
                    })}
                >
                    {formattedTotalStock}
                </Typography>
            </Box>
        </Box>
    );
};

export default React.memo(ProductDialogHeaderComponent);