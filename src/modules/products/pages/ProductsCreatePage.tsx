
// # Componente: ProductsCreatePage  

import AppLayout from "../../shared/layout/AppLayout";
import ProductsFormComponent from "../components/ProductsForm";

// ## Descripción 📦
// Página destinada a la creación de productos.  
// Actualmente muestra un texto placeholder indicando la vista.  

// ## Funciones 🔧
// - `ProductsCreatePage`: componente principal de la vista de creación de productos.  
//   - Renderiza un párrafo con el texto `"ProductsCreatePage"`.  
//   - No recibe props ni maneja lógica adicional en esta versión inicial.  

// ## Notas técnicas 💽
// - Sirve como base para futuras implementaciones de formulario o lógica de creación de productos.  
// - Mantiene la estructura modular de páginas dentro del proyecto.  
//-----------------------------------------------------------------------------//

const ProductsCreatePage = ():React.ReactNode => {

    return (
        <AppLayout title='Crear producto'>
                <ProductsFormComponent />
        </AppLayout>
    )

}

export default ProductsCreatePage;