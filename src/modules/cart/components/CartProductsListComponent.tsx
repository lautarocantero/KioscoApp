//─────────────────── Componente 🧩: CartProductList ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Componente que se encarga de renderizar la lista de productos que se encuentran en el carrito

//──────────────────── Funciones 🔧 ─────────────────────//
// -CartProductList Componente principal que muestra un listado
//      -CartProductItem Componente que muestra un producto
//      -CartEmptyComponent Componente que se muestra cuando el carrito está vacío
//
//─────────────────── Notas técnicas 💽 ───────────────────//
// - El toggle de vista es solo visual por ahora (estado local); la vista
//   "Lista" queda pendiente de implementar (por ahora ambas renderizan igual).
// - El contador y el toggle se muestran siempre, tenga o no productos el carrito.
//
//-----------------------------------------------------------------------------//

import { alpha, Box, Button, Grid, Typography, type Theme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import type { ProductTicketType } from "../../../typings/seller/sellerTypes";
import type { CartProductListProps } from "../../../typings/sells/types/sellsTypes";
import CartProductItem from "./CartProductItem/CartProductItemComponent";
import CartEmptyComponent from "./EmptyCartComponent";
import { getNoisyBackgroundSx } from "../../../modules/shared/components/NoisyBackground/NoisyBackground";

const CartProductListComponent = ({ cart }: CartProductListProps): React.ReactNode => {
    const navigate = useNavigate();
    const [view, setView] = useState<'grid' | 'list'>('grid');

    if (!cart) return null;

    const itemsCount: number = cart.length;

    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'column'}
            width={'100%'}
            sx={(theme: Theme) => ({
                py: '2em',
                px: '1.5em',
                borderRadius: '8px',
                ...getNoisyBackgroundSx(theme),
            })}
        >
            {/* Fila superior: contador + toggle de vista */}
            { cart?.length > 0 && (
                <Grid container display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography
                        sx={(theme: Theme) => ({
                            color: theme?.custom?.whiteTranslucid,
                            fontSize: theme?.typography?.body2?.fontSize,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        })}
                    >
                        {itemsCount} presentaciones en el carrito
                        <Box
                            component="span"
                            sx={(theme: Theme) => ({
                                backgroundColor: alpha(theme?.custom?.posAccentHover, 0.3),
                                color: theme?.custom?.posAccent,
                                borderRadius: '1em',
                                padding: '0 0.6em',
                                fontSize: theme?.typography?.caption?.fontSize,
                            })}
                        >
                            {itemsCount}
                        </Box>
                    </Typography>

                    <Box
                        sx={(theme: Theme) => ({
                            display: 'flex',
                            border: `1px solid ${alpha(theme?.custom?.posAccentHover, 0.3)}`,
                            borderRadius: '0.2em',
                            overflow: 'hidden',
                        })}
                    >
                        <Button
                            onClick={() => setView('grid')}
                            startIcon={<GridViewIcon fontSize="small" />}
                            sx={(theme: Theme) => ({
                                textTransform: 'none',
                                color: view === 'grid' ? theme?.custom?.posAccent : theme?.custom?.whiteTranslucid,
                                backgroundColor: view === 'grid' ? alpha(theme?.custom?.posAccentHover, 0.3) : 'transparent',
                                fontSize: theme?.typography?.body2?.fontSize,
                                p: '0.5em',
                            })}
                        >
                            Grid
                        </Button>
                        <Button
                            onClick={() => setView('list')}
                            startIcon={<ViewListIcon fontSize="small" />}
                            sx={(theme: Theme) => ({
                                textTransform: 'none',
                                color: view === 'list' ? theme?.custom?.posAccent : theme?.custom?.whiteTranslucid,
                                backgroundColor: view === 'list' ? alpha(theme?.custom?.posAccentHover, 0.3) : 'transparent',
                                fontSize: theme?.typography?.body2?.fontSize,
                                p: '0.5em',
                            })}
                        >
                            Lista
                        </Button>
                    </Box>
                </Grid>
            )}
            {/* Contenido: lista de productos o estado vacío */}
            {
                itemsCount === 0
                    ? <CartEmptyComponent onExploreProducts={() => navigate('/new-sell')} />
                    : cart.map((prod: ProductTicketType) => (
                        <CartProductItem
                            key={String(prod._id)}
                            product={prod}
                        />
                    ))
            }
        </Grid>
    );
};

export default CartProductListComponent;