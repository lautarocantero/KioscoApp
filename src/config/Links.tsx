import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import ReceiptIcon from '@mui/icons-material/Receipt';
import HubIcon from '@mui/icons-material/Hub';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import NewLabelIcon from '@mui/icons-material/NewLabel';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import GroupsIcon from '@mui/icons-material/Groups';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { OptionLink } from "@typings/ui/layout.types";
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import stocoLogo from "../../public/images/logo/StocoLogoalt.png";

const KioscoLink: OptionLink = {
  description: "Catalogo",
  icon: (
    <img
      src={stocoLogo}
      alt="Stocko"
      width={32}
      height={32}
      style={{ objectFit: "contain" }}
    />
  ),
  url: "/new-sell",
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
    icon: <ReceiptIcon />,
    url: "/receipts",
    subtitle: "Carga de boletas y actualizaciones",
  },
  {
    description: "Tienda",
    icon: <StoreIcon />,
    url: "/shop",
    subtitle: "Configuración del local",
  },
  {
    description: "Vendedores",
    icon: <GroupIcon />,
    url: "/sellers",
    subtitle: "",
  },
  {
    description: "Proveedores",
    icon: <LocalShippingIcon />,
    url: "/providers",
    subtitle: "",
  },
];


export const CategoriesNavLinks: OptionLink[] = [
  { description: 'Ver Categorias', icon: <CollectionsBookmarkIcon />, url: '/categories-list', subtitle: '' },
  { description: 'Crear Categoria', icon: <NewLabelIcon />, url: '/categories-create', subtitle: '' },
  { description: 'Editar Categoria', icon: <DriveFileRenameOutlineIcon />, url: '/categories-edit', subtitle: '' },
];

export const AccountNavLinks: OptionLink[] = [
  { description: 'Editar cuenta', icon: <ManageAccountsIcon />, url: '/account-edit', subtitle: '' },
  { description: 'Plan de subscripcion', icon: <WorkspacePremiumIcon />, url: '/account-subscription', subtitle: '' },
];

export const ShopNavLinks: OptionLink[] = [
  { description: 'Vendedores', icon: <GroupsIcon />, url: '/sellers', subtitle: '' },
  { description: 'Estadisticas', icon: <QueryStatsIcon />, url: '/shop-stadistics', subtitle: '' },
];