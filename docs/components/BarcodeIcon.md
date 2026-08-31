# 🧩 `BarcodeIcon`

> Ícono de código de barras (barras verticales), creado con `createSvgIcon` porque `@mui/icons-material` no trae uno — solo `BarcodeReader` (el lector/pistola).

## 💡 Ejemplo

```tsx
<BarcodeIcon sx={(theme) => ({ color: theme.palette.primary.main })} />
```

## ✨ Notas

Es un `SvgIconComponent` normal (acepta `sx`, `fontSize`, etc. como cualquier ícono de `@mui/icons-material`). El path es el mismo que usa el mockup de referencia de `/new-sell`.
