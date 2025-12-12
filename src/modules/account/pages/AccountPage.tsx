
// # Página: Cuenta  
// 🚧 En construcción🔨

// ## Futuro 🔜
// Centralizar opciones de gestión de la cuenta del usuario.

// ## Componentes previstos 📦
// - Enlace a edición de cuenta  
// - Enlace a plan de suscripción ◾

// ## Notas técnicas 💽
// - Router: `/account`  
// - Schema: `User`  
// - Actualidad: muestra opciones mediante `DisplayOptions`
//-----------------------------------------------------------------------------//

import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonIcon from '@mui/icons-material/Person';
import DisplayOptions from '../../shared/components/Options/DisplayOptions';
import type { LinksInterface } from '../../../typings/account/accountComponentTypes';

const accountLinks: LinksInterface[] = [
  { icon: <ManageAccountsIcon />, description: 'Editar cuenta', url: '/account-edit'},
  { icon: <WorkspacePremiumIcon />, description: 'Plan de subscripcion', url: '/account-subscription'},
]

const AccountPage = ():React.ReactNode => {
    return (
      <DisplayOptions title='Cuenta' icon={<PersonIcon />}  links={accountLinks}/>
    )
}

export default AccountPage;