
// # Página: ShopPage  

// ## Descripción 📦  
// Página principal para la sección de **Tienda** dentro de la aplicación.  
// Renderiza un menú de opciones (`DisplayOptions`) que permite navegar hacia las funcionalidades clave de gestión de la tienda.  

// ## Lógica 🔧  
// - Define un array `shopLinks` con las opciones disponibles:  
//   - **Administradores** → `/shop-administrators`  
//   - **Vendedores** → `/shop-sellers`  
//   - **Estadísticas** → `/shop-stadistics`  
// - Cada opción incluye un ícono representativo (`StarPurple500Icon`, `GroupsIcon`, `QueryStatsIcon`).  
// - `ShopPage`:  
//   - Retorna el componente `DisplayOptions` configurado con:  
//     - `title`: "Tienda".  
//     - `icon`: ícono principal (`StoreIcon`).  
//     - `links`: las opciones definidas en `shopLinks`.  

// ## Renderizado 🎨  
// - `DisplayOptions`:  
//   - Encabezado con título e ícono de tienda.  
//   - Lista de opciones interactivas (`OptionsList`) que permiten navegar a las distintas vistas de administración.  

// ## Notas técnicas 💽  
// - Modularidad: separa la definición de enlaces (`shopLinks`) de la vista principal (`ShopPage`).  
// - Escalabilidad: se pueden añadir más opciones al array `shopLinks` sin modificar la estructura del componente.  
// - Consistencia: mantiene el mismo estilo visual que otras páginas de opciones gracias a `DisplayOptions`.  


import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import GroupsIcon from '@mui/icons-material/Groups';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import StoreIcon from '@mui/icons-material/Store';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';
import type { LinksInterface } from '../../../typings/account/accountComponentTypes';

const shopLinks: LinksInterface[] = [
  { icon: <StarPurple500Icon />, description: 'Administradores', url: '/shop-administrators'},
  { icon: <GroupsIcon />, description: 'Vendedores', url: '/shop-sellers'},
  { icon: <QueryStatsIcon />, description: 'Estadisticas', url: '/shop-stadistics'},
]


const ShopPage = ():React.ReactNode => {

    return (
      <DisplayOptions title='Tienda' icon={<StoreIcon />}  links={shopLinks}/>
    )
}

export default ShopPage;