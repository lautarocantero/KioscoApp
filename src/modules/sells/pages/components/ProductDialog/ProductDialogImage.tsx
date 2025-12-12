
// # Componente: ProductDialogImage  

// ## Descripción 📦
// Imagen ilustrativa del producto dentro del diálogo.  
// Actualmente utiliza una imagen de ejemplo (`/images/productExample/cocaCola.png`).  

// ## Funciones 🔧
// - `ProductDialogImage`: componente principal que renderiza una imagen del producto.  
//   - Usa `Box` de MUI con `component="img"` para mostrar la imagen.  
//   - Aplica estilos responsivos y de presentación (bordes redondeados, ajuste con `objectFit`).  

// ## Notas técnicas 💽
// - El atributo `alt` actualmente usa `${name}`, pero `name` no está definido en este componente.  
//   - Solución: recibir `name` como prop (`{name}: {name: string}`) o reemplazar por un texto fijo.  
// - El `src` debe cambiarse en producción para apuntar a la imagen real del producto.  
//-----------------------------------------------------------------------------//

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