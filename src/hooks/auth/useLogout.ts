import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { UseLogoutReturn } from "@typings/auth/authTypes";
import type { AppDispatch } from "../../store/auth/authSlice";
import { startLogout } from "../../store/auth/authThunks";

// navigate("/") explícito: sin esto, el logout solo limpia el estado y deja
// al usuario en la URL protegida en la que estaba (mismo motivo que
// useAppSidebar.handleLogout, pero standalone para no arrastrar el resto de
// la lógica del sidebar en pantallas que no lo usan, como /select-kiosco).
export const useLogout = (): UseLogoutReturn => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleLogout = async (): Promise<void> => {
        await dispatch(startLogout());
        navigate("/");
    };

    return { handleLogout };
};

export default useLogout;
