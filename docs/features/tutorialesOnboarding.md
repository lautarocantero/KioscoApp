# Tutoriales de onboarding — Informe de relevamiento

> **Estado:** solo investigación. Este documento identifica **dónde** haría
> falta un tutorial paso a paso para usuarios nuevos y **qué** debería
> enseñar cada uno. No se implementó ningún tutorial todavía.
>
> Alcance pedido: recorrer la app y encontrar las pantallas clave donde,
> recién creada la cuenta, un tutorial ayudaría a un usuario nuevo a entender
> qué hacer. Ejemplos guía: unirse o crear un kiosco, crear el primer
> producto, la primera presentación, cargar la primera boleta, invitar al
> primer vendedor, crear el primer proveedor, hacer la primera venta.

## 1. Contexto encontrado en el código

- No existe ningún sistema de tutorial/onboarding hoy (`tutorial`,
  `onboarding`, `walkthrough`, `driver.js`, `intro.js`, `shepherd`: sin
  resultados reales en `src/`).
- Ya existe un patrón visual reutilizable para "estado vacío":
  [`EmptyStateCard`](../../src/modules/shared/components/EmptyStateCard/EmptyStateCard.tsx)
  (mascota/ilustración + título + descripción + botón CTA opcional, dentro de
  un `NoisyCard`). Hoy se usa para dos cosas distintas:
  - Estados "todavía no hay nada": `KioscoEmptyState` (sin kioscos),
    `EmptyProductsList` (carrito vacío en `/new-sell`).
  - Fallbacks de "entidad no encontrada" en formularios de detalle/edición:
    `EmptyProduct`, `EmptyPresentation`, `EmptySeller`, `EmptyProvider`,
    `EmptySellDetail`, `EmptyPresentationsAnalytics`.
- Las pantallas de **listado** (`/products`, `/products/:id/presentations`,
  `/sellers`, `/providers`, `/sells`, `/notifications`) **no** usan
  `EmptyStateCard` en su estado vacío: caen en el texto gris plano del
  `noRowsOverlay` de `GenericDataGrid`. Es decir, cualquier tutorial o mejora
  de estado vacío para esas listas llenaría un hueco real, no duplicaría UI
  existente — y por consistencia visual debería reusar `EmptyStateCard`.
- El flujo de registro (`AuthRoutes`) termina en `/check-email` →
  verificación → login. Después de logueado, si el usuario no tiene un
  kiosco activo, `AppRouter` lo manda a `/select-kiosco`. **No hay ningún
  paso de bienvenida/tour entre el signup y esa pantalla** — confirma que
  `/select-kiosco` es el verdadero punto de entrada "día uno".

## 2. Puntos donde hace falta un tutorial

Ordenados en el orden natural en que los recorrería un usuario nuevo.

### 2.1 Elegir: crear o unirse a un kiosco
- **Pantalla:** `/select-kiosco` — `KioscoSelectorPage.tsx` (y `/join-kiosco`
  — `JoinKioscoPage.tsx`, `/create-kiosco` — `CreateKioscoPage.tsx`).
- **Por qué:** es literalmente la primera pantalla que ve cualquier usuario
  nuevo tras verificar su email. Ya tiene un `KioscoEmptyState` con mascota y
  CTA "Crear kiosco" + link "Tengo un código de invitación", pero no explica
  el concepto.
- **Qué debe aprender el usuario:**
  - Qué es un "kiosco" en la app (representa su negocio/tienda).
  - La diferencia entre **crear** un kiosco (soy dueño/admin) y **unirme**
    con un código de invitación (soy vendedor de un kiosco existente).
  - Que puede pertenecer a más de un kiosco y cambiar entre ellos después
    (ver `docs/features/multiKiosco.md`).

**Cómo se resuelve hoy — crear un kiosco** (`CreateKioscoForm.tsx`, 1 solo paso):
1. Desde `/select-kiosco`, botón **"Crear kiosco"** → `/create-kiosco`.
2. Completa **"Nombre del kiosco"** (obligatorio) y **"Dirección"**
   (obligatorio) — no hay más campos: sin imagen, sin rubro/categoría de
   negocio.
3. Click en **"Crear kiosco"**.
4. La app crea el kiosco, lo marca como el kiosco activo automáticamente y
   navega directo a `/shop`. Si falla, muestra un error inline.

**Cómo se resuelve hoy — unirme con un código** (`JoinKioscoForm.tsx`):
1. Desde `/select-kiosco`, link **"Tengo un código de invitación"** →
   `/join-kiosco` (esta pantalla también es accesible sin estar logueado).
2. Si el link ya trae el código (`/join-kiosco?code=XXXX`, el formato que
   comparte un admin al invitar — ver 2.5) el campo viene prellenado.
3. Si el usuario todavía no tiene cuenta, la app guarda el código
   temporalmente y lo redirige a registrarse; al volver, se une
   automáticamente sin pasos extra.
4. Si ya está logueado, completa **"Código de invitación"** (obligatorio) y
   hace click en **"Unirme"**.
5. La app une al usuario al kiosco, lo marca como kiosco activo y navega a
   `/shop`. Código inválido → mensaje "Código de invitación inválido".

### 2.2 Crear el primer producto
- **Pantalla:** `/products` → `/product-create` (`ProductsListPage.tsx`).
- **Por qué:** el listado vacío hoy es un texto gris sin contexto ni CTA
  ilustrado.
- **Qué debe aprender el usuario:**
  - Que un producto por sí solo **no es vendible todavía**: falta el paso
    siguiente (presentaciones).
  - Campos mínimos para dar de alta un producto (nombre, marca, descripción,
    imagen opcional).

**Cómo se resuelve hoy** (`ProductForm.tsx`, 1 solo paso):
1. Desde `/products`, botón para crear producto → `/product-create`.
2. Completa **"Nombre del producto"** (obligatorio, 3–100 caracteres, debe
   incluir al menos una letra).
3. Completa **"Marca"** (obligatorio, 2–50 caracteres).
4. Completa **"Descripción"** (obligatorio, 10–500 caracteres).
5. Opcionalmente completa **"URL de imagen"** (ruta relativa o URL externa;
   si se llena, se ve una vista previa de la imagen debajo del campo).
6. Click en **"Crear"**.
7. La app muestra una pantalla de éxito **"¡Producto creado correctamente!"**
   con el mensaje "El siguiente paso es agregar las presentaciones del
   producto para ponerlo a la venta" y 4 botones: **"Crear Presentación"**
   (va directo a 2.3 para este producto), "Ver detalle de Producto", "Crear
   otro Producto", "Ver Productos".

### 2.3 Crear la primera presentación
- **Pantalla:** `/products/:product_id/presentations` →
  `presentation-create` (`PresentationListPage.tsx`).
- **Por qué:** es el concepto más confuso del modelo de datos para alguien
  nuevo — no es obvio por qué hace falta un segundo paso después de crear el
  producto, y además es un wizard de 6 pasos (el flujo más largo de la app).
- **Qué debe aprender el usuario:**
  - Qué es una "presentación": la variante vendible de un producto (ej. "bolsa
    1kg", "pack x6"), cada una con su propio precio, stock y SKU.
  - Que el **precio y el stock viven en la presentación, no en el producto**.
  - Que recién con al menos una presentación creada, el producto aparece en
    el catálogo de `/new-sell`.

**Cómo se resuelve hoy** (`PresentationForm.tsx`, wizard de 6 pasos):
1. **Identidad**: "Tipo de venta" (unidad o por peso), "Nombre" (ej. "Coca
   Cola Lata 500ml"), "Descripción", "Categoría" (multi-selección) —
   todos obligatorios.
2. **Identificación**: "SKU" (obligatorio), "Código de barras" (opcional,
   8–14 dígitos), "URL de imagen" (opcional, con vista previa).
3. **Formato y tamaño**: "Tipo de modelo", "Contenido neto" (número, ej.
   500), "Tipo de presentación" (unidad de medida) — no aplican si el tipo
   de venta es por peso.
4. **Stock**: "Stock" y "Stock mínimo" (ambos obligatorios; si la venta es
   por peso, las etiquetas cambian a gramos).
5. **Datos comerciales**: "Precio" (obligatorio, mayor a 0; por peso pasa a
   ser "Precio por 100g"), "¿Es un producto perecedero?" (Sí/No) y, si es
   perecedero, "Fecha de vencimiento".
6. **Proveedores**: selección múltiple de proveedores (**opcional** — "podés
   dejarlo vacío y asignarlo más adelante").
7. Botón **"Siguiente"** en cada paso (valida ese paso antes de avanzar) y
   **"Crear"** en el último.
8. Pantalla de éxito **"¡Presentación creada correctamente!"** con botones:
   "Crear otra presentación", "Ver detalle de Presentación", "Ver
   Presentaciones", "Crear otro Producto", "Ver Productos".

### 2.4 Cargar la primera boleta (reponer stock)
- **Pantalla:** `/receipts` — `ReceiptPage.tsx`.
- **Por qué:** el flujo real es subir un **archivo Excel** con el detalle de
  la compra (no una foto de un ticket como podría suponerse por el nombre
  "boleta"), y esto no es evidente solo con el ícono del menú.
- **Qué debe aprender el usuario:**
  - Que esta pantalla sirve para **reponer stock masivamente** a partir de
    una planilla Excel de compra a un proveedor (no es para emitir boletas
    de venta ni para fotografiar un ticket).
  - Que existe una **plantilla descargable** para armar el Excel en el
    formato correcto.
  - Formatos aceptados (`.xlsx`, `.xls`) y tamaño máximo indicado (10 MB).
  - Que primero se **previsualiza** un resumen (cuántos productos/
    presentaciones nuevas o a actualizar, cuántas filas necesitan revisión)
    y recién al **confirmar** se aplican los cambios de stock — no hay una
    tabla editable fila por fila, es una revisión a nivel de resumen.

**Cómo se resuelve hoy** (`ReceiptUploadArea.tsx` + `ReceiptConfirmModal.tsx`):
1. Opcionalmente, click en **"Descargar plantilla"** para bajar un Excel de
   ejemplo con el formato esperado.
2. Arrastra el archivo `.xlsx`/`.xls` a la zona punteada, o click en
   **"Seleccionar archivo"** para elegirlo del explorador.
3. La app sube el archivo (barra de progreso "Subiendo archivo…") y luego lo
   analiza ("Analizando…") sin insertar todavía nada en la base de datos.
4. Se abre automáticamente el modal **"Confirmar carga de boleta"**, con
   chips resumen: "N productos nuevos", "N presentaciones nuevas", "N
   presentaciones a actualizar" y, si corresponde, "N a revisar" (con una
   advertencia de que esas filas igual se importarán con datos incompletos,
   ej. sin categoría o sin código de barras detectado).
5. El usuario revisa el resumen y hace click en **"Confirmar e importar"**
   (o "Cancelar" para descartar todo).
6. La app aplica los cambios en el servidor (botón "Aplicando…") y muestra
   un resumen final: cuántos productos y presentaciones se procesaron, con
   desglose de nuevos/duplicados/fallidos.

### 2.5 Invitar al primer vendedor
- **Pantalla:** `/sellers` → botón "Agregar vendedor" (`InviteSellerModal`,
  en `SellersListPage.tsx`).
- **Por qué:** el botón abre un flujo de **invitación por código/link**, no
  un alta directa de cuenta ni un formulario con email — un admin nuevo
  puede esperar algo distinto (ej. invitar por correo).
- **Qué debe aprender el usuario:**
  - Que invitar **no envía ningún email**: genera un código y un link que el
    admin debe compartir manualmente (WhatsApp, etc.).
  - Que es el **mismo mecanismo** de código que usa 2.1 para "unirme a un
    kiosco" — no hay un flujo separado para vendedores.
  - Que quien use ese código/link se suma automáticamente con rol
    **vendedor**, y que el rol se puede cambiar después desde la lista de
    vendedores.

**Cómo se resuelve hoy** (`InviteSellerModal.tsx`, solo visible para admins):
1. Desde `/sellers`, click en **"Agregar vendedor"**.
2. El modal carga y muestra dos campos de solo lectura: **"Código de
   invitación"** y **"Link de invitación"** (el mismo link
   `/join-kiosco?code=...` de 2.1).
3. Click en **"Copiar link"** (cambia a "¡Copiado!" al copiarlo al
   portapapeles).
4. Texto de ayuda: "Quien lo use se unirá como vendedor. Vos podés cambiarle
   el rol después." Un link secundario **"Roles y permisos"** abre una
   tabla informativa de qué puede hacer cada rol (solo consulta, no elige
   rol para la invitación).
5. El admin comparte el código/link por fuera de la app. No hay lista de
   invitaciones pendientes ni botón para revocar: es un código estable por
   kiosco.

### 2.6 Crear el primer proveedor
- **Pantalla:** `/providers` → `/provider-create` (`ProvidersListPage.tsx`).
- **Por qué:** CRUD simple, pero conviene explicitar su conexión con boletas.
- **Qué debe aprender el usuario:**
  - Que los proveedores se usan al cargar boletas (2.4) — conviene cargarlos
    antes de empezar a reponer stock.

**Cómo se resuelve hoy** (`ProviderForm.tsx`, 1 solo paso):
1. Desde `/providers`, botón para crear proveedor → `/provider-create`.
2. Completa **"Nombre"** (obligatorio, nombre o razón social).
3. Completa **"Valoración"** (obligatorio, estrellas de 1 a 5, por defecto 5).
4. Completa **"Teléfono de contacto"** (obligatorio) y **"Email de
   contacto"** (obligatorio, formato de email válido).
5. Click en **"Crear"**.
6. La app crea el proveedor y navega directo a `/providers` (no hay pantalla
   de éxito intermedia como en productos/presentaciones).

### 2.7 Hacer la primera venta
- **Pantalla:** `/new-sell` — `NewSellPage.tsx` (catálogo + carrito,
  `src/modules/cart`).
- **Por qué:** es la pantalla de uso diario más importante de la app; ya
  tiene un empty state (`EmptyProductsList`) pero cubre solo el carrito
  vacío, no el flujo completo de venta.
- **Qué debe aprender el usuario:**
  - Buscar/escanear un producto en el catálogo.
  - Elegir la presentación y cantidad correspondiente (`ProductDialog`).
  - Las formas de pago disponibles y qué es un "abono parcial" (fiado).
  - Cómo cerrar la venta y qué pasa después (ticket de confirmación).
  - Que si el catálogo aparece vacío es porque faltan pasos 2.2/2.3.
  - Los atajos de teclado disponibles (`/` buscar, `F2` escáner, `F9`
    generar ticket).

**Cómo se resuelve hoy:**
1. **Buscar el producto**, de tres formas posibles:
   - Escribiendo en la barra de búsqueda ("Buscar producto, presentación,
     SKU o código") y haciendo click (o Enter) sobre un resultado para
     agregarlo directo al carrito.
   - Con el botón **"Escanear"** (o tecla `F2`) para activar el campo de
     lectora de código de barras.
   - Navegando la grilla de productos y haciendo click en una tarjeta, lo
     que abre el diálogo de presentaciones.
2. **Elegir presentación y cantidad** (si se abrió el diálogo de producto):
   en la tabla de presentaciones, se define la cantidad por fila (limitada
   al stock disponible) y se hace click en el ícono de carrito de esa fila.
   Se puede repetir para varias presentaciones antes de cerrar el diálogo.
3. En el **carrito** (panel lateral "Bolsita"), se puede ajustar cantidad y
   descuento por línea.
4. Se elige **"Forma de pago"**: Transferencia (por defecto), Efectivo,
   Débito o Crédito.
5. Se elige **"Estado del pago"**: "Abono total" (por defecto) o "Abono
   parcial" — esta segunda opción es la venta "fiada": pide "Precio pagado"
   y "Nombre del moroso".
6. Opcionalmente se agrega un descuento global y una nota de la venta.
7. Click en **"Generar ticket"** (o tecla `F9`).
8. Se abre el modal **"¡Venta registrada!"** con estilo de ticket de papel:
   número de ticket, fecha, vendedor, total cobrado y vuelto (si aplica),
   con botones **"Imprimir"** y **"Ver detalle"**. El modal se cierra solo a
   los pocos segundos y el foco vuelve a la búsqueda para la próxima venta.

### 2.8 Dashboard principal (`/shop`)
- **Pantalla:** `/shop` — `ShopPage.tsx`.
- **Por qué:** segunda pantalla natural después de crear el kiosco; con cero
  ventas/productos se ve mayormente vacía y las métricas (ticket promedio,
  hora pico, "Reponer y pedir", vendedores activos) no se explican solas.
- **Qué debe aprender el usuario:**
  - Qué significa cada KPI del resumen de hoy.
  - Los accesos directos del panel de la mascota ("Nueva venta", "Cargar
    stock", "Ver estadísticas") como punto de partida hacia 2.2–2.7.

**Cómo se resuelve hoy** — el panel de la mascota (`ShopMascotPanel`) tiene 3
accesos directos:
1. **"Nueva venta"** → lleva directo a `/new-sell` (2.7).
2. **"Ingresar stock"** → lleva a `/products` (no hay una pantalla de "carga
   de stock" separada; se entra por un producto y su presentación).
3. **"Ver estadísticas"** (solo visible para admins) → `/shop/stadistics`.

También desde el encabezado, la acción de cambiar de kiosco navega a
`/select-kiosco`.

## 3. Resumen rápido de campos por formulario

| Flujo | Pasos | Campos obligatorios | Campos opcionales |
|---|---|---|---|
| Crear kiosco | 1 | Nombre, Dirección | — |
| Unirme a kiosco | 1 | Código de invitación | — |
| Crear producto | 1 | Nombre, Marca, Descripción | URL de imagen |
| Crear presentación | 6 | Tipo de venta, Nombre, Descripción, Categoría, SKU, Formato/tamaño, Stock, Stock mínimo, Precio, Perecedero (y Fecha vto. si aplica) | Código de barras, URL de imagen, Proveedores |
| Cargar boleta | 1 (archivo) | Archivo `.xlsx`/`.xls` | — |
| Invitar vendedor | 0 (solo copiar/compartir) | — | — |
| Crear proveedor | 1 | Nombre, Valoración, Teléfono, Email | — |
| Hacer una venta | — | Producto/presentación, cantidad, forma de pago, estado de pago | Descuento, nota, datos de fiado |

## 4. Pantallas evaluadas y descartadas (baja prioridad)

- **`/membership/plans`** (planes/checkout): flujo de facturación, no de uso
  de la app. A lo sumo, una mención de una línea sobre el plan
  gratuito/prueba, sin tutorial dedicado.
- **`/account`**: solo lista de opciones de perfil (módulo marcado "🚧 en
  construcción" en el código). Baja prioridad.
- **`/notifications`**: listado de notificaciones del sistema, sin acción
  que un tutorial deba enseñar.
- **`/sells`** (historial de ventas, distinto de `/new-sell`): es una vista
  de consulta/KPIs sobre ventas ya hechas; tiene sentido mencionarla desde el
  tutorial de 2.7, pero no necesita uno propio.

## 5. Orden sugerido de la secuencia de tutoriales

1. Crear o unirme a un kiosco (`/select-kiosco`)
2. Dashboard: qué es cada cosa y por dónde arrancar (`/shop`)
3. Crear mi primer producto (`/products`)
4. Crear mi primera presentación (`/products/:id/presentations`)
5. Hacer mi primera venta (`/new-sell`)
6. Crear mi primer proveedor (`/providers`)
7. Cargar mi primera boleta (`/receipts`)
8. Invitar a mi primer vendedor (`/sellers`)

Este orden sigue la dependencia real de datos (un producto necesita una
presentación para ser vendible; una boleta necesita un proveedor) y prioriza
que el usuario llegue a "hacer una venta" lo antes posible.

## 6. Notas para una futura implementación (no incluido en este relevamiento)

- Reusar `EmptyStateCard` como base visual de cada paso, ya que es el
  patrón que la app usa hoy para "todavía no hay nada".
- Definir en `store`/`context` un flag de progreso de onboarding por
  usuario/kiosco (qué pasos ya vio o completó), en vez de mostrar todo
  siempre — pendiente de revisar si ya existe algo parecido en
  `src/store/user` o `src/context` antes de crear un slice nuevo, según el
  punto 6 de `CLAUDE.md`.
- Los textos de cada paso deberían vivir en `src/i18n/locales` como el resto
  de los strings de la app.
