import { Box, Tooltip, Typography, type Theme } from "@mui/material";
import InventoryIcon from '@mui/icons-material/Inventory';
import type { ProductVariant } from "../../../../typings/productVariant/productVariant";
import type { ItemDataType } from "../../../../typings/sells/sellsComponentTypes";

const ProductItemData = ({name, variants }: ItemDataType): React.ReactNode => {

    const totalStock: number = variants.reduce((sum: number,v: ProductVariant) => sum + v.stock, 0);

    return (
        <Box 
            display="flex" 
            flexDirection="column" 
            sx={{
                alignSelf: 'flex-start',
                flexWrap: 'wrap',
                width: {xs: 50, sm: 200, md: '100%' }
            }}
        >   
        <Tooltip title={name}>
            <Typography
                sx={(theme: Theme) => ({
                    display: '-webkit-box',
                    fontSize: { 
                        xs: theme?.typography?.caption?.fontSize, 
                        sm: theme?.typography?.h4?.fontSize,
                        md: theme?.typography?.h5?.fontSize,
                    },
                    fontWeight: 600,
                    marginLeft: {xs: '0.2em', sm: '1em'},
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                })}
            >
                { name }
            </Typography>
        </Tooltip>
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: { 
                        xs: theme?.typography?.caption?.fontSize, 
                        sm: theme?.typography?.h4?.fontSize,
                        md: theme?.typography?.body1?.fontSize,
                    },
                    lineHeight: 1.5,
                    
                })}
            >
                <InventoryIcon
                    sx={(theme: Theme) => ({
                        fontSize: { 
                            xs: theme?.typography?.caption?.fontSize, 
                            sm: theme?.typography?.h4?.fontSize,
                            md: theme?.typography?.body1?.fontSize,
                        },
                        verticalAlign: "middle",
                        position: 'relative',
                        marginLeft: {xs: '0.2em', sm: '1em'},
                        marginRight: "0.3em",
                        bottom: '0.10em',
                    })}
                />
                {`${totalStock}`}
            </Typography>
        </Box>
    )
}

export default ProductItemData;