
// # Página: Inicio  
// 🗺️ menú principal para acceder a las distintas secciones del sistema.


// 🧩 Componentes
// - Enlace a ventas  
// - Enlace a tienda  
// - Enlace a cuenta  
// - Enlace a proveedores  
// - Enlace a productos ◾

// 💽 Notas técnicas 💽
// - Router: `/`  
// - Actualidad: renderiza opciones mediante `DisplayOptions` usando `HomePageLinks`
//-----------------------------------------------------------------------------//

import { HomePageLinks } from '../../../config/HomePageLinks';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';

const HomePage = (): React.ReactNode => {
    return (
      <DisplayOptions title='¿Qué deseas hacer?' links={HomePageLinks} disconnect/>
    )
}

export default HomePage;