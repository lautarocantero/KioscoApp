
// # Store: Redux Toolkit Configuration  

// ## Descripción 📦  
// Configuración central del **store** de Redux usando `configureStore` de Redux Toolkit.  
// Aquí se integran todos los slices que manejan el estado global de la aplicación.  

// ## Slices incluidos 🔧  
// - **authSlice** → Maneja autenticación de usuarios.  
// - **userSlice** → Información y gestión de usuarios.  
// - **productSlice** → Productos principales.  
// - **productVariantSlice** → Variantes de productos.  
// - **providerSlice** → Proveedores.  
// - **sellSlice** → Ventas.  
// - **sellerSlice** → Vendedores.  

// ## Lógica 🎭  
// - `configureStore`: crea el store global.  
// - `reducer`: objeto que agrupa todos los slices bajo claves específicas.  
//   - Cada clave representa una sección del estado global (`auth`, `user`, `product`, etc.).  
// - Exporta `store` para ser usado en el `Provider` de React y conectar la aplicación con Redux.  

// ## Notas técnicas 💽  
// - Modularidad: cada slice está definido en su propio archivo, facilitando mantenimiento y escalabilidad.  
// - Escalabilidad: se pueden añadir nuevos slices simplemente importándolos y agregándolos al objeto `reducer`.  
// - Consistencia: todos los estados globales se centralizan en este store, garantizando un flujo de datos uniforme.  

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import productVariantSlice from "./productVariant/productVariantSlice";
import userSlice from "./user/userSlice";
import productSlice from "./product/productSlice";
import providerSlice from "./provider/providerSlice";
import sellSlice from "./sell/sellSlice";
import sellerSlice from "./seller/sellerSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        product: productSlice,
        productVariant: productVariantSlice,
        provider:providerSlice,
        sell: sellSlice,
        seller: sellerSlice,
    },
})