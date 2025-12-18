
//─────────────────── Componente 🧩: sellsLinks ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contiene los enlaces principales de navegación para la página de ventas.

//──────────────────── Links 🌐 ─────────────────────//
// - Nueva venta
// - Ver ventas

//-----------------------------------------------------------------------------//

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import type { LinksInterface } from '../../../typings/account/accountComponentTypes';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';

const sellsLinks: LinksInterface[] = [
  { icon: <AddShoppingCartIcon />, description: 'Nueva venta', url: '/new-sell'},
  { icon: <StickyNote2Icon />, description: 'Ver ventas', url: '/sells-history'},
]

const SellsPage = ():React.ReactNode => {

    return (
        <DisplayOptions title='Ventas' icon = {<PointOfSaleIcon />}  links={sellsLinks}/>
    )
}

export default SellsPage;