//─────────────────── Contexto 🔰: TutorialProvider  ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
//Componente proveedor que maneja el estado global del tutorial de onboarding

import type { PropsWithChildren } from "react";
import { useTutorialEngine } from "@hooks/tutorial/useTutorialEngine";
import { TutorialContext } from "./TutorialContext";

export const TutorialProvider = ({ children }: PropsWithChildren): React.ReactNode => {
    const engine = useTutorialEngine();

    return <TutorialContext.Provider value={engine}>{children}</TutorialContext.Provider>;
};
