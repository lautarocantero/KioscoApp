import DownloadIcon from '@mui/icons-material/Download';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DisplayOptions from '../../shared/components/DisplayOptions';


const sellsHistoryLinks = [
  { icon: <DownloadIcon />, description: 'Ultimo dia', url: ''},
  { icon: <DownloadIcon />, description: 'Ultima semana', url: ''},
  { icon: <DownloadIcon />, description: 'Ultimo mes', url: ''},
  { icon: <CalendarMonthIcon />, description: 'Fecha Especifica', url: ''},
]

const SellsHistoryPage = ():React.ReactNode => {

     return (
      <DisplayOptions title='Ventas' icon={<LocalOfferIcon />}  links={sellsHistoryLinks}/>
    )
}

export default SellsHistoryPage;