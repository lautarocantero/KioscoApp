//─────────────────── Componente 🧩: CartEmpty ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Estado vacío del carrito: ícono decorativo, mensaje y CTA para
// volver a explorar el catálogo cuando no hay productos agregados.
//
//-----------------------------------------------------------------------------//

import { Box, Grid, Typography, type Theme } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PrimaryButtonComponent from "../../../modules/shared/components/Buttons/PrimaryButtonComponent";

interface CartEmptyProps {
    onExploreProducts: () => void;
}

const CartEmptyComponent = ({ onExploreProducts }: CartEmptyProps): React.ReactNode => {
    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}  
            sx={(theme: Theme) => ({
                py: '4em',
                textAlign: 'center',
                borderRadius: '8px',
                minHeight: '590px',
                
            })}
        >
            <Box
                sx={(theme: Theme) => ({
                    position: 'relative',
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    border: `1px dashed ${theme?.palette?.primary?.main}55`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: '1.5em',
                })}
            >
                <ShoppingCartOutlinedIcon
                    sx={(theme: Theme) => ({
                        fontSize: 64,
                        color: theme?.palette?.primary?.main,
                    })}
                />
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 700, mb: '0.4em' }}>
                ¡Agrega productos al carrito!
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 380, mb: '1.5em' }}
            >
                Parece que aún no agregaste ningún producto. Explora nuestro catálogo y encuentra lo que necesitas.
            </Typography>

                
            <PrimaryButtonComponent
                buttonText="Explorar productos"
                buttonOnClick={() => onExploreProducts}
                buttonWidth={{ xs: '20%' }}
                marginTop="0"
                icon={<StorefrontOutlinedIcon fontSize="small"/>}
            />
        </Grid>
    );
};

export default CartEmptyComponent;