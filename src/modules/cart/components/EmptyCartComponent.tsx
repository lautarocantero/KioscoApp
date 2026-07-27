import { Box, Grid, Typography, type Theme } from "@mui/material";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import PrimaryButtonComponent from "../../../modules/shared/components/Buttons/PrimaryButtonComponent";
import { getNoisyBackgroundSx } from "../../shared/components/NoisyBackground/NoisyBackground";
import { useCart } from "../../../hooks/sells/useCart";
import { useContext, type ReactNode } from "react";
import { SnackBarContext } from "../../shared/components/SnackBar/SnackBarContext";


const CartEmptyComponent = (): ReactNode => {
    const { showSnackBar } = useContext(SnackBarContext)!;
    const { goToNewSell } = useCart(showSnackBar);

    return (
        <Grid 
            size={{ xs: 12, md: 8 }}
            sx={(theme: Theme) => ({
                ...getNoisyBackgroundSx({theme}),
                borderRadius: '8px',
                border: `1px dashed ${theme?.palette?.primary?.main}55`,
            })}
        >
            <Grid
                container
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                width={'100%'}  
                sx={({
                    py: '4em',
                    textAlign: 'center',
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
                        overflow: 'hidden',
                    })}
                >
                    <Box
                        component="img"
                        src="/images/stocko_images/empty_bag.png"
                        alt="Carrito vacío"
                        sx={{
                            width: 80,
                            height: 80,
                            objectFit: 'contain',
                        }}
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
                    buttonOnClick={goToNewSell}
                    buttonWidth={{ xs: '20%' }}
                    marginTop="0"
                    icon={<StorefrontOutlinedIcon fontSize="small"/>}
                />
            </Grid>
        </Grid>
    );
};

export default CartEmptyComponent;