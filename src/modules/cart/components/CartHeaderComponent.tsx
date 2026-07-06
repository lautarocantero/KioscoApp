//─────────────────── Componente 🧩: CartHeader ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Header del carrito: ícono + título + subtítulo, botón "Vaciar carrito"
// y fila con contador de presentaciones + toggle de vista Grid/Lista.
//
//─────────────────── Notas técnicas 💽 ───────────────────//
// - El toggle de vista es solo visual por ahora (estado local); la vista
//   "Lista" queda pendiente de implementar en CartProductsList.
//
//-----------------------------------------------------------------------------//

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { alpha, Box, Button, Grid, Typography, type Theme } from "@mui/material";
import { useState } from "react";

type CartHeaderProps = {
    itemsCount: number;
    onClearCart: () => void;
}

const CartHeaderComponent = ({ itemsCount, onClearCart }: CartHeaderProps): React.ReactNode => {
    const [view, setView] = useState<'grid' | 'list'>('grid');

    return (
            <Grid container size={{ xs: 12, md: 9,}} display="flex" flexDirection={"row"} justifyContent="space-between" alignItems="center" sx={{ mb: "2em"}}> 
                <Grid display="flex" alignItems="center" gap={1.5}>
                    <Box
                        sx={(theme: Theme) => ({
                            // backgroundColor: alpha(theme?.custom?.darkSecondary, 0.3),
                            borderRadius: '0.7em',
                            padding: '0.5em',
                            display: 'flex',
                        })}
                    >
                        <ShoppingCartIcon sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main })} />
                    </Box>
                    <Box>
                        <Typography
                            sx={(theme: Theme) => ({
                                color: theme?.custom?.white,
                                fontWeight: 700,
                                fontSize: theme?.typography?.h5?.fontSize,
                            })}
                        >
                            Carrito
                        </Typography>
                        <Typography
                            sx={(theme: Theme) => ({
                                color: theme?.custom?.whiteTranslucid,
                                fontSize: theme?.typography?.body2?.fontSize,
                            })}
                        >
                            Revisa los productos que vas a vender
                        </Typography>
                    </Box>
                </Grid>

                <Button
                    onClick={onClearCart}
                    startIcon={<DeleteSweepIcon />}
                    sx={(theme: Theme) => ({
                        color: theme?.custom?.white,
                        borderRadius: '0.7em',
                        border: `1px solid ${theme?.custom?.whiteTranslucid}`,
                        textTransform: 'none',
                        fontSize: theme?.typography?.body2?.fontSize,
                        '&:hover': {
                            backgroundColor: theme?.custom?.whiteTranslucid,
                            color: theme?.custom?.fontColor,
                        },
                    })}
                >
                    Vaciar carrito
                </Button>
            </Grid>
    )
}

export default CartHeaderComponent;