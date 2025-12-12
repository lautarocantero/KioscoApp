
// # Componente: ProductItemData  

// ## Descripción 📦
// Muestra la información básica de un producto dentro de la vista de ítem.  
// Incluye el nombre del producto y el stock total calculado a partir de sus variantes.  

// ## Funciones 🔧
// - `ProductItemData`: componente principal que recibe props tipadas con `ItemDataType`.  
//   - `name`: nombre del producto.  
//   - `variants`: listado de variantes del producto, cada una con su stock.  
// - Lógica interna:  
//   - `totalStock`: suma de los valores `stock` de todas las variantes.  
// - Renderiza:  
//   - `Tooltip` con el nombre del producto (para mostrar completo en hover).  
//   - `Typography` con el nombre truncado y estilizado.  
//   - `Typography` con ícono `InventoryIcon` y el stock total.  

// ## Notas técnicas 💽
// - Usa `Box` de MUI como contenedor con disposición en columna.  
// - Estilos dinámicos aplicados con `Theme` de MUI para coherencia visual y responsividad.  
// - El nombre se limita a dos líneas con `WebkitLineClamp` y `textOverflow: ellipsis`.  
// - Se integra en `ProductItemEspecificationsLeft` como parte de la presentación del producto.  
//-----------------------------------------------------------------------------//

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