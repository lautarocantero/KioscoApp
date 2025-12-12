
// # Rutas: Cuenta  
// 🚧 En construcción🔨

// ## Futuro 🔜
// Definir y centralizar las rutas relacionadas con la gestión de la cuenta del usuario.

// ## Componentes previstos 📦
// - Ruta principal de cuenta  
// - Ruta de edición de cuenta  
// - Ruta de suscripción de cuenta ◾

// ## Notas técnicas 💽
// - Router principal: `/account`  
// - Subrutas: `/account-edit`, `/account-subscription`  
// - Actualidad: renderiza componentes básicos sin lógica avanzada
//-----------------------------------------------------------------------------//

import { Route } from "react-router-dom"
import AccountPage from "./pages/AccountPage";
import AccountEditPage from "./pages/AccountEditPage";
import AccountSubscriptionPage from "./pages/AccountSubscriptionPage";

const AccountRoutes = ():React.ReactNode  => {

    return (
        <>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account-edit" element={<AccountEditPage />} />
            <Route path="/account-subscription" element={<AccountSubscriptionPage />} />
        </>
    )
}

export default AccountRoutes;