# 🧩 `AuthCompactBrand`

> Marca compacta ("Stocko" + logo chico) que se muestra en la barra superior del panel de contenido, solo cuando [`AuthBrandPanel`](./AuthBrandPanel.md) está oculto (por debajo del breakpoint `md`, ~900px). Sin esto, en ventanas angostas (comunes en laptops sin maximizar, no solo en mobile) no había ningún logo visible en login/registro.

## 📦 Props

Sin props.

## 💡 Ejemplo

```tsx
<Box sx={{ display: { xs: "flex", md: "none" } }}>
  <AuthCompactBrand />
</Box>
```

## ✨ Notas

- No es un `h1`: a diferencia de `StockoTitle` (que sí lo es, para las páginas que aún lo usan como título de página), este es solo una marca decorativa junto al toggle de tema — el `h1` real de la pantalla lo pone [`AuthPageHeading`](./AuthPageHeading.md).
- Usado por `LoginAppBarContent`, junto al toggle de tema (`LightMode`), con `justifyContent: { xs: "space-between", md: "flex-end" }` en el contenedor para que el toggle solo quede pegado a la derecha cuando la marca compacta está oculta.
