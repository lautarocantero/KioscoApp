import { Grid, Typography, type Theme } from "@mui/material";
import { Box } from "@mui/system";
import InventoryIcon from '@mui/icons-material/Inventory';


const ProductItemImage = ({name, stock} : {name: string, stock: number}): React.ReactNode => {


    return (
        <Grid display="flex" alignItems="center">
            <Box
                component="img"
                src="/images/backgroundImages/blackBackgroundImage.jpg"
                alt={`${name} Image`}
                sx={{
                    width: 50,
                    height: 80,
                    objectFit: "cover",
                    borderRadius: "0.3em",
                }}
            />
            <Box display="flex" flexDirection="column">

                <Typography
                    sx={(theme: Theme) => ({
                    fontSize: theme?.typography?.caption?.fontSize,
                    fontWeight: 600,
                    marginLeft: '0.2em',
                    })}
                >
                    {name.length > 12 ? `${name.substring(0, 12)}...` : name}
                </Typography>

                <Typography
                    sx={(theme: Theme) => ({
                    fontSize: theme?.typography?.caption?.fontSize,
                    lineHeight: 1.5,
                    verticalAlign: "middle",
                    })}
                >
                    <InventoryIcon
                        sx={(theme: Theme) => ({
                            fontSize: theme?.typography?.body2?.fontSize,
                            verticalAlign: "middle",
                            marginLeft: '0.2em',
                            marginRight: "0.3em",
                        })}
                    />
                    {`${stock}`}
                </Typography>
                
            </Box>
        </Grid>
    )
}

export default ProductItemImage;