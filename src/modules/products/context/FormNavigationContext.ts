import { createContext, useContext } from "react";
import type { FormNavigationContextType } from "@typings/product/productTypes";


export const FormNavigationContext = createContext<FormNavigationContextType | undefined>(undefined);

export const useFormNavigation = () => {
    const context = useContext(FormNavigationContext);
    if (!context) {
        throw new Error("useFormNavigation must be used within FormNavigationProvider");
    }
    return context;
};
