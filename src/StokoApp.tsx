import SnackBarProvider from "./modules/shared/components/SnackBar/SnackBarProvider"
import AppRouther from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"
import { LightDarkThemeProvider } from "./theme/LightDarkThemeProvider"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/es";

const StokoApp = () => {
  return (
    <LightDarkThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <SnackBarProvider>
          <AppTheme>  
            <AppRouther />  
          </AppTheme>
        </SnackBarProvider>
      </LocalizationProvider>
    </LightDarkThemeProvider>
  )
}

export default StokoApp
