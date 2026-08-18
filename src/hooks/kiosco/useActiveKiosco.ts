import { useSelector } from "react-redux";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import type { UseActiveKioscoReturn } from "@typings/kiosco/kioscoTypes";
import type { RootState } from "../../store/auth/authSlice";

// Único punto de verdad para "el kiosco en el que estoy trabajando ahora
// mismo" — resuelve activeKioscoId contra la lista myKioscos ya cargada.
export const useActiveKiosco = (): UseActiveKioscoReturn => {
    const { myKioscos, activeKioscoId } = useSelector((state: RootState) => state.kiosco);

    const activeKiosco = myKioscos.find((k) => k._id === activeKioscoId) ?? null;
    const isAdmin = activeKiosco?.role === AuthRoleEnum.Admin;

    return { activeKiosco, isAdmin };
};

export default useActiveKiosco;
