import { createContext, type Dispatch, type SetStateAction } from "react";

interface DialogContextType {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const DialogContext = createContext<DialogContextType | null>(null); 
