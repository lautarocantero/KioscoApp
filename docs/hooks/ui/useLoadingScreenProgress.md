# 🪝 `useLoadingScreenProgress`

> Hook de React que simula el progreso (0-100) de la animación de relleno de `LoadingScreen`.

## 🎯 ¿Para qué sirve?

No hay progreso real que mostrar (no medimos bytes de la respuesta HTTP), así que este hook simula uno creíble: una sola pasada, sin loop ni reinicio, que crece rápido al principio y se frena con el tiempo. Reemplaza la animación CSS `infinite` anterior (que repetía el relleno cada 1.8s sin relación con cuánto tardaba realmente el fetch) por un valor que efectivamente avanza mientras la carga sigue en curso.

## 📦 Firma

```ts
useLoadingScreenProgress(): number
```

- No recibe parámetros: arranca a contar desde que el componente que lo llama se monta (por diseño, `LoadingScreen` sólo existe mientras hay una carga en curso, así que "tiempo desde el mount" y "tiempo desde que empezó a cargar" son lo mismo).
- Devuelve un número entre `0` y `92` (nunca llega a 100: como no sabemos cuándo termina realmente el fetch, sería mentir; en cuanto la carga real termina, `LoadingScreen` se desmonta y revela el contenido, así que el usuario nunca ve el tope quedarse pegado).

## ⏱️ Comportamiento

Curva exponencial (`92 * (1 - e^(-elapsed / 2200ms))`), actualizada cada 100ms: rápida en el primer segundo, se frena después. Una carga instantánea se ve como si arrancara enseguida; una carga lenta la sigue "empujando" hacia el tope sin nunca completarla del todo.

## 💡 Ejemplo

```tsx
const progress = useLoadingScreenProgress();

<Box sx={{ clipPath: `inset(${100 - progress}% 0 0 0)`, transition: "clip-path 0.2s ease-out" }} />
```

## Tests

`src/hooks/ui/test/useLoadingScreenProgress.test.ts`

## Ver también

- [`LoadingScreen`](../../components/LoadingScreen.md)
- [`useInitialPageLoading`](useInitialPageLoading.md)
