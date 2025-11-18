import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import DisplayOptions from '../../shared/components/DisplayOptions';

const shopSellersLinks = [
  { icon: <RecentActorsIcon />, description: 'Ver vendedores', url: '/shop-sellers-list'},
  { icon: <PersonAddAlt1Icon />, description: 'Crear vendedor', url: '/shop-sellers-create'},
  { icon: <ManageAccountsIcon />, description: 'Editar vendedor', url: '/shop-sellers-edit'},
]

const ShopSellersPage = ():React.ReactNode => {
    return (
        <DisplayOptions title='Vendedores' icon={<GroupsIcon />}  links={shopSellersLinks}/>
    )
}

export default ShopSellersPage;