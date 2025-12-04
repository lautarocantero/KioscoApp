import { Box } from "@mui/material";


const ProductDialogImage = ():React.ReactNode => {

    // To Do, cambiar esto por una imagen real, del producto.
    return (
        <Box
            component={'img'}
            src="/images/backgroundImages/blackBackgroundImage.jpg"
            alt={`${name} Image`}
            sx={{
                width: { xs: '100%' },
                height: { xs: 220 },
                objectFit: "cover",
                borderRadius: "0.3em",
            }}
        >
        </Box>
    )
};

export default ProductDialogImage;