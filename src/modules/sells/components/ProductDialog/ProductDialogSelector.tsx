import { Box, Stack, Typography, type Theme } from "@mui/material";
import type { DialogSelectorProps } from "@typings/sells/reactComponents";
import type { Presentation } from "../../../../typings/presentation/presentationTypes";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useDelegatedHandler } from "../../../../hooks/shared/useDelegatedHandler";
import type { AppDispatch } from "../../../../store/presentation/presentationSlice";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";
import ProductDialogPresentationRowComponent from "./ProductDialogPresentationRowComponent";
import handleAddProductDialogItemToCart from "./handleAddProductItemToCart";

interface AddedItem {
    presentationId: string;
    price: number;
    quantity: number;
}

const ProductDialogSelectorComponent = ({ products }: DialogSelectorProps): React.ReactNode => {

    const isEmpty = useMemo(() => (products?.length ?? 0) === 0, [products]);

    const dispatch = useDispatch<AppDispatch>();
    const { showSnackBar } = useContext(SnackBarContext)!;

    const [quantities, setQuantities] = useState<Record<string, number>>({});
    const [addedItems, setAddedItems] = useState<AddedItem[]>([]);

    const getQuantity = useCallback(
        (presentationId: string) => quantities[presentationId] ?? 1,
        [quantities]
    );

    const handleQuantityChange = useCallback((presentationId: string, value: number | null) => {
        setQuantities((prev) => ({ ...prev, [presentationId]: value ?? 1 }));
    }, []);

    const handleAddToCart = useDelegatedHandler(
        async ({ presentation, quantity }: { presentation: Presentation; quantity: number }) => {
            const wasAdded: boolean = await handleAddProductDialogItemToCart({ presentation, quantity, dispatch, showSnackBar });

            if (!wasAdded) return;

            setAddedItems((prev) => [
                ...prev,
                { presentationId: String(presentation?._id), price: presentation?.price ?? 0, quantity },
            ]);
        },
        [dispatch, showSnackBar]
    );

    const formatter = useMemo(
        () => new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2 }),
        []
    );

    const sessionTotal = useMemo(
        () => addedItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        [addedItems]
    );

    if (isEmpty) return (<Box><Typography>No se han encontrado Productos</Typography></Box>);

    return (
        <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
                <Typography sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main, fontWeight: 'bold' })}>
                    Presentaciones
                </Typography>
                <Typography
                    sx={(theme: Theme) => ({
                        color: theme?.custom?.fontColor,
                        backgroundColor: theme?.custom?.backgroundDark,
                        borderRadius: '1em',
                        px: 1,
                        fontSize: theme?.typography?.caption?.fontSize,
                    })}
                >
                    {products.length}
                </Typography>
            </Stack>

            <Box
                display={'flex'}
                flexDirection={'column'}
                sx={(theme: Theme) => ({
                    maxHeight: '18em',
                    overflowY: 'auto',
                    pr: '0.3em',
                    '&::-webkit-scrollbar': {
                        width: '0.5em',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme?.custom?.backgroundDark ?? 'rgba(255,255,255,0.15)',
                        borderRadius: '1em',
                    },
                })}
            >
                {products.map((productObject: Presentation) => (
                    <ProductDialogPresentationRowComponent
                        key={String(productObject?._id)}
                        presentation={productObject}
                        quantity={getQuantity(String(productObject?._id))}
                        onQuantityChange={handleQuantityChange}
                        onAddToCart={(pres: Presentation, quantity: number) => handleAddToCart({ presentation: pres, quantity })}
                    />
                ))}
                
            </Box>

            {addedItems.length > 0 && (
                <Stack direction={'row'} justifyContent={'flex-end'} sx={{ mt: 1 }}>
                    <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontWeight: 'bold' })}>
                        Total agregado: {formatter.format(sessionTotal)}
                    </Typography>
                </Stack>
            )}
        </Box>
    );
};

export default React.memo(ProductDialogSelectorComponent);