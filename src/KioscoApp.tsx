import { ProductVariantDialogProvider } from "./modules/sells/pages/context/ProductVariant/ProductVariantDialogProvider"
import { DialogProvider } from "./modules/shared/components/SimpleDialog/DialogProvider"
import AppRouther from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"
import { LightDarkThemeProvider } from "./theme/LightDarkThemeProvider"

const KioscoApp = () => {
  return (
    <LightDarkThemeProvider>
      <DialogProvider>
        <ProductVariantDialogProvider>
          <AppTheme>  
            <AppRouther />  
          </AppTheme>
        </ProductVariantDialogProvider>
      </DialogProvider>
    </LightDarkThemeProvider>
)
}

export default KioscoApp
