# SettingsModal — Documentación

## 1. ¿Para qué sirve?

Modal de **Ajustes** de la aplicación. Se abre desde el ícono de engranaje en `SidebarUserData` (ver [docs/components/sidebar.md](./sidebar.md)) y agrupa, en categorías con subsecciones, las opciones para personalizar la cuenta y la apariencia de la app:

- **Cuenta**
  - Información de cuenta (nombre de usuario, correo)
  - Contraseña y seguridad (fila + botón "Editar" que abre un diálogo, estilo Discord)
- **Apariencia**
  - Modo (claro/oscuro)
  - Idioma (funcional — ver [docs/features/i18n.md](../features/i18n.md) para el alcance real)
  - Tamaño del texto (slider 12–24px, escala toda la app)

**¿Dónde se usa?**
- `src/modules/shared/layout/components/appSideBar/Appsidebar.tsx` (con `React.lazy`/`Suspense`, montado solo mientras está abierto)

## 2. Arquitectura

```
SettingsModal
├── SettingsModalHeader        (título "Ajustes" + botón cerrar)
└── Box (row en desktop, column en mobile)
    ├── SettingsModalSidebar
    │   └── SettingsModalSidebarCategory (una por categoría)
    └── SettingsModalContent
        └── <sección activa>
            ├── AccountInfoSection
            ├── AccountPasswordSection ── AccountPasswordDialog (diálogo anidado)
            ├── AppearanceModeSection
            ├── AppearanceLanguageSection
            └── AppearanceFontSizeSection
```

Archivos:

| Archivo | Responsabilidad |
|---|---|
| `SettingsModal.tsx` | Shell del `Dialog`, arma header + sidebar + content |
| `SettingsModalHeader.tsx` | Título + botón de cerrar |
| `SettingsModalSidebar.tsx` | `<nav>` con la lista de categorías |
| `SettingsModalSidebarCategory.tsx` | Una categoría (ícono + label + lista de secciones) |
| `SettingsModalContent.tsx` | Renderiza la sección activa según `SETTINGS_SECTION_COMPONENTS` |
| `sections/AccountInfoSection.tsx` | Nombre y correo (solo lectura) |
| `sections/AccountPasswordSection.tsx` | Fila "Contraseña" + botón "Editar" (solo presentación) |
| `sections/AccountPasswordDialog.tsx` | Diálogo de cambio de contraseña (contraseña actual + nueva + confirmar) |
| `sections/AppearanceModeSection.tsx` | Select de modo claro/oscuro |
| `sections/AppearanceLanguageSection.tsx` | Select de idioma |
| `sections/AppearanceFontSizeSection.tsx` | Slider de tamaño de letra |
| `sections/SettingsInfoRow.tsx` | Fila label/value reutilizada por `AccountInfoSection` |
| `hooks/useSettingsNavigation.ts` | Estado de la categoría/sección activa |
| `schema/accountPasswordFormSchema.ts` | Yup schema + initial values del form de cambio de contraseña |

Las categorías y el mapeo sección → componente están en `src/config/SettingsCategories.tsx` (`SETTINGS_CATEGORIES`, `SETTINGS_SECTION_COMPONENTS`), siguiendo el mismo patrón que `SidebarNavLinks` en `src/config/Links.tsx`. Los `label` de `SETTINGS_CATEGORIES` son **claves de traducción** (`"settings.categories.account"`, etc.), resueltas con `t()` dentro de `SettingsModalSidebarCategory` — no texto literal.

## 3. Props

`SettingsModalProps` (`@typings/settings/settingsComponentTypes`):

```ts
interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}
```

## 4. Ejemplo de uso

```tsx
import { useSettingsModal } from "../../hooks/ui/useSettingsModal";

const SettingsModal = lazy(() => import(".../SettingsModal/SettingsModal"));

function AppSidebar() {
  const { isOpen, openSettings, closeSettings } = useSettingsModal();

  return (
    <>
      <SidebarUserData onOpenSettings={openSettings} />
      {isOpen && (
        <Suspense fallback={null}>
          <SettingsModal open={isOpen} onClose={closeSettings} />
        </Suspense>
      )}
    </>
  );
}
```

## 5. Detalles de implementación

- **Reinicio de navegación**: `AppSidebar` solo monta `SettingsModal` mientras `isOpen` es `true`, así que `useSettingsNavigation` siempre arranca en "Información de cuenta" en cada apertura, sin necesidad de un `useEffect` de reset.
- **Carga diferida**: se importa con `React.lazy` + `Suspense` (rule de lazy loading para modales que no son necesarios en el primer render).
- **Color del modal**: usa el mismo mixin `getNoisyBackgroundSx` que `ConfirmDialog` (el modal de confirmación/eliminación), en vez de un `backgroundColor` ad-hoc — así los dos modales de la app comparten el mismo look. `AccountPasswordDialog` usa el mismo mixin.
- **Contraseña**: fila + botón "Editar" (estilo Discord) que abre `AccountPasswordDialog`, con 3 campos: contraseña actual, nueva contraseña, confirmar. La contraseña actual se verifica de verdad contra el backend (`POST /auth/login`) antes de aplicar la nueva — no hay endpoint nuevo, se reutiliza login + el flujo de recuperación de contraseña existente. Ver [docs/hooks/account/useAccountPasswordForm.md](../hooks/account/useAccountPasswordForm.md).
- **Apariencia → Modo**: reutiliza `useThemeModeOption` (mismo hook que usa el switch `LightMode`). Ver [docs/hooks/ui/useThemeModeOption.md](../hooks/ui/useThemeModeOption.md).
- **Apariencia → Idioma**: funcional de verdad (`react-i18next`), aunque el alcance de la traducción es acotado — ver [docs/features/i18n.md](../features/i18n.md) y [docs/hooks/ui/useLanguageOption.md](../hooks/ui/useLanguageOption.md). Los nombres "Español"/"English" en el `<Select>` no se traducen a sí mismos (convención estándar de selectores de idioma).
- **Apariencia → Tamaño del texto**: slider que escala **toda** la app (no solo el modal), tocando el `font-size` del `<html>` — la tipografía del theme está en `rem`. Ver [docs/hooks/ui/useFontSizeOption.md](../hooks/ui/useFontSizeOption.md).
- **Accesibilidad**: `Dialog` con `aria-labelledby="settings-modal-title"`; la navegación de categorías es un `<nav aria-label="Categorías de ajustes">`; el ítem activo lleva `aria-current="true"`.
- El switch de tema que antes vivía arriba a la derecha del dashboard (`AppShell.tsx`) se quitó — ahora el modo se cambia desde acá. El `Box` que lo contenía se dejó vacío y reservado para la futura campana de notificaciones.

## 6. Tests

- `src/modules/shared/test/SettingsModal/SettingsModal.test.tsx`
- `src/modules/shared/test/SettingsModal/SettingsModalSidebarCategory.test.tsx`
- `src/modules/shared/test/SettingsModal/AccountInfoSection.test.tsx`
- `src/modules/shared/test/SettingsModal/AccountPasswordSection.test.tsx`
- `src/modules/shared/test/SettingsModal/AccountPasswordDialog.test.tsx`
- `src/modules/shared/test/SettingsModal/AppearanceModeSection.test.tsx`
- `src/modules/shared/test/SettingsModal/AppearanceLanguageSection.test.tsx`
- `src/modules/shared/test/SettingsModal/AppearanceFontSizeSection.test.tsx`
- `src/modules/shared/components/SettingsModal/hooks/test/useSettingsNavigation.test.ts`
- `src/hooks/account/test/useAccountPasswordForm.test.ts`
- `src/hooks/ui/test/useSettingsModal.test.ts`, `useThemeModeOption.test.ts`, `useLanguageOption.test.ts`, `useFontSizeOption.test.ts`
