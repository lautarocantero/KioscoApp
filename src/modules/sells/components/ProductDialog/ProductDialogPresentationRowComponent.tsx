//─────────────────── Componente 🧩: ProductDialogPresentationRowComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Fila individual de una presentación dentro de la lista del diálogo de producto.

//──────────────────── Funciones 🔧 ─────────────────────//
//   - Muestra imagen, nombre, tipo y stock actual de la presentación.
//   - Indica estado de stock (En stock / Stock bajo / Sin stock).
//   - Permite indicar cantidad deseada mediante NumberField.
//   - Dispara acción de agregar al carrito con la cantidad indicada.

//-----------------------------------------------------------------------------//

import { Box, Chip, Stack, Typography, IconButton, type Theme } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { Presentation } from "../../../../typings/presentation/presentationTypes";
import React, { useMemo } from "react";
import NumberField from "../../../shared/components/NumberField/NumberField";

const LOW_STOCK_THRESHOLD = 200; // 🔎 ajustar según regla de negocio real

interface ProductDialogPresentationRowProps {
    presentation: Presentation;
    quantity: number;
    onQuantityChange: (presentationId: string, value: number | null) => void;
    onAddToCart: (presentation: Presentation, quantity: number) => void;
}

const ProductDialogPresentationRowComponent = ({
    presentation,
    quantity,
    onQuantityChange,
    onAddToCart,
}: ProductDialogPresentationRowProps): React.ReactNode => {

    const stock: number = presentation?.stock ?? 0;

    const stockStatus = useMemo(() => {
        if (stock <= 0) return { label: 'Sin stock', color: 'error' as const };
        if (stock <= LOW_STOCK_THRESHOLD) return { label: 'Stock bajo', color: 'warning' as const };
        return { label: 'En stock', color: 'success' as const };
    }, [stock]);

    const canAdd = stock > 0 && quantity > 0;

    return (
        <Box
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={2}
            sx={(theme: Theme) => ({
                p: 1.5,
                borderBottom: `1px solid ${theme?.custom?.borderColor ?? 'rgba(255,255,255,0.08)'}`,
            })}
        >
            <Box
                component={'img'}
                src={presentation?.image_url ?? '/images/productExample/cocaCola.png'}
                alt={presentation?.name}
                sx={{ width: '3em', height: '3em', objectFit: 'contain', borderRadius: '0.4em' }}
            />

            <Box display={'flex'} flexDirection={'column'} sx={{ minWidth: '9em' }}>
                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontWeight: 500 })}>
                    {presentation?.name}
                </Typography>
                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.translucidWhite, fontSize: theme?.typography?.caption?.fontSize })}>
                    {presentation?.type}
                </Typography>
            </Box>

            <Box display={'flex'} flexDirection={'column'} sx={{ minWidth: '7em' }}>
                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.translucidWhite, fontSize: theme?.typography?.caption?.fontSize })}>
                    Stock actual
                </Typography>
                <Stack direction={'row'} alignItems={'center'} gap={1}>
                    <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontWeight: 'bold' })}>
                        {stock}
                    </Typography>
                    <Chip label={stockStatus.label} size="small" color={stockStatus.color} />
                </Stack>
            </Box>

            <Box flex={1} />

            <Box display={'flex'} flexDirection={'row'} sx={{ gap: '0.5em', alignItems: 'center' }}>
                <NumberField
                    label={'Cant.'}
                    min={1}
                    max={stock}
                    size="small"
                    defaultValue={1}
                    value={quantity}
                    onValueChange={(value: number | null) => onQuantityChange(String(presentation?._id), value)}
                    sx={{ width: '6em' }}
                />

                <IconButton
                    type="button"
                    disabled={!canAdd}
                    onClick={() => onAddToCart(presentation, quantity)}
                    sx={(theme: Theme) => ({
                        backgroundColor: theme?.palette?.primary?.main,
                        color: theme?.palette?.primary?.contrastText ?? '#fff',
                        borderRadius: '0.4em',
                        width: '1.5em',
                        height: '1.5em',
                        alignSelf: 'center',
                        '&:hover': { backgroundColor: theme?.palette?.primary?.dark },
                        '&.Mui-disabled': { opacity: 0.4 },
                        mb: '0.9em',
                    })}
                >
                    <ShoppingCartIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default React.memo(ProductDialogPresentationRowComponent);