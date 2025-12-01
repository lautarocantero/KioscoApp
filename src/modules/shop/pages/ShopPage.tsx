import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import GroupsIcon from '@mui/icons-material/Groups';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import StoreIcon from '@mui/icons-material/Store';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';

const shopLinks = [
  { icon: <StarPurple500Icon />, description: 'Administradores', url: '/shop-administrators'},
  { icon: <GroupsIcon />, description: 'Vendedores', url: '/shop-sellers'},
  { icon: <QueryStatsIcon />, description: 'Estadisticas', url: '/shop-stadistics'},
]


const ShopPage = ():React.ReactNode => {

    return (
      <DisplayOptions title='Tienda' icon={<StoreIcon />}  links={shopLinks}/>
    )
}

export default ShopPage;