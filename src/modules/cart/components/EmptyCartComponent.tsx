import { Box, Grid, Typography, type Theme } from "@mui/material";
import { getNoisyBackgroundSx } from "../../shared/components/NoisyBackground/NoisyBackground";
import { type ReactNode } from "react";


const CartEmptyComponent = (): ReactNode => {

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
                    Parece que aún no agregaste ningún producto. <br />
                    Utiliza el escáner y agrega directamente, o <br />
                    explora nuestro catálogo y encuentra lo que necesitas.
                </Typography>

            </Grid>
        </Grid>
    );
};

export default CartEmptyComponent;