import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DisplayOptions from '../../shared/components/DisplayOptions';

const shopAdminLinks = [
  { icon: <RecentActorsIcon />, description: 'Ver Administradores', url: '/shop-administrators-list'},
  { icon: <PersonAddAlt1Icon />, description: 'Crear Administrador', url: '/shop-administrators-create'},
  { icon: <ManageAccountsIcon />, description: 'Editar Administrador', url: '/shop-administrators-edit'},
]

const ShopAdminPage = ():React.ReactNode => {

        return (
          <DisplayOptions title='Administradores' icon={<StarPurple500Icon />}  links={shopAdminLinks}/>
        )       
}

export default ShopAdminPage;