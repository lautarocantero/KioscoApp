# Seed de datos de prueba

Crea, contra la API real (no una base de datos directamente), una cuenta +
kiosco + catálogo de ejemplo — para tener algo con qué probar la app sin usar
datos reales ni tocar lo que ya existe en dev o en producción.

No requiere dependencias nuevas (usa `fetch`/`FormData` nativos de Node ≥ 18).

## Uso

```bash
npm run seed:test-data -- --env=dev
npm run seed:test-data -- --env=prod --yes-production
npm run seed:test-data -- --api-url=https://mi-backend.dev
```

`--env=prod` (o cualquier `--api-url` que no sea `localhost`) **no corre sin
`--yes-production`** — es la salvaguarda para que un "para probar rápido" no
termine escribiendo en producción sin que sea a propósito.

Opciones completas: `npm run seed:test-data -- --help`.

## Qué crea

1. Una cuenta nueva (`POST /auth/register` + `/auth/login`).
2. Un kiosco (`POST /kiosco/create`).
3. 5 productos con 11 presentaciones en total (bebidas, almacén, snacks, y un
   ítem de venta por peso) — ver `sampleCatalog.mjs`. Todo con el prefijo
   `[TEST]` (configurable con `--prefix`) para poder identificarlo y
   borrarlo después sin confundirlo con datos reales.

Al terminar imprime el email/password de la cuenta creada — con eso ya podés
iniciar sesión en la app apuntando al mismo backend.

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
