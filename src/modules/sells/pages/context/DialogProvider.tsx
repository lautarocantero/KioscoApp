import { useState, type PropsWithChildren } from "react";
import { DialogContext } from "./DialogContext";

export const DialogProvider = ({ children }: PropsWithChildren) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <DialogContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </DialogContext.Provider>
  );
};
