# Seed de datos de prueba

Crea, contra la API real (no una base de datos directamente), cuentas +
kioscos + vendedores + catálogo + ventas de ejemplo — para tener algo con qué
probar la app sin usar datos reales ni tocar lo que ya existe en dev o en
producción.

No requiere dependencias nuevas (usa `fetch`/`FormData`/`readline` nativos de
Node ≥ 18).

Hay dos comandos, según qué necesites:

| Comando | Qué hace |
|---|---|
| `npm run seed:test-data` | Liviano: 1 cuenta + 1 kiosco + catálogo. Todo por flags, no pregunta nada. |
| `npm run seed:full-demo` | Completo e interactivo: cuenta + plan + rol + hasta 3 kioscos + hasta 5 vendedores + catálogo + ventas artificiales a lo largo del mes. |

## ⚠️ Corré esto desde el repo del **frontend** (`KioscoApp`)

Los scripts viven acá, en `KioscoApp`, no en `KioscoAppBackEnd`. Si los corrés
parado en la carpeta del backend te va a tirar `Missing script`. Asegurate de
estar en `KioscoApp` (`cd` hasta ahí, o abrí una terminal nueva ahí) antes de
correr `npm run seed:test-data` / `npm run seed:full-demo`.

## Por qué no los corre Claude directamente

Crear cuentas (y completar pagos) son acciones que un agente no debe ejecutar
por su cuenta, incluso con autorización explícita — así que esto queda armado
para que lo corras vos cuando lo necesites, las veces que quieras, contra el
entorno que elijas.

---

## `npm run seed:full-demo` — demo completa, interactiva

```bash
npm run seed:full-demo
```

Un solo comando, sin flags. Al arrancar pregunta por consola:

1. **¿Entorno?** `dev` o `prod`. Si elegís `prod`, pide escribir la palabra
   `CONFIRMAR` a mano antes de seguir — no hay forma de tocar producción por
   accidente.
2. **¿Plan deseado?** `standard` o `deluxe`.
3. **¿Rol deseado** para la cuenta principal en su kiosco? `admin` o `seller`.
4. **¿Cuántas ventas artificiales** generar a lo largo del mes en curso
   (default 40).

Después, sin más preguntas, hace en orden:

1. Crea la cuenta principal (`/auth/register` + `/auth/login`).
2. **Plan**: si la cuenta no está ya en el plan pedido, activar cualquier
   plan es un pago real por Mercado Pago (`POST /membership/checkout`) — el
   script **nunca lo completa**. Imprime el link de checkout y espera: Enter
   cuando termines de pagar vos mismo, o `skip` para seguir sin confirmarlo.
3. Intenta crear **3 kioscos**.
4. Si pediste rol `seller`, le cambia el rol a la cuenta principal en el
   primer kiosco (`PUT /kiosco/:id/member/:userId/role`).
5. Intenta crear **5 vendedores** — son cuentas de Auth completas que se
   unen al primer kiosco por código de invitación (el backend no tiene un
   "seller" liviano separado, ver más abajo).
6. Carga un catálogo de hasta 150 productos (del archivo real, ver abajo) en
   el primer kiosco.
7. Genera las ventas artificiales pedidas, con fecha repartida entre el día 1
   del mes y hoy, rotando vendedor y medio de pago, ~8% como venta parcial
   (para poder probar esa vista también).

**Sobre los límites de plan** (verificados contra el backend real, no contra
lo que promete la card de precios — ver
`docs/usefull/rolesAndPlansMatrix.md`):

| Límite | Standard | Deluxe |
|---|---|---|
| Kioscos por cuenta (dueño + vendedor, sumado) | 1 | sin límite |
| Miembros por kiosco (dueño incluido) | 2 | sin límite |
| Catálogo (productos + presentaciones) | 1.150 unidades | sin límite |

Con plan Standard, el pedido de 3 kioscos/5 vendedores va a ser rechazado por
el backend más allá del primero de cada uno — **el script no aborta**: crea
lo que el plan permite, reporta cada rechazo individualmente, y al final el
resumen deja claro cuántos de cada cosa se lograron crear.

## `npm run seed:test-data` — versión liviana, por flags

```bash
npm run seed:test-data -- --env=dev
npm run seed:test-data -- --env=prod --yes-production
npm run seed:test-data -- --env=prod --yes-production --limit=500
npm run seed:test-data -- --env=prod --yes-production --all
npm run seed:test-data -- --api-url=https://mi-backend.dev
```

`--env=prod` (o cualquier `--api-url` que no sea `localhost`) **no corre sin
`--yes-production`** — misma salvaguarda que la demo completa, pero como flag
en vez de pregunta, porque este comando es para correr rápido sin prompts.

Opciones completas: `npm run seed:test-data -- --help`.

Crea 1 cuenta + 1 kiosco + un catálogo de productos con presentaciones (dos
fuentes elegibles con `--catalog=file|sample` — `file` es el catálogo real
de `data/productos-f.json`, con muestreo aleatorio vía `--limit`/`--all`;
`sample` son 5 productos de ejemplo hardcodeados, para un smoke test rápido
sin depender del archivo grande).

Todo lo que crean ambos comandos va con el prefijo `[TEST]` (configurable
con `--prefix` en `seed:test-data`) para poder identificarlo y borrarlo
después sin confundirlo con datos reales.

## Apuntar a otro host

`SEED_DEV_API_URL` / `SEED_PROD_API_URL` pisan las URLs por defecto
(`http://localhost:3000` / `https://kioscoappbackend.onrender.com`) sin
tocar código — útil si tu backend local corre en otro puerto:

```bash
SEED_DEV_API_URL=http://localhost:4000 npm run seed:full-demo
```

## `data/productos-f.xls` / `data/productos-f.json`

`productos-f.xls` es el export original (POS de origen, 2251 filas / 81
columnas) que Lautaro pasó como referencia — queda en el repo tal cual. Los
scripts no lo leen directamente: `productos-f.json` es la versión ya
normalizada que usa `fileCatalog.mjs` (nombre, sku, código de barras,
categoría mapeada a `PresentationCategory`, precio, stock, stock mínimo).
Se filtraron 4 filas placeholder ("ARTICULOS VARIOS N") y 4 con precio ≤ 0;
quedaron 2243 productos utilizables. Todos entran como venta por unidad
(`sale_type: "unit"`) porque el origen no tenía ningún ítem marcado por
peso (columna `BALANZA` siempre en `N`).

Para regenerar el JSON si el .xls cambia, hay un script de conversión en
Python (pandas) — no versionado por ser un one-off; pedile a Claude que lo
rearme si hace falta.

## Sobre "vendedores"

El backend no tiene un endpoint para crear un vendedor liviano (solo
nombre, sin login) — un vendedor **es** una cuenta de Auth completa que se
unió al kiosco por código de invitación (`POST /kiosco/join`). Por eso crear
5 vendedores en la demo completa implica registrar 5 cuentas reales más,
cada una con su propio email/password (impresos en el resumen final).

## Cómo funciona por dentro

- `apiClient.mjs` — cliente HTTP mínimo con un jar de cookies casero (el
  backend autentica por cookie de sesión, no por Bearer token) y el header
  `x-kiosco-id` que exigen los endpoints scoped a un kiosco.
- `prompts.mjs` — prompts de consola sin dependencias. Ojo con esto si lo
  tocás: `readline/promises` con `rl.question()` reutilizando una sola
  interface **no funciona** para más de una pregunta cuando stdin no es una
  TTY (pipeado) — el stream hace EOF apenas se vacía, la interface se cierra
  sola, y cualquier `question()` posterior queda colgado para siempre. Acá
  se desacopla "preguntar" de "responder" con una cola de líneas/resolvers,
  que funciona igual en una terminal real que con stdin pipeado (así se
  puede testear con `printf "dev\nstandard\n..." | node fullDemo.mjs`).
- `sampleCatalog.mjs` / `fileCatalog.mjs` — las dos fuentes de catálogo.
- `seedCatalog.mjs` — crea productos + presentaciones con concurrencia
  limitada y tolerancia a fallos puntuales; compartido por `index.mjs` y
  `fullDemo.mjs`.
- `membership.mjs` — chequea/activa el plan (nunca completa el pago).
- `sellersAndRoles.mjs` — registra+une vendedores por invite code, y cambia
  el rol de un miembro.
- `artificialSells.mjs` — arma el payload de `/sell/create-sell` con fechas
  repartidas en el mes.
- `index.mjs` — orquestador liviano (cuenta + 1 kiosco + catálogo).
- `fullDemo.mjs` — orquestador completo e interactivo.
