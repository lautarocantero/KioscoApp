# 🪝 `useDownloadPdfOption`

> Hook de React para leer/cambiar si el PDF de la venta se descarga automáticamente después de cada venta.

## 🎯 ¿Para qué sirve?

Expone `downloadPdfAfterSale` (boolean) y un setter, persistidos en
`localStorage`. Lo usa `useCart` (`generateTicket`) para decidir si llama a
`createPdfTicket` tras registrar la venta, y la sección "Descarga de
comprobantes" del modal de Ajustes (`MyShopDownloadPdfSection`).

## 📦 Firma

```ts
useDownloadPdfOption(): { downloadPdfAfterSale: boolean; setDownloadPdfAfterSale: (value: boolean) => void }
```

- No recibe parámetros.
- Default `true` (`DEFAULT_DOWNLOAD_PDF_AFTER_SALE` en `src/config/constants.ts`).
- Persiste en `localStorage` bajo `DOWNLOAD_PDF_AFTER_SALE_STORAGE_KEY` ("downloadPdfAfterSale").

## 💡 Ejemplo

```tsx
import { useDownloadPdfOption } from "@hooks/ui/useDownloadPdfOption";

const { downloadPdfAfterSale, setDownloadPdfAfterSale } = useDownloadPdfOption();

if (downloadPdfAfterSale) createPdfTicket(savedTicket);
```

## Tests

- `src/hooks/ui/test/useDownloadPdfOption.test.ts`
- `src/modules/shared/test/SettingsModal/MyShopDownloadPdfSection.test.tsx`
