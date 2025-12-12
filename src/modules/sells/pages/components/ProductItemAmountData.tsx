
// # Componente: ProductItemAmountData  

// ## Descripción 📦
// Renderiza un bloque que muestra la disponibilidad de variantes de producto (por ejemplo talles o tamaños).  
// Se apoya en `ProductItemQuantityHandler` para calcular y mostrar chips de cantidad por variante.  

// ## Funciones 🔧
// - `ProductItemAmountData`: componente principal que recibe props tipadas con `AmountDataType`.  
//   - `variants`: listado de variantes del producto con información de stock.  
// - Lógica interna:  
//   - Si `variants` no existe → retorna `null` (no renderiza nada).  
//   - En caso contrario → renderiza un `Grid` estilizado que contiene:  
//     - `Typography`: ajusta tipografía según tema.  
//     - `ProductItemQuantityHandler`: muestra chips de cantidad por variante, limitados según breakpoint.  

// ## Notas técnicas 💽
// - Usa `Grid` de MUI como contenedor con estilos dinámicos basados en `Theme`.  
// - Estilos:  
//   - Fondo translúcido (`blackTranslucid`).  
//   - Bordes redondeados (`borderRadius: "1em"`).  
//   - Padding y margen inferior para separación visual.  
//   - Ancho adaptado (`auto` en móviles, `100%` en pantallas medianas).  
// - Se integra en `ProductItemEspecificationsRight` como parte de la presentación de disponibilidad de stock.  
//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import ProductItemQuantityHandler from "./ProductItemQuantityHandler";
import type { AmountDataType } from "../../../../typings/sells/sellsComponentTypes";

const ProductItemAmountData = ({ variants }: AmountDataType): React.ReactNode => {

  if (!variants) return null;

  return (
    <Grid
      sx={(theme: Theme) => ({
        backgroundColor: theme?.custom?.blackTranslucid,
        borderRadius: "1em",
        marginBottom: "0.3em",
        padding: "0.2em 0.5em",
        width: { xs: "auto", md: "100%" },
      })}
    >
      <Typography
        sx={(theme: Theme) => ({
          fontSize: theme?.typography?.caption?.fontSize,
        })}
      >
        <ProductItemQuantityHandler variants={variants}/>
      </Typography>
    </Grid>
  );
};

export default ProductItemAmountData;
