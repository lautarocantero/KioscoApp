
// # Componente: ProvidersPage  

// ## Descripción 📦
// Página principal del módulo de proveedores.  
// Renderiza un menú de opciones con íconos y enlaces para gestionar proveedores.  

// ## Funciones 🔧
// - `providersLinks`: arreglo de enlaces con íconos y descripciones.  
//   - "Ver Proveedores" → `/providers-list`  
//   - "Crear Proveedor" → `/providers-create`  
//   - "Editar Proveedor" → `/providers-edit`  
// - `ProvidersPage`: componente principal que renderiza `DisplayOptions`.  
//   - Muestra el título `"Proveedores"`.  
//   - Usa `TrolleyIcon` como ícono principal.  
//   - Renderiza las opciones definidas en `providersLinks`.  

// ## Notas técnicas 💽
// - Centraliza la navegación del módulo de proveedores en un solo menú.  
// - Usa `DisplayOptions` como componente compartido para mostrar íconos y enlaces.  
//-----------------------------------------------------------------------------//

import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import TrolleyIcon from '@mui/icons-material/Trolley';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';
import type { LinksInterface } from '../../../typings/account/accountComponentTypes';

const providersLinks: LinksInterface[] = [
  { icon: <RecentActorsIcon />, description: 'Ver Proveedores', url: '/providers-list'},
  { icon: <PersonAddAlt1Icon />, description: 'Crear Proveedor', url: '/providers-create'},
  { icon: <ManageAccountsIcon />, description: 'Editar Proveedor', url: '/providers-edit'},
]

const ProvidersPage = ():React.ReactNode => {
    return (
      <DisplayOptions title='Proveedores' icon={<TrolleyIcon />}  links={providersLinks}/>
    )
}

export default ProvidersPage;