import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import type { OptionLink } from "@typings/ui/layout.types";
import stocoLogo from "../../public/images/logo/StocoLogoalt.png";

const KioscoLink: OptionLink = {
  description: "Stocko",
  icon: (
    <img
      src={stocoLogo}
      alt="Stocko"
      width={32}
      height={32}
      style={{ objectFit: "contain" }}
    />
  ),
  url: "/home",
  subtitle: "Hoy · última hace 20 min",
};

export const SidebarNavLinks: OptionLink[] = [
  KioscoLink,
  {
    description: "Ventas",
    icon: <PointOfSaleIcon />,
    url: "/sells",
    value: "12",
    subtitle: "Hoy · última hace 20 min",
  },
  {
    description: "Productos",
    icon: <CategoryIcon />,
    url: "/products",
    value: "48",
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
    subtitle: "",
  },
];

export const ShopAdminNavLinks: OptionLink[] = [
  { 
    description: 'Ver Administradores', 
    icon: <RecentActorsIcon />, 
    url: '/shop-administrators-list', 
    subtitle: '' 
  },
  { 
    description: 'Crear Administrador', 
    icon: <PersonAddAlt1Icon />, 
    url: '/shop-administrators-create', 
    subtitle: '' 
  },
  { 
    description: 'Editar Administrador',
    icon: <ManageAccountsIcon />, 
    url: '/shop-administrators-edit', 
    subtitle: '' 
  },
];