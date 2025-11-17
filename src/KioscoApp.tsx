import AppRouther from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"
import { LightDarkThemeProvider } from "./theme/LightDarkThemeProvider"

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
