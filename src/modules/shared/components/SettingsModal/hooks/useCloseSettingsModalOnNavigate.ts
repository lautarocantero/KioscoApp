import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// El modal de Ajustes vive montado por encima de la app (isOpen && <Dialog/>)
// sin desmontarse al navegar. Algunas secciones (Membresía → checkout)
// necesitan mandar a otra ruta: sin esto, el Dialog seguiría flotando sobre
// la página nueva. Se cierra solo si la ruta cambia DESPUÉS de abrirse (no
// en el mount, que es cuando se abrió en la ruta actual).
export const useCloseSettingsModalOnNavigate = (open: boolean, onClose: () => void): void => {
    const location = useLocation();
    const openedAtPathnameRef = useRef(location.pathname);

    useEffect(() => {
        if (!open) return;
        if (location.pathname === openedAtPathnameRef.current) return;
        onClose();
    }, [location.pathname, open, onClose]);
};

export default useCloseSettingsModalOnNavigate;
