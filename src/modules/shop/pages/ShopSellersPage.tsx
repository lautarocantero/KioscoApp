
// # Página: ShopSellersPage  

// ## Descripción 📦  
// Página principal para la gestión de **Vendedores** dentro de la sección de tienda.  
// Renderiza un menú de opciones (`DisplayOptions`) con accesos directos a las acciones más comunes:  
// - Ver lista de vendedores.  
// - Crear un nuevo vendedor.  
// - Editar vendedores existentes.  

// ## Lógica 🔧  
// - Define un array `shopSellersLinks` con las opciones disponibles:  
//   - **Ver vendedores** → `/shop-sellers-list`  
//   - **Crear vendedor** → `/shop-sellers-create`  
//   - **Editar vendedor** → `/shop-sellers-edit`  
// - Cada opción incluye un ícono representativo (`RecentActorsIcon`, `PersonAddAlt1Icon`, `ManageAccountsIcon`).  
// - `ShopSellersPage`:  
//   - Retorna el componente `DisplayOptions` configurado con:  
//     - `title`: "Vendedores".  
//     - `icon`: ícono principal (`GroupsIcon`).  
//     - `links`: las opciones definidas en `shopSellersLinks`.  

// ## Renderizado 🎨  
// - `DisplayOptions`:  
//   - Encabezado con título e ícono de grupo.  
//   - Lista de opciones interactivas que permiten navegar a las distintas vistas de administración de vendedores.  

// ## Notas técnicas 💽  
// - Modularidad: separa la definición de enlaces (`shopSellersLinks`) de la vista principal (`ShopSellersPage`).  
// - Escalabilidad: se pueden añadir más opciones al array `shopSellersLinks` sin modificar la estructura del componente.  
// - Consistencia: mantiene el mismo estilo visual que otras páginas de opciones gracias a `DisplayOptions`.  


import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';

const shopSellersLinks = [
  { icon: <RecentActorsIcon />, description: 'Ver vendedores', url: '/shop-sellers-list'},
  { icon: <PersonAddAlt1Icon />, description: 'Crear vendedor', url: '/shop-sellers-create'},
  { icon: <ManageAccountsIcon />, description: 'Editar vendedor', url: '/shop-sellers-edit'},
]

const ShopSellersPage = ():React.ReactNode => {
    return (
        <DisplayOptions title='Vendedores' icon={<GroupsIcon />}  links={shopSellersLinks}/>
    )
}

export default ShopSellersPage;