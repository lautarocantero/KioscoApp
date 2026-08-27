# `exportSellsToCsv` — Documentación

## ¿Para qué sirve?

Exporta a CSV las filas ya filtradas (período + filtro de estado vigentes) de `/sells` — no toda la base. Usa las mismas etiquetas traducidas que ve el usuario en la tabla (`paymentMethod.*`, `sells.status.*`) en vez de los valores crudos del enum. Dispara la descarga vía `Blob` + un `<a download>` temporal, sin librería nueva.

## Firma

```ts
exportSellsToCsv(sells: SellTicketType[], fileName: string, t: TFunction): void
```

## Dónde se usa

Botón "Exportar CSV" en `SellsListPage.tsx` (deshabilitado mientras `loading` o con 0 filas).

## Tests

`src/modules/sells/test/helpers/exportSellsToCsv.test.ts`
