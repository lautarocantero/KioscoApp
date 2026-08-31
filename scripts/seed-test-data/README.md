# Seed de datos de prueba

Crea, contra la API real (no una base de datos directamente), una cuenta +
kiosco + catálogo de ejemplo — para tener algo con qué probar la app sin usar
datos reales ni tocar lo que ya existe en dev o en producción.

No requiere dependencias nuevas (usa `fetch`/`FormData` nativos de Node ≥ 18).

## ⚠️ Corré esto desde el repo del **frontend** (`KioscoApp`)

El script vive acá, en `KioscoApp`, no en `KioscoAppBackEnd`. Si lo corrés
parado en la carpeta del backend te va a tirar `Missing script`. Asegurate de
estar en `KioscoApp` (`cd` hasta ahí, o abrí una terminal nueva ahí) antes de
correr `npm run seed:test-data`.

## Uso

```bash
npm run seed:test-data -- --env=dev
npm run seed:test-data -- --env=prod --yes-production
npm run seed:test-data -- --env=prod --yes-production --limit=500
npm run seed:test-data -- --env=prod --yes-production --all
npm run seed:test-data -- --api-url=https://mi-backend.dev
```

`--env=prod` (o cualquier `--api-url` que no sea `localhost`) **no corre sin
`--yes-production`** — es la salvaguarda para que un "para probar rápido" no
termine escribiendo en producción sin que sea a propósito.

Opciones completas: `npm run seed:test-data -- --help`.

## Qué crea

1. Una cuenta nueva (`POST /auth/register` + `/auth/login`).
2. Un kiosco (`POST /kiosco/create`).
3. Un catálogo de productos con presentaciones. Dos fuentes, elegibles con
   `--catalog`:
   - **`file`** (default) — el catálogo real en `data/productos-f.json`
     (2243 productos, exportado y normalizado desde `data/productos-f.xls`,
     el archivo que pasó Lautaro). Por defecto toma una muestra aleatoria de
     `--limit` productos (200 por defecto) para que una corrida no tarde ni
     genere miles de requests sin querer; `--all` carga el catálogo
     completo. Las creaciones van con concurrencia (`--concurrency`,
     default 5) y si algún producto puntual falla no aborta el resto — al
     final lista qué falló.
   - **`sample`** — 5 productos de ejemplo hardcodeados (`sampleCatalog.mjs`),
     para un smoke test rápido sin depender del archivo grande.

   Todo va con el prefijo `[TEST]` (configurable con `--prefix`) para poder
   identificarlo y borrarlo después sin confundirlo con datos reales.

Al terminar imprime el email/password de la cuenta creada — con eso ya podés
iniciar sesión en la app apuntando al mismo backend.

## `data/productos-f.xls` / `data/productos-f.json`

`productos-f.xls` es el export original (POS de origen, 2251 filas / 81
columnas) que Lautaro pasó como referencia — queda en el repo tal cual. El
script no lo lee directamente: `productos-f.json` es la versión ya
normalizada que usa `fileCatalog.mjs` (nombre, sku, código de barras,
categoría mapeada a `PresentationCategory`, precio, stock, stock mínimo).
Se filtraron 4 filas placeholder ("ARTICULOS VARIOS N") y 4 con precio ≤ 0;
quedaron 2243 productos utilizables. Todos entran como venta por unidad
(`sale_type: "unit"`) porque el origen no tenía ningún ítem marcado por
peso (columna `BALANZA` siempre en `N`).

Para regenerar el JSON si el .xls cambia, hay un script de conversión en
Python (pandas) — no versionado por ser un one-off; pedile a Claude que lo
rearme si hace falta.

## Por qué no lo corre Claude directamente

Crear cuentas es una acción que un agente no debe ejecutar por su cuenta,
incluso con autorización explícita — así que esto queda armado para que lo
corras vos cuando lo necesites, las veces que quieras, contra el entorno que
elijas.

## Cómo funciona por dentro

- `apiClient.mjs`: cliente HTTP mínimo con un jar de cookies casero (el
  backend autentica por cookie de sesión, no por Bearer token) y el header
  `x-kiosco-id` que exigen los endpoints de producto/presentación.
- `sampleCatalog.mjs`: los datos de ejemplo (productos + presentaciones).
- `index.mjs`: parseo de argumentos, salvaguarda de producción, y la
  orquestación register → login → kiosco → productos → presentaciones.
