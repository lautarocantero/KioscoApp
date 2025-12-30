
//─────────────────── Componente 🧩: SnackBarProvider ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Proveedor de contexto global para manejar SnackBars en la aplicación.
// Permite mostrar mensajes con severidad configurable y cerrarlos manualmente.
// Envuelve a los componentes hijos para que puedan consumir el contexto.
//
//──────────────────── Funciones 🔧 ─────────────────────//
// • `useState`: inicializa y gestiona el estado del SnackBar.
// • `showSnackBar(message, color)`: dispara un nuevo mensaje con severidad.
//   - Reinicia el estado y lo abre tras un breve delay (50 ms).
// • `closeSnackBar()`: cierra el SnackBar manteniendo el resto del estado.
// • `SnackBarContext.Provider`: expone { snackBar, showSnackBar, closeSnackBar }.
//
//─────────────────── Notas técnicas 💽 ───────────────────//
// - Estado `snackBar`: { open, message, color }.
// - `AlertColor.Info` se usa como valor inicial por defecto.
// - El delay en `showSnackBar` asegura reinicio visual antes de mostrar el nuevo mensaje.
// - Los hijos deben estar envueltos por este provider para acceder al contexto.
// - Tipado fuerte con `SnackBarState` y `PropsWithChildren`.
//
//-----------------------------------------------------------------------------//

import { useState, type PropsWithChildren } from "react";
import { SnackBarContext } from "./SnackBarContext";
import type { SnackBarState } from "../../../../typings/ui/uiModules";
import { AlertColor } from "../../../../typings/ui/ui";

const SnackBarProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const [snackBar, setSnackBar] = useState<SnackBarState>({
    open: false,
    message: '',
    color: AlertColor?.Info,
  });

  const showSnackBar = (message: string, color: SnackBarState['color']): void => {
    setSnackBar({ open: false, message: '', color }); 
    setTimeout(() => { setSnackBar({ open: true, message, color }); }, 50);
  };

  const closeSnackBar = (): void => { 
    setSnackBar({ ...snackBar, open: false }); 
  };

  return (
    <SnackBarContext.Provider value={{ snackBar, showSnackBar, closeSnackBar }}>
      {children}
    </SnackBarContext.Provider>
  );
};

export default SnackBarProvider;