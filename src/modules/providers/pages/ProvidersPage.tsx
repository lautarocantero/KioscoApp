
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TrolleyIcon from '@mui/icons-material/Trolley';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';

const providersLinks = [
  { icon: <RecentActorsIcon />, description: 'Ver Proveedores', url: '/providers-list'},
  { icon: <PersonAddAlt1Icon />, description: 'Crear Proveedor', url: '/providers-create'},
  { icon: <ManageAccountsIcon />, description: 'Editar Proveedor', url: '/providers-edit'},
]

const ProvidersPage = ():React.ReactNode => {
    return (
      <DisplayOptions title='Proveedores' icon={<TrolleyIcon />}  links={providersLinks}/>
    )
}

export default ProvidersPage;