
//─────────────────── Componente 🧩: sellsHistoryLinks ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contiene los enlaces principales de navegación para la página de historial de ventas.

//──────────────────── Links 🌐 ─────────────────────//
// - Ultimo dia
// - Ultima semana
// - Ultimo mes
// - Fecha Especifica

//-----------------------------------------------------------------------------//

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DownloadIcon from '@mui/icons-material/Download';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import type { LinksInterface } from '../../../typings/account/accountComponentTypes';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';


const sellsHistoryLinks: LinksInterface[] = [
  { icon: <DownloadIcon />, description: 'Ultimo dia', url: ''},
  { icon: <DownloadIcon />, description: 'Ultima semana', url: ''},
  { icon: <DownloadIcon />, description: 'Ultimo mes', url: ''},
  { icon: <CalendarMonthIcon />, description: 'Fecha Especifica', url: ''},
]

const SellsHistoryPage = ():React.ReactNode => {

     return (
      <DisplayOptions title='Ventas' icon={<PointOfSaleIcon />}  links={sellsHistoryLinks}/>
    )
}

export default SellsHistoryPage;