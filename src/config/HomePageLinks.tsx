import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import StoreIcon from '@mui/icons-material/Store';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';


export const HomePageLinks = [
  {
    description: "Ventas",
    icon: <PointOfSaleIcon />,
    url: "/sells",
    value: "12",                          // ← dato del día
    subtitle: "Hoy · última hace 20 min",
  },
  {
    description: "Productos",
    icon: <CategoryIcon />,
    url: "/products",
    value: "48",                          // ← total de productos
    subtitle: "3 con stock bajo",
  },
  {
    description: "Tienda",
    icon: <StoreIcon />,
    url: "/shop",
    subtitle: "Configuración del local",
  },
  {
    description: "Proveedores",
    icon: <WarehouseIcon />,
    url: "/providers",
    subtitle: "5 activos · próx. lunes",
  },
  {
    description: "Cuenta",
    icon: <PersonIcon />,
    url: "/account",
    subtitle: "Perfil y configuración",
  },
];