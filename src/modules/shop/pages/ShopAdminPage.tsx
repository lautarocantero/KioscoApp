
// # Página: ShopAdminPage  

// ## Descripción 📦  
// Página principal para la gestión de administradores de tienda.  
// Renderiza un menú de opciones (`DisplayOptions`) con accesos directos a las acciones más comunes:  
// - Ver lista de administradores.  
// - Crear un nuevo administrador.  
// - Editar administradores existentes.  

// ## Lógica 🔧  
// - Define un array `shopAdminLinks` con las opciones disponibles:  
//   - Cada opción incluye un ícono (`RecentActorsIcon`, `PersonAddAlt1Icon`, `ManageAccountsIcon`),  
//     una descripción y la ruta (`url`) correspondiente.  
// - `ShopAdminPage`:  
//   - Retorna el componente `DisplayOptions` configurado con:  
//     - `title`: "Administradores".  
//     - `icon`: ícono principal (`StarPurple500Icon`).  
//     - `links`: las opciones definidas en `shopAdminLinks`.  

// ## Renderizado 🎨  
// - `DisplayOptions`:  
//   - Encabezado con título e ícono.  
//   - Lista de opciones interactivas (`OptionsList`) que permiten navegar a las distintas vistas.  

// ## Notas técnicas 💽  
// - Modularidad: separa la definición de enlaces (`shopAdminLinks`) de la vista principal (`ShopAdminPage`).  
// - Escalabilidad: se pueden añadir más opciones al array `shopAdminLinks` sin modificar la estructura del componente.  
// - Consistencia: mantiene el mismo estilo visual que otras páginas de opciones gracias a `DisplayOptions`.  


import StarPurple500Icon from '@mui/icons-material/StarPurple500';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';
import type { LinksInterface } from '../../../typings/account/accountComponentTypes';

const shopAdminLinks: LinksInterface[] = [
  { icon: <RecentActorsIcon />, description: 'Ver Administradores', url: '/shop-administrators-list'},
  { icon: <PersonAddAlt1Icon />, description: 'Crear Administrador', url: '/shop-administrators-create'},
  { icon: <ManageAccountsIcon />, description: 'Editar Administrador', url: '/shop-administrators-edit'},
]

const ShopAdminPage = ():React.ReactNode => {

        return (
          <DisplayOptions title='Administradores' icon={<StarPurple500Icon />}  links={shopAdminLinks}/>
        )       
}

export default ShopAdminPage;