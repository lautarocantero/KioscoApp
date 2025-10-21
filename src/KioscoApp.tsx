import AppRouther from "./modules/router/AppRouter"
import { AppTheme } from "./modules/theme/AppTheme"
import { LightDarkThemeProvider } from "./modules/theme/LightDarkThemeProvider"

const KioscoApp = () => {
  return (
    <LightDarkThemeProvider>
      <AppTheme>  
        <AppRouther />  
      </AppTheme>
    </LightDarkThemeProvider>
)
}

export default KioscoApp
