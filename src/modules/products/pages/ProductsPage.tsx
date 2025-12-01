import ClearAllIcon from '@mui/icons-material/ClearAll';
import AddIcon from '@mui/icons-material/Add';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CategoryIcon from '@mui/icons-material/Category';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';

const productsLinks = [
  { icon: <ClearAllIcon />, description: 'Ver Productos', url: '/products-list'},
  { icon: <AddIcon />, description: 'Crear Producto', url: '/products-create'},
  { icon: <DriveFileRenameOutlineIcon />, description: 'Editar Producto', url: '/products-edit'},
  { icon: <BookmarksIcon />, description: 'Categorias', url: '/categories'},
]


const ProductsPage = ():React.ReactNode => {
    return (
      <DisplayOptions title='Productos' icon={<CategoryIcon />}  links={productsLinks}/>
    )
}

export default ProductsPage;