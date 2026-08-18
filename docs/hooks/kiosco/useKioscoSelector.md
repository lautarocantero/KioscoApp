# 🪝 `useKioscoSelector`

> Hook de React que orquesta la pantalla `/select-kiosco`.

## 🎯 ¿Para qué sirve?

Carga la lista de kioscos del usuario logueado al montar, y maneja el flujo de "entrar a un kiosco": marcarlo como activo y navegar a `/shop`. También sirve como pantalla de onboarding — si `myKioscos` viene vacío (cuenta recién creada), la página solo muestra las filas "Crear kiosco" / "Unirme a kiosco existente".

## 📦 Firma

```ts
useKioscoSelector(): {
  kioscos: KioscoWithStats[];
  loading: boolean;
  error: string | null;
  clearError: () => void;
  handleEnterKiosco: (kiosco: KioscoWithStats) => Promise<void>;
  entering: string | null;
}
```

- No recibe parámetros.
- `entering` es el `_id` del kiosco que se está por entrar (o `null`) — sirve para deshabilitar/mostrar loading solo en el botón de esa card puntual, no en toda la pantalla.
- `handleEnterKiosco(kiosco)` despacha `selectKioscoThunk(kiosco._id)` (marca activo + notifica al backend) y navega a `/shop`.

## 💡 Ejemplo

```tsx
const { kioscos, loading, entering, handleEnterKiosco } = useKioscoSelector();

{kioscos.map((kiosco, index) => (
  <KioscoCard
    key={kiosco._id}
    kiosco={kiosco}
    colorIndex={index}
    entering={entering === kiosco._id}
    onEnter={() => handleEnterKiosco(kiosco)}
  />
))}
```

## ✨ Beneficios

- 🧠 **Un solo hook orquesta toda la pantalla** — `KioscoSelectorPage.tsx` queda libre de lógica de negocio (regla del proyecto).
- 🎯 **Loading por-card, no global**: `entering` evita que un click bloquee visualmente las demás cards mientras una entra.

## Tests

`src/hooks/kiosco/test/useKioscoSelector.test.ts`
