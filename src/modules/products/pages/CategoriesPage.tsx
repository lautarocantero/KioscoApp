import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import NewLabelIcon from '@mui/icons-material/NewLabel';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import DisplayOptions from '../../shared/components/DisplayOptions';

const categoriesLinks = [
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