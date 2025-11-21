import { Box } from "@mui/material";

const ProductItemImage = ():React.ReactNode => {

    return (
        <Box
            component="img"
            src="/images/backgroundImages/blackBackgroundImage.jpg"
            alt={`${name} Image`}
            sx={{
                width: { xs: 90, sm: 200, md: '100%' },
                height: { xs: 80, sm: 180 },
                objectFit: "cover",
                borderRadius: "0.3em",
            }}
        />    
    )
}

export default ProductItemImage;