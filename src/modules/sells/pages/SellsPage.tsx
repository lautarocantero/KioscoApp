import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';

const sellsLinks = [
  { icon: <AddShoppingCartIcon />, description: 'Nueva venta', url: '/new-sell'},
  { icon: <StickyNote2Icon />, description: 'Ver ventas', url: '/sells-history'},
]

const SellsPage = ():React.ReactNode => {

    return (
        <DisplayOptions title='Ventas' icon = {<LocalOfferIcon />}  links={sellsLinks}/>
    )
}

export default SellsPage;