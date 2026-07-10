
// # Componente: CategoriesPage  

// ## Descripción 📦
// Página principal del módulo de categorías.  
// Renderiza un menú de opciones con íconos y enlaces para gestionar categorías.  

// ## Funciones 🔧
// - `categoriesLinks`: arreglo de enlaces con íconos y descripciones.  
//   - "Ver Categorias" → `/categories-list`  
//   - "Crear Categoria" → `/categories-create`  
//   - "Editar Categoria" → `/categories-edit`  
// - `CategoriesPage`: componente principal que renderiza `DisplayOptions`.  
//   - Muestra el título `"Categorias"`.  
//   - Usa `BookmarksIcon` como ícono principal.  
//   - Renderiza las opciones definidas en `categoriesLinks`.  

// ## Notas técnicas 💽
// - Centraliza la navegación del módulo de categorías en un solo menú.  
// - Usa `DisplayOptions` como componente compartido para mostrar íconos y enlaces.  
//-----------------------------------------------------------------------------//

import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import NewLabelIcon from '@mui/icons-material/NewLabel';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DisplayOptions from '../../../shared/components/Options/DisplayOptions';
import type { LinksType } from '../../../../typings/account/accountComponentTypes';

const categoriesLinks: LinksType[] = [
  { icon: <CollectionsBookmarkIcon />, description: 'Ver Categorias', url: '/categories-list'},
  { icon: <NewLabelIcon />, description: 'Crear Categoria', url: '/categories-create'},
  { icon: <DriveFileRenameOutlineIcon />, description: 'Editar Categoria', url: '/categories-edit'},
]


const CategoriesPage = ():React.ReactNode => {
    return (
      <DisplayOptions title='Categorias' icon={<BookmarksIcon />}  links={categoriesLinks}/>
    )
}

export default CategoriesPage;