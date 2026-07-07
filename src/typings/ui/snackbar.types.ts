import type { AlertColor } from "./ui";

export interface SnackBarState {
  open: boolean;
  message: string;
  autoHideDuration?: number;
  color: AlertColor;
}

export interface SnackBarContextInterface {
  snackBar: SnackBarState;
  showSnackBar: (message: string, color: AlertColor) => void;
  closeSnackBar: () => void;
}
