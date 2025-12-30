//─────────────────── Componente 🧩: SimpleSnackbar ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza un Snackbar global consumiendo el contexto `SnackBarContext`. 
// Muestra mensajes dinámicos con severidad (color) y cierre automático. 
// Incluye botón de cierre manual integrado en el `Alert`.

//──────────────────── Funciones 🔧 ─────────────────────// 
// • `useContext(SnackBarContext)!`: obtiene estado y función de cierre. 
// • `closeSnackBar`: cierra el Snackbar, manejando eventos de usuario. 
// • Renderiza `Snackbar` + `Alert` con mensaje y severidad.

//─────────────────── Notas técnicas 💽 ───────────────────//
// - El estado `snackBar` proviene del contexto: { open, message, color }. 
// - `autoHideDuration` fijo en 6000 ms. 
// - Usa componentes de Material UI: Snackbar, Alert. 
// - Se emplea el operador `!` para asegurar que el contexto no sea `undefined`.

//─────────────────── Ejemplo de uso 🎆🎇 ───────────────────//
// import SimpleSnackbar from './SimpleSnackbar';
//
// export default function App() {
//   return (
//     <div>
//       {/* El contexto SnackBarProvider debe envolver la app */}
//        const { showSnackBar } = useContext(SnackBarContext)!;
//        showSnackBar('Agregado producto al carrito', AlertColor.Success);
//     </div>
//   );
// }

//-----------------------------------------------------------------------------//

import Snackbar from '@mui/material/Snackbar';
import { useContext } from 'react';
import { SnackBarContext } from './SnackBarContext';
import { Alert } from '@mui/material';
import type { SnackBarState } from '../../../../typings/ui/uiModules';

const SimpleSnackbar = (): React.ReactNode => {
  {/*─────────────────── 🔎 non‑null assertion operator '!' 🔎 ───────────────────*/}
  {/*─────────────────── por si el contexto es undefined en algun momento ───────────────────*/}
  const { snackBar, closeSnackBar }: { snackBar: SnackBarState, closeSnackBar: () => void } = useContext(SnackBarContext)!;

  return ( 
    <Snackbar 
      open={snackBar.open} 
      autoHideDuration={6000} 
      onClose={closeSnackBar} > 
        <Alert 
          onClose={closeSnackBar} 
          severity={snackBar.color} 
          sx={{ 
            width: '100%' 
          }}> 
            {snackBar.message} 
        </Alert> 
    </Snackbar> );
}

export default SimpleSnackbar;
