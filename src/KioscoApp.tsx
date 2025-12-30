//─────────────────── Componente 🧩: KioscoApp ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Punto de entrada principal de la aplicación Kiosco.
// Orquesta los distintos *providers* de contexto y temas,
// asegurando que toda la aplicación tenga acceso a:
// - Temas claro/oscuro
// - Diálogos modales
// - Variantes de producto
// - Notificaciones tipo *snackbar*
// - Enrutamiento principal
//
//──────────────────── Funciones 🔧 ─────────────────────//
// • Renderiza el árbol de proveedores de contexto.
// • Aplica el tema visual mediante `AppTheme`.
// • Gestiona la navegación con `AppRouter`.
// • Centraliza la configuración de diálogos y notificaciones.
//
//─────────────────── Notas técnicas 💽 ───────────────────//
// - `LightDarkThemeProvider`: controla el modo claro/oscuro.
// - `DialogProvider`: provee diálogos simples reutilizables.
// - `ProductVariantDialogProvider`: gestiona variantes de producto.
// - `SnackBarProvider`: muestra alertas y mensajes flotantes.
// - `AppTheme`: aplica estilos globales.
// - `AppRouter`: define las rutas principales.
//
//-----------------------------------------------------------------------------//

import { ProductVariantDialogProvider } from "./modules/sells/pages/context/ProductVariant/ProductVariantDialogProvider"
import { DialogProvider } from "./modules/shared/components/SimpleDialog/DialogProvider"
import SnackBarProvider from "./modules/shared/components/SnackBar/SnackBarProvider"
import AppRouther from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"
import { LightDarkThemeProvider } from "./theme/LightDarkThemeProvider"

const KioscoApp = () => {
  return (
    <LightDarkThemeProvider>
      <DialogProvider>
        <ProductVariantDialogProvider>
          <SnackBarProvider>
            <AppTheme>  
              <AppRouther />  
            </AppTheme>
          </SnackBarProvider>
        </ProductVariantDialogProvider>
      </DialogProvider>
    </LightDarkThemeProvider>
  )
}

export default KioscoApp
