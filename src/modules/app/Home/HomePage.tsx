import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import TrolleyIcon from '@mui/icons-material/Trolley';
import CategoryIcon from '@mui/icons-material/Category';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';

const homeLinks = [
  { icon: <LocalOfferIcon />, description: 'Ventas', url: '/sells'},
  { icon: <StoreIcon />, description: 'Tienda', url: '/shop'},
  { icon: <PersonIcon />, description: 'Cuenta', url: '/account'},
  { icon: <TrolleyIcon />, description: 'Proveedores', url: '/providers'},
  { icon: <CategoryIcon />, description: 'Productos', url: '/products'},
]

const HomePage = (): React.ReactNode => {

    return (
      <DisplayOptions title='¿Qué deseas hacer?' links={homeLinks} disconnect/>
    )
}

export default HomePage;
