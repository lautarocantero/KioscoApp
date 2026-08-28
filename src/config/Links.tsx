import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import CategoryIcon from "@mui/icons-material/Category";
import StoreIcon from "@mui/icons-material/Store";
import ReceiptIcon from '@mui/icons-material/Receipt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import NewLabelIcon from '@mui/icons-material/NewLabel';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import type { OptionLink } from "@typings/ui/layout.types";
import GroupIcon from '@mui/icons-material/Group';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Orden por frecuencia de uso — "Vender" ya no vive acá: es el botón fijo
// del riel del sidebar (ver SidebarSellButton), con acceso directo a
// /new-sell desde cualquier sección.
export const SidebarNavLinks: OptionLink[] = [
  {
    description: "Ventas",
    icon: <PointOfSaleIcon />,
    url: "/sells",
  },
  {
    description: "Boletas",
    icon: <ReceiptIcon />,
    url: "/receipts",
    subtitle: "Carga de boletas y actualizaciones",
  },
  {
    description: "Productos",
    icon: <CategoryIcon />,
    url: "/products",
    action: { label: "Nuevo producto", url: "/product-create" },
  },
  {
    description: "Proveedores",
    icon: <LocalShippingIcon />,
    url: "/providers",
    subtitle: "Gestión de proveedores",
    action: { label: "Nuevo proveedor", url: "/provider-create" },
  },
  {
    description: "Tienda",
    icon: <StoreIcon />,
    url: "/shop",
    subtitle: "Resumen general del negocio",
  },
  {
    description: "Vendedores",
    icon: <GroupIcon />,
    url: "/sellers",
    action: { label: "Invitar vendedor", url: "/sellers" },
  },
];


export const CategoriesNavLinks: OptionLink[] = [
  { description: 'Ver Categorías', icon: <CollectionsBookmarkIcon />, url: '/categories-list', subtitle: '' },
  { description: 'Crear Categoría', icon: <NewLabelIcon />, url: '/categories-create', subtitle: '' },
  { description: 'Editar Categoría', icon: <DriveFileRenameOutlineIcon />, url: '/categories-edit', subtitle: '' },
];

export const AccountNavLinks: OptionLink[] = [
  { description: 'Editar cuenta', icon: <ManageAccountsIcon />, url: '/account-edit', subtitle: '' },
  { description: 'Plan de suscripción', icon: <WorkspacePremiumIcon />, url: '/account-subscription', subtitle: '' },
];
