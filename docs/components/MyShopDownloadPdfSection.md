# 🧩 `MyShopDownloadPdfSection`

> Sección de Ajustes → Mi tienda → "Descarga de comprobantes": radio button para elegir si el PDF de la venta se descarga automáticamente después de cada venta.

## 📦 Props

No recibe props — lee/escribe el valor directo con `useDownloadPdfOption`.

## 💡 Ejemplo

Registrada como `SettingsSectionEnum.MyShopDownloadPdf` en
`src/config/SettingsCategories.tsx`, dentro de la categoría "Mi tienda"
(`SettingsCategoryEnum.MyShop`), junto a `MyShopCurrencySection`.

```tsx
<RadioGroup value={String(downloadPdfAfterSale)} onChange={handleChange}>
  <FormControlLabel value="true" control={<Radio />} label="Descargar automáticamente" />
  <FormControlLabel value="false" control={<Radio />} label="No descargar automáticamente" />
</RadioGroup>
```

Default: `true` (ver [`useDownloadPdfOption`](../hooks/ui/useDownloadPdfOption.md)).

## Tests

- `src/modules/shared/test/SettingsModal/MyShopDownloadPdfSection.test.tsx`
