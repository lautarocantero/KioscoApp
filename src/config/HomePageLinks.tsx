
// # Configuración: HomePageLinks  
// Contiene los enlaces principales de navegación para la página de inicio.

// ## Links 🌐
// - Ventas  
// - Tienda  
// - Cuenta  
// - Proveedores  
// - Productos ◾

// 💽 Notas técnicas 💽
// - Exporta constante `HomePageLinks`  
// - Usado por `HomePage` para renderizar opciones con íconos y enlaces  
// - Centraliza configuración para desacoplar la lógica de la vista
//-----------------------------------------------------------------------------//

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import PersonIcon from '@mui/icons-material/Person';
import TrolleyIcon from '@mui/icons-material/Trolley';
import CategoryIcon from '@mui/icons-material/Category';
import type { LinksInterface } from '../typings/account/accountComponentTypes';

export const HomePageLinks: LinksInterface[] = [
  { icon: <LocalOfferIcon />, description: 'Ventas', url: '/sells'},
  { icon: <StoreIcon />, description: 'Tienda', url: '/shop'},
  { icon: <PersonIcon />, description: 'Cuenta', url: '/account'},
  { icon: <TrolleyIcon />, description: 'Proveedores', url: '/providers'},
  { icon: <CategoryIcon />, description: 'Productos', url: '/products'},
];
