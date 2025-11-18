
import AppLayout from "../../shared/layout/AppLayout";
import OptionsList from "../../shared/components/OptionsList";
import { Grid } from "@mui/material";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import TrolleyIcon from '@mui/icons-material/Trolley';
import CategoryIcon from '@mui/icons-material/Category';

const homeLinks = [
  { icon: <LocalOfferIcon />, description: 'Ventas', url: '/sells'},
  { icon: <StoreIcon />, description: 'Tienda', url: '/shop'},
  { icon: <PersonIcon />, description: 'Cuenta', url: '/account'},
  { icon: <TrolleyIcon />, description: 'Proveedores', url: '/providers'},
  { icon: <CategoryIcon />, description: 'Productos', url: '/products'},
]

const HomePage = (): React.ReactNode => {

    return (
        <AppLayout title='¿Qué deseas hacer?'>
          <Grid 
            container 
            display={'flex'} 
            flexDirection={'column'} 
            spacing={'1em'}
            sx={{ 
              width: '70%',
              mb: '1em',
            }}>
            <OptionsList links={homeLinks}/>
          </Grid>
        </AppLayout>
    )
}

export default HomePage;
