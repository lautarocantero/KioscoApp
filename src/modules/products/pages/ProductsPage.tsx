
// # Componente: ProductsPage  

// ## Descripción 📦
// Página principal del módulo de productos.  
// Renderiza un menú de opciones con íconos y enlaces para gestionar productos y categorías.  

// ## Funciones 🔧
// - `productsLinks`: arreglo de enlaces con íconos y descripciones.  
//   - "Ver Productos" → `/products-list`  
//   - "Crear Producto" → `/products-create`  
//   - "Editar Producto" → `/products-edit`  
//   - "Categorias" → `/categories`  
// - `ProductsPage`: componente principal que renderiza `DisplayOptions`.  
//   - Muestra el título `"Productos"`.  
//   - Usa `CategoryIcon` como ícono principal.  
//   - Renderiza las opciones definidas en `productsLinks`.  

// ## Notas técnicas 💽
// - Centraliza la navegación del módulo de productos en un solo menú.  
// - Usa `DisplayOptions` como componente compartido para mostrar íconos y enlaces.  
//-----------------------------------------------------------------------------//

import ClearAllIcon from '@mui/icons-material/ClearAll';
import AddIcon from '@mui/icons-material/Add';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CategoryIcon from '@mui/icons-material/Category';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';
import type { LinksInterface } from '../../../typings/account/accountComponentTypes';

const productsLinks: LinksInterface[] = [
  { icon: <AddIcon />, description: 'Crear Producto', url: '/products-create'},
  { icon: <ClearAllIcon />, description: 'Ver Productos', url: '/products-list'},
  { icon: <DriveFileRenameOutlineIcon />, description: 'Editar Producto', url: '/products-edit'},
  { icon: <BookmarksIcon />, description: 'Categorias', url: '/categories'},
]


const ProductsPage = ():React.ReactNode => {
    return (
      <DisplayOptions title='Productos' icon={<CategoryIcon />}  links={productsLinks}/>
    )
}

export default ProductsPage;