import { useSearchParams } from "react-router-dom";
import { AuthPageModeEnum } from "@typings/auth/authEnums";
import type { UseAuthPageModeReturn } from "@typings/auth/authTypes";

// Se resuelve por query param (?mode=register) y no por ruta propia para que
// /login sea la única ruta que monta AuthLayout: así el panel de marca (y el
// video de intro) no se remonta al alternar entre iniciar sesión y crear
// cuenta, algo que sí pasaba cuando eran dos páginas/rutas distintas.
export const useAuthPageMode = (): UseAuthPageModeReturn => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode") === AuthPageModeEnum.Register
        ? AuthPageModeEnum.Register
        : AuthPageModeEnum.Login;

    return { mode };
};

export default useAuthPageMode;
