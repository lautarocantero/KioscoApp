import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import type { LinksType } from '../../../../typings/account/accountComponentTypes';
import DisplayOptions from '../../../shared/components/OptionsItems/DisplayOptions';

const sellsLinks: LinksType[] = [
  { 
    description: 'Nueva venta',
    icon: <AddShoppingCartIcon />, 
    url: '/new-sell',
    subtitle: 'Nueva venta', 
    
    },
  { icon: <StickyNote2Icon />, description: 'Ver ventas', subtitle: 'Nueva venta', url: '/sells-history'},
]

const SellsPage = ():React.ReactNode => {

    return (
        <DisplayOptions title='Ventas' icon = {<PointOfSaleIcon />}  links={sellsLinks}/>
    )
}

export default SellsPage;