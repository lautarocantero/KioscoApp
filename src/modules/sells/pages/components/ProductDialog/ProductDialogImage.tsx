import { Box } from "@mui/material";


const ProductDialogImage = ():React.ReactNode => {

    // To Do, cambiar esto por una imagen real, del producto.
    return (
        <Box
            component={'img'}
            src="/images/productExample/cocaCola.png"
            alt={`${name} Image`}
            sx={{
                width: { xs: '100%' },
                minHeight: { xs: '15em'},
                height: { xs: '100%' },
                maxHeight: {xs: '20em'},
                objectFit: "cover",
                borderRadius: "0.3em",
            }}
        >
        </Box>
    )
};

export default ProductDialogImage;