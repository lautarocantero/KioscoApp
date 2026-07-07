import type { SnackBarContextInterface } from "@typings/ui/snackbar.types";
import { createContext } from "react";

export const SnackBarContext = createContext<SnackBarContextInterface | null>(null);