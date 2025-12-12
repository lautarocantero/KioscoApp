
// # Página: SellsPage  

// ## Descripción 📦  
// Página principal del módulo de ventas.  
// Renderiza un menú de opciones utilizando `DisplayOptions`, permitiendo al usuario iniciar una nueva venta o consultar el historial de ventas.  

// ## Lógica 🔧  
// - `sellsLinks`: array de enlaces tipados con `LinksInterface`.  
//   - Cada enlace incluye:  
//     - `icon`: ícono representativo de la acción.  
//     - `description`: texto descriptivo de la opción.  
//     - `url`: ruta hacia la funcionalidad correspondiente (`/new-sell` o `/sells-history`).  
// - `SellsPage`: componente principal que renderiza `DisplayOptions`.  
//   - Props:  
//     - `title`: "Ventas".  
//     - `icon`: `LocalOfferIcon`.  
//     - `links`: `sellsLinks`.  

// ## Notas técnicas 💽  
// - Modularidad: delega la presentación de opciones a `DisplayOptions`.  
// - Escenarios de uso:  
//   - Acceso rápido a la creación de una nueva venta.  
//   - Consulta del historial de ventas.  
// - Mantiene consistencia visual al usar íconos de MUI y tipado fuerte con `LinksInterface`.  


import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';
import type { LinksInterface } from '../../../typings/account/accountComponentTypes';

const sellsLinks: LinksInterface[] = [
  { icon: <AddShoppingCartIcon />, description: 'Nueva venta', url: '/new-sell'},
  { icon: <StickyNote2Icon />, description: 'Ver ventas', url: '/sells-history'},
]

const SellsPage = ():React.ReactNode => {

    return (
        <DisplayOptions title='Ventas' icon = {<LocalOfferIcon />}  links={sellsLinks}/>
    )
}

export default SellsPage;