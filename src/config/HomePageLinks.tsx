
//─────────────────── Componente 🧩: HomePageLinks ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Contiene los enlaces principales de navegación para la página de inicio.

//──────────────────── Links 🌐 ─────────────────────//
// - Ventas  
// - Tienda  
// - Cuenta  
// - Proveedores  
// - Productos

//-----------------------------------------------------------------------------//

import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import StoreIcon from '@mui/icons-material/Store';
import TrolleyIcon from '@mui/icons-material/Trolley';
import type { LinksInterface } from '../typings/account/accountComponentTypes';

export const HomePageLinks: LinksInterface[] = [
  { icon: <PointOfSaleIcon />, description: 'Ventas', url: '/sells'},
  { icon: <StoreIcon />, description: 'Tienda', url: '/shop'},
  { icon: <PersonIcon />, description: 'Cuenta', url: '/account'},
  { icon: <TrolleyIcon />, description: 'Proveedores', url: '/providers'},
  { icon: <CategoryIcon />, description: 'Productos', url: '/products'},
];
