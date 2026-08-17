# 🪝 `useShopRestockReport`

> Hook de React que arma y descarga la boleta de reposición (PDF) de `/shop`.

## 🎯 ¿Para qué sirve?

El botón "Descargar boleta reposición" del `ShopInventoryPanel` necesita, para **todas** las presentaciones por debajo del mínimo, tanto el nombre del producto padre como la cantidad a reponer. Ningún endpoint bulk trae eso junto:

- `GET /get-product-presentations` (`allPresentations`, ya usado por `useShopLowStockPresentations`) trae `stock`/`min_stock` de todas las presentaciones, pero no el nombre del producto padre — solo `product_id`.
- `GET /get-products` (`fetchAllProductsThunk`, nuevo) trae el catálogo completo liviano (`_id` + `name`), sin filtrar por stock.

Este hook cruza ambas fuentes con `buildRestockReportRows` (helper puro) y genera el PDF con `createRestockReportPdf` al hacer clic.

`allProducts` se guarda en un campo separado del store (`state.product.allProducts`, no `state.product.products`) porque en la misma página `/shop`, `useShopInventorySummary` ya usa `state.product.products` para el listado "con stock" (`getProductsWithStock`) — pisar ese campo con el catálogo completo rompería esa derivación.

## 📦 Firma

```ts
useShopRestockReport(): {
  rows: RestockReportRow[];
  isLoading: boolean;
  error: string | null;
  isDownloadDisabled: boolean; // true mientras carga o si hay error
  handleDownload: () => void;  // genera y descarga el PDF
}
```

## 💡 Ejemplo

```tsx
const { isDownloadDisabled, handleDownload } = useShopRestockReport();
<Button disabled={isDownloadDisabled} onClick={handleDownload}>Descargar boleta reposición</Button>
```

## ✨ Notas

- Si falla la generación del PDF, se muestra un snackbar de error (`SnackBarContext` + `useErrorParser`), igual que el resto de las acciones de la app.
- No recorta a un top N como `useShopLowStockPresentations` — la boleta lista **todas** las presentaciones por debajo del mínimo, porque es para uso operativo (comprar), no para un resumen visual con scroll.
