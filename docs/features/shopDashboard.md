# Dashboard de `/shop` — Documentación

## 1. Resumen

`/shop` es el punto de entrada de la app (reemplazó a `/home`). Es un dashboard con datos reales del negocio, no un menú de links. Cada número que se muestra sale de un endpoint/estado real del store — no hay ningún dato mockeado o inventado.

Archivo principal: `src/modules/shop/pages/Shop/ShopPage.tsx`.

## 2. Layout y componentes

```
ShopPage
├── ShopHeader           (saludo real + subtítulo)
├── ShopStatsRow         (4 LinkCard: Ventas, Productos, Vendedores, Proveedores)
├── Grid
│   ├── ShopSalesChart       (gráfico de ventas últimos 7 días + botón "Cargar boleta")
│   └── ShopInventoryPanel   (total / con stock / stock bajo / sin stock)
│       └── ShopLowStockList (lista con scroll: presentaciones por debajo del mínimo)
└── Grid
    ├── ShopTopSellers   (ranking de vendedores por ventas del mes)
    └── ShopTopProviders (proveedores: nombre, valoración, contacto)
```

- `ShopStatsRow` reusa `useShopStatLinks` + el componente `LinkCard` que ya existía (mismo look que el resto de la app).
- `ShopSalesChart` y `ShopTopSellers` comparten `useShopSalesSummary`, que agrega el listado completo de ventas (`useSellsListData`) client-side — no hay endpoint de reportes agregados en el backend (ver [docs/hooks/shop/useShopSalesSummary.md](../hooks/shop/useShopSalesSummary.md)).
- `ShopInventoryPanel` usa `useShopInventorySummary` (ver [docs/hooks/shop/useShopInventorySummary.md](../hooks/shop/useShopInventorySummary.md)) y compone `ShopLowStockList`, alimentada por `useShopLowStockPresentations` (ver [docs/hooks/shop/useShopLowStockPresentations.md](../hooks/shop/useShopLowStockPresentations.md)).
- `ShopTopProviders` usa `useShopFeaturedProviders`.

## 3. Qué datos son reales (y de dónde salen)

| Bloque | Dato | Fuente |
|---|---|---|
| Ventas (tile) | ventas de hoy + monto | `GET /sell/get-today-sells-count` (`useSellStats`) |
| Productos (tile) | total + stock bajo | `GET /product/get-product-stats` (`useProductStats`) |
| Vendedores (tile) | total + online | `GET /seller/get-sellers` (`useSellersListData`) |
| Proveedores (tile) | total | `GET /provider/get-providers-stats` (`useProvidersLinkData`) |
| Gráfico de ventas | ventas por día, últimos 7 días | `GET /sell/get-sells` agregado client-side (`aggregateSellsByDay`) |
| Inventario | total, con stock, stock bajo, sin stock | `GET /product/get-product-stats` + `GET /product/get-products-with-stock`, combinados en `useShopInventorySummary` |
| Productos con stock bajo (lista) | nombre, stock actual, stock mínimo, severidad, top 20 más críticos de N reales | `GET /get-product-presentations` (antes sin usar, ver `useShopLowStockPresentations`) |
| Vendedores destacados | ventas del mes + pedidos + online/offline | mismo `GET /sell/get-sells` cruzado con `GET /seller/get-sellers` (`aggregateTopSellers`) |
| Proveedores destacados | nombre, valoración (1-5), contacto | `GET /provider/get-providers` (`useProvidersListData`) |

## 4. Qué se omitió deliberadamente (y por qué)

El diseño de referencia original tenía más métricas de las que el backend expone hoy. En vez de inventarlas, se omitieron:

- **"Ingresos netos"**: el backend solo da el monto bruto de una venta (`total_amount`), no hay costos/márgenes para calcular neto.
- **"Estado" de proveedor** (Activo/Principal/En evaluación) y **cantidad de productos por proveedor**: `Provider` no tiene esos campos, y no existe relación `provider_id` en `Product`/`Presentation`.
- **"Clientes" y "conversión" por vendedor**: no existe el concepto de cliente/customer en ningún tipo del repo.
- **Banner de "Reportes inteligentes"**: `ShopStadisticsPage` (`src/modules/stadistics/ShopStadisticsPage.tsx`) es un stub vacío sin ruta activa — no se linkeó porque no lleva a ningún lado funcional todavía.

La tabla de stock bajo con stock actual/mínimo por producto **sí se terminó armando** (ver `useShopLowStockPresentations`) conectando `GET /get-product-presentations`, un endpoint que existía en el backend pero no tenía ningún thunk/hook que lo consumiera.

Si en algún momento el backend agrega los datos que faltan arriba, estos son los puntos exactos a extender (`ProductStats`, `Provider`, `Seller`, o un endpoint nuevo de reportes agregados en vez de agregar `sells` client-side).

### Nota sobre `palette.warning` vs `palette.error`

En el theme actual (`src/theme/mainTheme.ts`), `palette.warning.main` y `palette.error.main` tienen el mismo valor hex tanto en light como en dark theme — son indistinguibles visualmente. Para diferenciar la severidad "Bajo" de "Crítico" en `ShopLowStockList`/`ShopInventoryPanel` se usa `theme.custom.accents.gold` (ya documentado en el theme para "badges destacados") en vez de `palette.warning`. Si en algún momento se define un `warning.main` realmente distinto de `error.main`, valdría la pena volver a usar el semántico `palette.warning`.

## 5. Limitación de performance conocida

`useShopSalesSummary` dispara `getSellsThunk()` (todas las ventas, sin paginar ni filtrar por fecha en el backend) para poder agregar por día/vendedor. Es dato real, pero no escala si el volumen de ventas crece mucho — en ese caso conviene un endpoint de backend con rango de fechas en vez de esta agregación en frontend.
