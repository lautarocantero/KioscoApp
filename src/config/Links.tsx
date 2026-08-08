import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import HubIcon from '@mui/icons-material/Hub';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import NewLabelIcon from '@mui/icons-material/NewLabel';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import GroupsIcon from '@mui/icons-material/Groups';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { OptionLink } from "@typings/ui/layout.types";
import stocoLogo from "../../public/images/logo/StocoLogoalt.png";

const KioscoLink: OptionLink = {
  description: "Carrito",
  icon: (
    <img
      src={stocoLogo}
      alt="Stocko"
      width={32}
      height={32}
      style={{ objectFit: "contain" }}
    />
  ),
  url: "/cart",
};

export const SidebarNavLinks: OptionLink[] = [
  KioscoLink,
  {
    description: "Inicio",
    icon: <HubIcon />,
    url: "/home",
    value: "12",
  },
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
    description: "Boletas",
    icon: <StoreIcon />,
    url: "/receipts",
    subtitle: "Carga de boletas y actualizaciones",
  },
  {
    description: "Tienda",
    icon: <StoreIcon />,
    url: "/home", // url: "/shop",
    subtitle: "Configuración del local",
    disabled: true,
  },
  {
    description: "Proveedores",
    icon: <WarehouseIcon />,
    url: "/home", // url: "/providers",
    subtitle: "",
    disabled: true,
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

export const CategoriesNavLinks: OptionLink[] = [
  { description: 'Ver Categorias', icon: <CollectionsBookmarkIcon />, url: '/categories-list', subtitle: '' },
  { description: 'Crear Categoria', icon: <NewLabelIcon />, url: '/categories-create', subtitle: '' },
  { description: 'Editar Categoria', icon: <DriveFileRenameOutlineIcon />, url: '/categories-edit', subtitle: '' },
];

export const ProvidersNavLinks: OptionLink[] = [
  { description: 'Ver Proveedores', icon: <RecentActorsIcon />, url: '/providers-list', subtitle: '' },
  { description: 'Crear Proveedor', icon: <PersonAddAlt1Icon />, url: '/providers-create', subtitle: '' },
  { description: 'Editar Proveedor', icon: <ManageAccountsIcon />, url: '/providers-edit', subtitle: '' },
];

export const AccountNavLinks: OptionLink[] = [
  { description: 'Editar cuenta', icon: <ManageAccountsIcon />, url: '/account-edit', subtitle: '' },
  { description: 'Plan de subscripcion', icon: <WorkspacePremiumIcon />, url: '/account-subscription', subtitle: '' },
];

export const ShopNavLinks: OptionLink[] = [
  { description: 'Administradores', icon: <StarPurple500Icon />, url: '/shop-administrators', subtitle: '' },
  { description: 'Vendedores', icon: <GroupsIcon />, url: '/shop-sellers', subtitle: '' },
  { description: 'Estadisticas', icon: <QueryStatsIcon />, url: '/shop-stadistics', subtitle: '' },
];