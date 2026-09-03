# Dashboard de `/shop` — Documentación

> **Rediseño (resumen del día):** `/shop` dejó de ser un dashboard de
> métricas generales (ventas del período elegible, inventario completo,
> vendedores del mes, proveedores destacados) para convertirse en un
> **resumen de HOY**: cuánto se vendió hoy vs ayer, qué necesita atención
> ahora mismo, quién está vendiendo en este momento — con la mascota
> Stocko como "voz" del resumen. Ver el diseño de referencia en el historial
> de la rama `feature/update-shop-design`.
>
> **Multi-kiosco:** el título sigue mostrando el nombre del kiosco activo
> (`useActiveKiosco`), con un botón "Cambiar de Tienda" al lado que vuelve
> a `/select-kiosco`. Todos los datos quedan aislados por kiosco activo
> (header `x-kiosco-id`, transparente para estos hooks). Ver
> [docs/features/multiKiosco.md](multiKiosco.md).

## 1. Resumen

`/shop` es el punto de entrada de la app (reemplazó a `/home`). Cada número que se muestra sale de un endpoint/estado real del store o de una agregación pura sobre esos datos — no hay ningún dato mockeado o inventado.

Archivo principal: `src/modules/shop/pages/Shop/ShopPage.tsx`.

## 2. Layout y componentes

```
ShopPage
├── ShopHeader              (saludo real + nombre del kiosco activo + "Cambiar de Tienda")
├── Grid [1fr, 360px]
│   ├── ShopDailyHeroCard   (ventas de hoy vs ayer, tickets, ticket promedio, fiados, gráfico por hora)
│   └── ShopMascotPanel     (Stocko: headline/bajada con los números del día + accesos directos)
└── Grid [1.3fr, 1fr, 1fr]
    ├── ShopTopProductsToday (más vendidos HOY, con cantidad y monto)
    ├── ShopAttentionPanel   (stock crítico/bajo + fiados sin cobrar + "Reponer y pedir")
    └── ShopActiveSellers    (vendedores online ahora + lo que vendieron hoy)
```

- `ShopDailyHeroCard`, `ShopMascotPanel`, `ShopTopProductsToday` y `ShopActiveSellers` comparten [`useShopDailySummary`](../hooks/shop/useShopDailySummary.md), que reusa `useSellsListData`/`useSellersListData` (misma fuente que el resto de la app) y las piezas puras de la banda de contexto de `/sells` (`buildSellsPeriodRange`, `aggregateSellsPeriodKpis`, `aggregateSellsPeakHour`, `aggregateSellsPartialsAlert`) fijadas en "hoy".
- `ShopAttentionPanel` usa [`useShopLowStockPresentations`](../hooks/shop/useShopLowStockPresentations.md) (para el conteo real crítico/bajo) y [`useShopRestockReport`](../hooks/shop/useShopRestockReport.md) (para el botón "Reponer y pedir", boleta en PDF).

## 3. Qué datos son reales (y de dónde salen)

| Bloque | Dato | Fuente |
|---|---|---|
| Ventas de hoy, tickets, ticket promedio, variación vs ayer | `GET /sell/get-sells` agregado client-side, hoy vs ayer (`aggregateSellsPeriodKpis` + `buildSellsPeriodRange(Today)`) | `useShopDailySummary` |
| Ventas por hora (hoy) | `GET /sell/get-sells` filtrado a hoy, agrupado por hora (`aggregateSellsByHour`) | `useShopDailySummary` |
| Más vendidos hoy | `GET /sell/get-sells` filtrado a hoy, agrupado por producto (`aggregateTopProductsToday`) | `useShopDailySummary` |
| En el mostrador ahora | `GET /seller/get-sellers` (online/offline real) cruzado con las ventas de hoy de cada uno (`aggregateActiveSellersToday`) | `useShopDailySummary` |
| Fiados sin cobrar | Ventas parciales sin saldar, todo el historial (`aggregateSellsPartialsAlert`, mismo helper que `/sells`) | `useShopDailySummary` |
| Stock crítico / bajo | `GET /get-product-presentations` (`useShopLowStockPresentations`, conteo real por severidad sobre TODAS las presentaciones, no solo las 20 visibles) | `useShopLowStockPresentations` |
| Boleta de reposición (PDF) | producto, presentación, stock actual/mínimo, reposición mínima, proveedor 1/2 (vacíos), **todas** las presentaciones bajo el mínimo | `useShopRestockReport` |

## 4. Qué se omitió deliberadamente (y por qué)

El diseño de referencia tenía más métricas de las que el backend expone hoy. En vez de inventarlas, se omitieron:

- **"Meta del día"** (barra de progreso hacia un objetivo de ventas): no existe ningún concepto de meta/objetivo en el backend.
- **"Efectivo en caja"** (saldo de caja): no existe el concepto de sesión/apertura de caja — solo el método de pago por venta (`PaymentMethod.Cash`), que no es lo mismo que un saldo real de caja.
- **"Vencimientos"** en el panel de atención: `ProductTicketType.expiration_date` existe por línea de venta, pero no hay ningún endpoint/agregación que calcule qué productos vencen pronto sobre el catálogo.
- **Horario de turno** ("Turno desde 12:00") en "En el mostrador ahora": solo existe el estado online/offline (`SellerStatus`), no el concepto de turno/sesión de trabajo con horario de inicio.
- **"Pedidos por llegar"**: no existe ningún concepto de pedido a proveedor con fecha de entrega en el backend.

Si el backend agrega estos datos en el futuro, estos son los puntos exactos a extender: un endpoint/campo de metas por kiosco, un modelo de sesión de caja, una agregación de vencimientos sobre `Presentation`/`Product`, y un modelo de turno de vendedor.

### Nota sobre `palette.warning` vs `palette.error`

En el theme actual (`src/theme/mainTheme.ts`), `palette.warning.main` y `palette.error.main` tienen el mismo valor hex tanto en light como en dark theme — son indistinguibles visualmente. Para diferenciar severidades se usa `theme.custom.accents.gold` (fiados, "necesita atención") o `theme.custom.errorDark`/`errorLight` (stock crítico) en vez del semántico `palette.warning`. Si en algún momento se define un `warning.main` realmente distinto de `error.main`, valdría la pena volver a usar el semántico `palette.warning`.

### Nota sobre el estado online/offline en "En el mostrador ahora"

`aggregateActiveSellersToday` cruza `seller_id` de cada venta de hoy contra la lista actual de `sellers`. Si una cuenta se recreó (nuevo `_id`, mismo nombre), esa venta específica queda sin cruzar con nadie — no rompe el listado (el vendedor igual aparece si está online, solo su total de hoy podría no reflejar esa venta puntual), pero es una limitación conocida heredada del mismo patrón que ya tenía el viejo `aggregateTopSellers`.

## 5. Limitación de performance conocida

`useShopDailySummary` (como antes `useShopSalesSummary`) dispara `getSellsThunk()` (todas las ventas, sin paginar ni filtrar por fecha en el backend) para poder agregar por hora/producto/vendedor. Es dato real, pero no escala si el volumen de ventas crece mucho — en ese caso conviene un endpoint de backend con rango de fechas en vez de esta agregación en frontend.
