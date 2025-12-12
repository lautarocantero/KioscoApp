
// # Página: SellsHistoryPage  

// ## Descripción 📦  
// Página que muestra opciones de historial de ventas.  
// Renderiza un componente `DisplayOptions` con título, ícono y enlaces predefinidos para filtrar ventas por rango de tiempo.  

// ## Lógica 🔧  
// - `sellsHistoryLinks`: array de enlaces tipados con `LinksInterface`.  
//   - Cada enlace incluye:  
//     - `icon`: ícono representativo (descarga o calendario).  
//     - `description`: texto descriptivo del rango de tiempo (último día, semana, mes, fecha específica).  
//     - `url`: actualmente vacío, preparado para futuras rutas o acciones.  
// - `SellsHistoryPage`: componente principal que renderiza `DisplayOptions`.  
//   - Props:  
//     - `title`: "Ventas".  
//     - `icon`: `LocalOfferIcon`.  
//     - `links`: `sellsHistoryLinks`.  

// ## Notas técnicas 💽  
// - Modularidad: delega la presentación de opciones a `DisplayOptions`.  
// - Escenarios de uso: permite al usuario consultar ventas en distintos rangos de tiempo.  
// - Preparado para integrar navegación o acciones en los `url` de cada enlace.  


import DownloadIcon from '@mui/icons-material/Download';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';
import type { LinksInterface } from '../../../typings/account/accountComponentTypes';


const sellsHistoryLinks: LinksInterface[] = [
  { icon: <DownloadIcon />, description: 'Ultimo dia', url: ''},
  { icon: <DownloadIcon />, description: 'Ultima semana', url: ''},
  { icon: <DownloadIcon />, description: 'Ultimo mes', url: ''},
  { icon: <CalendarMonthIcon />, description: 'Fecha Especifica', url: ''},
]

const SellsHistoryPage = ():React.ReactNode => {

     return (
      <DisplayOptions title='Ventas' icon={<LocalOfferIcon />}  links={sellsHistoryLinks}/>
    )
}

export default SellsHistoryPage;