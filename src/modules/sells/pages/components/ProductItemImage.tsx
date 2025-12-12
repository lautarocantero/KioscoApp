
// # Componente: ProductItemImage  

// ## Descripción 📦
// Renderiza la imagen ilustrativa de un producto dentro del ítem.  
// Actualmente utiliza una imagen de ejemplo (`/images/productExample/cocaCola.png`).  

// ## Funciones 🔧
// - `ProductItemImage`: componente principal que renderiza una imagen del producto.  
//   - Usa `Box` de MUI con `component="img"`.  
//   - Aplica estilos responsivos y de presentación (bordes redondeados, ajuste con `objectFit`).  

// ## Notas técnicas 💽
// - El atributo `alt` actualmente usa `${name}`, pero `name` no está definido en este componente.  
//   - Solución: recibir `name` como prop (`{name}: {name: string}`) o reemplazar por un texto fijo.  
// - El `src` debe cambiarse en producción para apuntar a la imagen real del producto.  
//-----------------------------------------------------------------------------//

import { Box } from "@mui/material";

const ProductItemImage = ():React.ReactNode => {

    return (
        <Box
            component="img"
            src="/images/productExample/cocaCola.png"
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