# OptionsList — Documentación

## 1. Resumen rápido

`OptionsList` es el sistema de componentes que arma el menú de opciones tipo "¿Qué deseas hacer?" (la pantalla de inicio con las tarjetas de Ventas, Productos, Tienda, Proveedores, etc.).

**¿Para qué sirve?** Muestra una lista de links de navegación como tarjetas (`LinkCard`), repartidos en dos columnas, con un ícono, una descripción, un valor numérico opcional y un subtítulo. Opcionalmente agrega un botón de "volver".

**¿Dónde se usa?** Se consume a través de `DisplayOptions`, que lo envuelve en un `AppLayout`. Cualquier pantalla que necesite mostrar un menú de opciones (dashboard principal, submenús de configuración, etc.) usa `DisplayOptions` pasándole un array de `links`.

**Componentes que intervienen:**

```
DisplayOptions            → pantalla completa (AppLayout + OptionsList)
└── OptionsList            → arma las 2 columnas + botón volver
    ├── LinksColumnComponent (x2)   → una columna (izquierda/derecha)
    │   └── LinkMapper              → mapea cada link a un LinkCard
    │       └── LinkCard            → la tarjeta clickeable individual
    │           ├── LinkCardIcon    → círculo con el ícono
    │           └── LinkCardContent → descripción + valor + subtítulo
    └── BackButton              → botón opcional de "volver"
```

**Helper:** `splitLinks` — divide el array de links en dos mitades (izquierda/derecha).

**Elementos de MUI usados:** `Grid`, `Box`, `Link` (de MUI, con `component={LinkReactRouter}` para que navegue con React Router).

**Accesibilidad ya aplicada:** `role="list"` / `role="listitem"` en el contenedor y en cada tarjeta, `aria-hidden` en el ícono y en la flechita decorativa, `:focus-visible` con outline visible, y truncado de texto que no rompe el contenido para lectores de pantalla.

---

## 2. Documentación detallada

### 2.1 `DisplayOptions`

Es el punto de entrada. Arma la página completa: pone el layout general (`AppLayout`) y adentro mete el `OptionsList`.

**Props (`DisplayOptionsInterface`):**

| Prop | Tipo | Descripción |
|---|---|---|
| `title` | `string` | Título de la página (lo muestra `AppLayout`) |
| `icon` | `ReactNode \| null` | Ícono junto al título |
| `links` | `OptionLink[]` | Array de opciones a mostrar |
| `disconnect` | `boolean \| undefined` | Si es `true`, oculta el botón de "volver" |
| `greetings` | `string \| undefined` | Texto de saludo (ej: "¡Hola! 👋") |

**Ejemplo de uso:**

```tsx
<DisplayOptions
  title="¿Qué deseas hacer?"
  greetings="¡Hola! 👋"
  links={[
    { url: "/sales", icon: <StorefrontIcon />, description: "Ventas", value: "12", subtitle: "Hoy · última hace 20 min" },
    { url: "/products", icon: <CategoryIcon />, description: "Productos", value: "48", subtitle: "3 con stock bajo" },
    { url: "/settings", icon: <StoreIcon />, description: "Tienda", subtitle: "Configuración del local" },
    { url: "/providers", icon: <WarehouseIcon />, description: "Proveedores", subtitle: "5 activos · próx. lunes" },
  ]}
/>
```

Internamente:

```tsx
<AppLayout isOptions title={title} icon={icon ?? null} greetings={greetings}>
  <Box sx={{ width: {...}, ... }}>
    <OptionsList links={links} disconnect={disconnect ?? undefined} />
  </Box>
</AppLayout>
```

`AppLayout` recibe `isOptions` para adaptar su propio layout (centrado, ancho fijo, etc. — ver documentación de `AppLayout` si existe por separado).

---

### 2.2 `OptionsList`

Es el "orquestador" del menú. Recibe todos los links y arma la grilla de 2 columnas + el botón de volver.

**Props (`OptionsListInterface`):**

| Prop | Tipo | Descripción |
|---|---|---|
| `links` | `OptionLink[]` | Lista completa de opciones |
| `disconnect` | `boolean \| undefined` | Si es `true`, no se muestra `BackButton` |

**Lógica interna:**

```tsx
const { leftLinks, rightLinks } = splitLinks(links);
```

`splitLinks` reparte el array en dos mitades para que cada `LinksColumnComponent` reciba su parte. Esto es puramente visual (columna izq/der en desktop), en mobile (`xs`) ambas columnas se apilan verticalmente porque `LinksColumnComponent` usa `Grid size={{ xs: 12, md: 6 }}`.

**Estructura de salida (simplificada):**

```tsx
<Grid container spacing={2} component="nav" aria-label="Opciones disponibles" role="list">
  <LinksColumnComponent links={leftLinks} />
  <LinksColumnComponent links={rightLinks} />
  {!disconnect && (
    <Grid size={{ xs: 12 }}>
      <BackButton />
    </Grid>
  )}
</Grid>
```

**¿Por qué `component="nav"` + `role="list"`?** Porque semánticamente esto es un menú de navegación con varias opciones — sin esa marca, un lector de pantalla no distingue esto de un bloque de texto cualquiera. `role="list"` avisa "acá hay una lista de N elementos"; cada `LinkCard` (vía `LinkMapper`) se marca como `role="listitem"`.

**Caso de uso típico:** dashboard principal de la app, pero también sirve para cualquier submenú (por ejemplo "Configuración" con sus propias sub-opciones), reutilizando el mismo componente con otro array de `links`.

---

### 2.3 `LinksColumnComponent`

Componente puente entre `OptionsList` y `LinkMapper`. Solo define el tamaño de columna responsive.

```tsx
const LinksColumnComponent = ({ links }: LinksColumnProps): React.ReactNode => (
  <Grid size={{ xs: 12, md: 6 }}>
    <LinkMapper links={links} />
  </Grid>
);
```

- `xs: 12` → en mobile ocupa el 100% del ancho (columnas apiladas).
- `md: 6` → desde `md` hacia arriba, ocupa la mitad (dos columnas lado a lado).

No tiene lógica propia más allá de esto: es intencionalmente "tonto" (dumb component) para mantener la separación de responsabilidades.

---

### 2.4 `LinkMapper`

Recibe la lista de links de **una** columna y renderiza un `LinkCard` por cada uno.

```tsx
const LinkMapper = ({ links }: LinkMapperProps): React.ReactNode =>
  links.map((link: OptionLink) => (
    <Box key={link.url} role="listitem">
      <LinkCard link={link} />
    </Box>
  ));
```

- Usa `link.url` como `key` (asume URLs únicas dentro del array — importante si alguna vez se repiten links con la misma URL en distintas columnas, ahí habría que usar otro campo único).
- El `Box role="listitem"` es el elemento que declara "soy un ítem de la lista" para accesibilidad, complementando el `role="list"` del contenedor en `OptionsList`.

---

### 2.5 `LinkCard`

La tarjeta clickeable en sí. Es un `Link` de MUI conectado a React Router (navega sin recargar la página).

**Props (`LinkCardProps`):** recibe un único objeto `link: OptionLink` con toda la data necesaria (`url`, `icon`, `description`, `value`, `subtitle`).

**Estructura:**

```tsx
<Link component={LinkReactRouter} to={link.url} sx={{...}}>
  <LinkCardIcon icon={link.icon} />
  <LinkCardContent link={link} />
</Link>
```

**Estilos e interacción:**
- Fondo base: `theme.custom.darkGray` con `backdropFilter: blur(8px)` (efecto vidrio esmerilado).
- Hover: cambia fondo a `theme.custom.darkMain`, se eleva 3px (`translateY(-3px)`), agrega sombra con glow del color primario.
- El hover también recolorea los elementos internos vía selectores de clase (`.link-card-icon-box`, `.link-card-description`, `.link-card-value`, `.link-card-subtitle`) — esto evita pasar props de "hover" manualmente a los hijos; el CSS del padre controla el estado visual de todos los hijos con `&:hover .clase`.
- `&:focus-visible`: agrega un outline visible con el color primario, para que la navegación por teclado (`Tab`) se vea claramente sobre qué tarjeta está el foco.

**¿Por qué es importante el "hover en cascada" con clases?** Porque `LinkCardIcon` y `LinkCardContent` son componentes separados (atómicos) que no reciben ningún estado de "hover" por prop — el propio `Link` padre, al recibir `:hover`, dispara los estilos de sus hijos por selector CSS. Esto mantiene los componentes hijos simples y sin lógica de estado.

---

### 2.6 `LinkCardIcon`

Círculo con el ícono de la opción.

```tsx
<Box aria-hidden="true" sx={{ width: "72px", ... }}>
  <Box className="link-card-icon-box" sx={{ width: "68px", height: "68px", borderRadius: "12px", backgroundColor: theme.palette.primary.light, ... }}>
    {icon}
  </Box>
</Box>
```

- `aria-hidden="true"` en el contenedor externo: el ícono es puramente decorativo, toda la información relevante ya está en el texto (`LinkCardContent`). Sin esto, un lector de pantalla podría anunciar contenido redundante o confuso según cómo esté implementado el ícono SVG.
- La clase `link-card-icon-box` es el gancho que usa `LinkCard` para invertir los colores en hover (fondo blanco, ícono con color primario) — efecto "pop" al pasar el mouse.

---

### 2.7 `LinkCardContent`

Contiene los tres textos de la tarjeta: `description` (arriba, chico y en mayúsculas), `value` (grande, el número destacado) y `subtitle` (abajo, texto secundario).

```tsx
const { description, value, subtitle } = link;
```

**Detalle clave — manejo de `value` opcional:**

```tsx
<Box
  className="link-card-value"
  aria-hidden={!value}
  sx={{
    ...,
    visibility: value ? "visible" : "hidden",
  }}
>
  {value ?? "0"}
</Box>
```

En vez de no renderizar el `Box` cuando no hay `value` (lo cual movería el `subtitle` hacia arriba, rompiendo la alineación entre tarjetas), el `Box` **siempre se monta**, pero se oculta con `visibility: hidden` cuando no hay dato. Esto logra dos cosas:

1. **Alineación consistente:** todas las tarjetas ocupan el mismo alto y el `subtitle` siempre queda a la misma distancia del `description`, tengan o no `value`.
2. **Accesibilidad correcta:** a diferencia de `opacity: 0` (que sigue siendo "visible" para un lector de pantalla), `visibility: hidden` saca el elemento del árbol de accesibilidad — no se anuncia un "0" falso cuando la tarjeta no tiene valor numérico. El `aria-hidden={!value}` refuerza esta intención explícitamente en el código.

**Detalle — la flecha decorativa:**

```tsx
{subtitle ?? (
  <>
    Ver sección <Box component="span" aria-hidden="true">→</Box>
  </>
)}
```

Cuando no hay `subtitle`, se muestra el texto por defecto "Ver sección →". La flecha se envuelve en un `span` con `aria-hidden="true"` porque el carácter Unicode `→` puede leerse de forma inconsistente entre lectores de pantalla (algunos dicen "flecha derecha", otros lo saltean) — al ocultarla, el lector de pantalla simplemente dice "Ver sección", que es igual de claro.

---


### 2.8 Casos de uso

**Caso 1 — Dashboard principal:**
```tsx
<DisplayOptions title="¿Qué deseas hacer?" greetings="¡Hola! 👋" links={dashboardLinks} />
```
Con `disconnect` sin pasar (undefined → falsy), se muestra el `BackButton` — normalmente esto convendría omitirlo en la pantalla raíz pasando `disconnect={true}`, ya que no hay "atrás" a dónde volver.

**Caso 2 — Submenú de configuración:**
```tsx
<DisplayOptions
  title="Configuración de Tienda"
  links={[
    { url: "/settings/general", icon: <SettingsIcon />, description: "General", subtitle: "Datos del local" },
    { url: "/settings/billing", icon: <PaymentIcon />, description: "Facturación", subtitle: "AFIP / ARCA" },
  ]}
/>
```
Acá sí tiene sentido dejar el `BackButton` visible (comportamiento default), para volver al menú anterior.

**Caso 3 — Tarjeta sin valor numérico:**
```tsx
{ url: "/store", icon: <StoreIcon />, description: "Tienda", subtitle: "Configuración del local" }
// value queda undefined
```
La tarjeta se renderiza igual de alta que las demás gracias al manejo de `visibility: hidden` en `LinkCardContent`.

---

### 2.10 Extensión / mantenimiento futuro

- Si se necesita más de 2 columnas, hay que tocar `splitLinks` (actualmente reparte en 2 mitades fijas) y ajustar el `size={{ xs: 12, md: 6 }}` de `LinksColumnComponent` a un valor acorde (ej. `md: 4` para 3 columnas).
- Si se agrega un nuevo campo visual a las tarjetas (por ejemplo un badge de "nuevo"), el lugar natural es `LinkCardContent`, siguiendo el mismo patrón de `value` (mantener el espacio reservado con `visibility` en vez de montar/desmontar condicionalmente, para no romper la alineación entre tarjetas).
- Los colores de hover están centralizados en `LinkCard` vía selectores de clase — si se agrega un nuevo elemento visual a `LinkCardIcon` o `LinkCardContent` que también deba reaccionar al hover, basta con agregarle una clase y un selector `&:hover .nueva-clase` en `LinkCard`, sin tocar la lógica de los componentes hijos.