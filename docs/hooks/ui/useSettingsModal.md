# 🪝 `useSettingsModal`

> Hook de React para controlar la apertura/cierre del modal de Ajustes.

## 🎯 ¿Para qué sirve?

Guarda el estado `isOpen` del modal de **Ajustes** y expone acciones para abrirlo/cerrarlo, desacoplando ese estado del componente que dispara la apertura (`SidebarUserSettings`) del que lo renderiza (`AppSidebar`).

## 📦 Firma

```ts
useSettingsModal(): { isOpen: boolean; openSettings: () => void; closeSettings: () => void }
```

- No recibe parámetros.
- `isOpen` arranca en `false`.

## 💡 Ejemplo

```tsx
import { useSettingsModal } from "../../hooks/ui/useSettingsModal";

function AppSidebar() {
  const { isOpen, openSettings, closeSettings } = useSettingsModal();

  return (
    <>
      <SidebarUserData onOpenSettings={openSettings} />
      {isOpen && <SettingsModal open={isOpen} onClose={closeSettings} />}
    </>
  );
}
```

## ✨ Beneficios

- 🧩 **Desacopla** quién abre el modal de quién lo renderiza.
- ♻️ **Reinicia la navegación interna** del modal en cada apertura, ya que `AppSidebar` solo monta `SettingsModal` mientras `isOpen` es `true`.

## Tests

`src/hooks/ui/test/useSettingsModal.test.ts`
