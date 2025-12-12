
// # Componente: ProductsExhibitor  

// ## Descripción 📦
// Contenedor principal para exhibir un listado de productos con un título.  
// Renderiza un bloque estilizado que incluye el encabezado y la lista de productos.  
// Si no hay productos válidos, muestra el componente `ProductsNotFound`.  

// ## Funciones 🔧
// - `ProductsExhibitor`: componente principal que recibe props tipadas con `ProductsExhibitorInterface`.  
//   - `products`: listado de productos a mostrar.  
//   - `title`: título que se muestra en la esquina superior izquierda del bloque.  
// - Lógica interna:  
//   - Si `products` no existe o no es un array → renderiza `ProductsNotFound`.  
//   - En caso contrario → renderiza:  
//     - `Typography`: título del exhibidor.  
//     - `ProductsList`: listado de productos.  

// ## Notas técnicas 💽
// - Usa `Grid` de MUI como contenedor principal con estilos dinámicos basados en `Theme`.  
// - Estilos:  
//   - Fondo oscuro (`backgroundDark`).  
//   - Bordes redondeados (`borderRadius: '1em'`).  
//   - Márgenes y padding responsivos según tamaño de pantalla.  
//   - Ancho adaptado (`100%` en móviles, `90%` en pantallas medianas).  
// - El título se posiciona de forma absoluta en la esquina superior izquierda con transparencia.  
// - Se integra en vistas de catálogo o exhibición como bloque principal de productos.  
//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import ProductsList from "./ProductsList";
import ProductsNotFound from "./ProductNotFound";
import type { ProductsExhibitorInterface } from "../../../../typings/sells/sellsComponentTypes";

const ProductsExhibitor = ({ products, title }: ProductsExhibitorInterface): React.ReactNode => {
  if (!products || !Array.isArray(products)) return <ProductsNotFound />;

  return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      sx={(theme: Theme) => ({
        position: 'relative',
        backgroundColor: theme?.custom?.backgroundDark,
        borderRadius: '1em',
        margin: { xs: "5em 0.4em 1em", md: "5em auto 1em"},
        padding: { xs: '0.1em' ,md: '0.5em'},
        width: { xs: '100%', md: '90%'},
      })}
    > 
      <Typography 
        sx={(theme: Theme) => ({ 
          position: 'absolute',
          top: '0.5em',
          left: '0.5em',
          color: theme?.custom?.fontColorTransparent,
          fontWeight: 600,
          zIndex: 1,
        })}
      >
        {title}
      </Typography>
      <ProductsList products={products}/>
    </Grid>
  );
};

export default ProductsExhibitor;
