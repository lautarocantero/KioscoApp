import { useState, type PropsWithChildren } from "react";
import { SnackBarContext } from "./SnackBarContext";
import { AlertColor } from "../../../../typings/ui/ui";
import type { SnackBarState } from "@typings/ui/snackbar.types";

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