import { Box, Tooltip, Typography, type Theme } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';

const ProductItemData = ({title, stock}: {title: string, stock: number}): React.ReactNode => {

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            sx={{
                alignSelf: 'flex-start',
                flexWrap: 'wrap',
                width: {xs: 50, sm: 200 }
            }}
        >   
        <Tooltip title={title}>
            <Typography
                sx={(theme: Theme) => ({
                    display: '-webkit-box',
                    fontSize: { xs: theme?.typography?.caption?.fontSize, sm: theme?.typography?.h4?.fontSize},
                    fontWeight: 600,
                    marginLeft: {xs: '0.2em', sm: '1em'},
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                })}
            >
                { title}
            </Typography>
        </Tooltip>
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: { xs: theme?.typography?.caption?.fontSize, sm: theme?.typography?.h4?.fontSize},
                    lineHeight: 1.5,
                    
                })}
            >
                <InventoryIcon
                    sx={(theme: Theme) => ({
                        fontSize: { xs: theme?.typography?.caption?.fontSize, sm: theme?.typography?.h4?.fontSize},
                        verticalAlign: "middle",
                        position: 'relative',
                        marginLeft: {xs: '0.2em', sm: '1em'},
                        marginRight: "0.3em",
                        bottom: '0.10em',
                    })}
                />
                {`${stock}`}
            </Typography>
        </Box>
    )
}

export default ProductItemData;