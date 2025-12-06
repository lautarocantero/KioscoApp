import { useState, type PropsWithChildren } from "react";
import { DialogContext } from "./DialogContext";

export const DialogProvider = ({ children }: PropsWithChildren): React.ReactNode => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <DialogContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </DialogContext.Provider>
  );
};
