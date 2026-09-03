import { lazy, Suspense } from "react";
import SnackBarProvider from "./modules/shared/components/SnackBar/SnackBarProvider"
import AppRouther from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"
import { LightDarkThemeProvider } from "./theme/LightDarkThemeProvider"
import { FontSizeProvider } from "./theme/FontSizeProvider"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";
import { DialogProvider } from "./modules/cart/context/Product/ProductDialogProvider";
import { TutorialProvider } from "./modules/shared/context/Tutorial/TutorialProvider";

const TutorialOverlay = lazy(() => import("./modules/shared/components/Tutorial/TutorialOverlay"));

const StokoApp = () => {
  return (
    <LightDarkThemeProvider>
      <FontSizeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <SnackBarProvider>
            <DialogProvider>
            <AppTheme>
              <TutorialProvider>
                <AppRouther />
                <Suspense fallback={null}>
                  <TutorialOverlay />
                </Suspense>
              </TutorialProvider>
            </AppTheme>
            </DialogProvider>
          </SnackBarProvider>
        </LocalizationProvider>
      </FontSizeProvider>
    </LightDarkThemeProvider>
  )
}

export default StokoApp
