# DataTable — Documentación

## 1. Resumen rápido

`DataTable` es el sistema de componentes que centraliza todo lo relacionado a mostrar un listado de datos en tabla: búsqueda, botón de "nuevo registro", la grilla de datos en sí, el manejo de errores y el diálogo de confirmación de borrado.

**¿Para qué sirve?** Antes, cada página de listado (Productos, Presentaciones, etc.) repetía la misma combinación: `AppLayout` con `hasSearchBar`/`hasNewItem`, un `GenericDataGrid` suelto, y un diálogo de borrado específico de esa entidad (`ProductDeleteDialog`, `PresentationDeleteDialog`). `DataTable` unifica todo eso en un solo componente genérico y reutilizable, dejando `AppLayout` libre de responsabilidades que no le correspondían.

**¿Dónde se usa?** En cualquier página que muestre un listado con acciones de fila (ver, editar, eliminar) — actualmente `ProductsListPage` y `PresentationListPage`.

**Componentes que intervienen:**

```
DataTable                    → orquestador principal
├── DataTableHeader           → título + toolbar (búsqueda + botón nuevo)
│   └── DataTableToolbar       → SearchBar + Button "Nuevo"
├── DataTableErrorAlert        → Alert de error (con botón cerrar)
├── GenericDataGrid            → wrapper del DataGrid de MUI X
└── DataTableDeleteDialog      → wrapper del ConfirmDialog genérico

Componentes de celda reutilizables para columnas:
├── RowActionsCell             → botones de acción por fila (ver/editar/eliminar/etc.)
└── GenericListCell            → celda que muestra una lista con tooltip ("+N más")
```

**Elementos de MUI usados:** `Box`, `Alert`, `Typography`, `Button`, `IconButton`, `Tooltip`, `Stack`, y de `@mui/x-data-grid`: `DataGrid`.

**Accesibilidad ya aplicada:** heading semántico en el título (`component="h2"`) con truncado por CSS (no por recorte de string), `aria-label` en todos los `IconButton` de acciones, `role="status"` + `aria-label` en el loading del grid, foco por teclado en celdas con tooltip (`tabIndex`, `role="button"`), y `closeText` en el `Alert` de error.

---

## 2. Documentación detallada

### 2.1 `DataTable` — el orquestador

Es el componente que consumen las páginas. Recibe todo lo necesario para el listado completo y arma internamente el header, el error, la grilla y el diálogo de borrado.

```tsx
function DataTable<T extends { _id: string }>({
    rows, columns, loading, error, onClearError,
    emptyMessage, height, title, search, newItem, deleteDialog,
    ...rest
}: DataTableProps<T>): React.ReactNode {
    return (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
            <DataTableHeader title={title} search={search} newItem={newItem} />
            <DataTableErrorAlert error={error} onClose={onClearError} />
            <GenericDataGrid<T> rows={rows} columns={columns} loading={loading} emptyMessage={emptyMessage} height={height} {...rest} />
            <DataTableDeleteDialog config={deleteDialog} />
        </Box>
    );
}
```

Es genérico (`<T extends { _id: string }>`) porque debe funcionar con cualquier entidad que tenga un `_id` (requisito de `getRowId` del `DataGrid`).

**Props (`DataTableProps<T>`):**

| Prop | Tipo | Descripción |
|---|---|---|
| `rows` | `T[]` | Filas de datos |
| `columns` | `GridColDef[]` | Definición de columnas del `DataGrid` |
| `loading` | `boolean?` | Muestra el overlay de carga |
| `error` | `string \| null?` | Si existe, muestra el `Alert` de error |
| `onClearError` | `() => void?` | Callback al cerrar el `Alert` |
| `emptyMessage` | `string?` | Mensaje cuando no hay filas |
| `height` | `number \| string?` | Alto del contenedor del grid |
| `title` | `string?` | Título de la tabla (ver `DataTableHeader`) |
| `search` | `DataTableSearchConfig?` | Config de la barra de búsqueda |
| `newItem` | `DataTableNewItemConfig?` | Config del botón "Nuevo" |
| `deleteDialog` | `DataTableDeleteDialogConfig?` | Config del diálogo de confirmación |
| `...rest` | resto de `DataGridProps` | Se pasan directo al `DataGrid` de MUI X |

**Todo es opcional excepto `rows`/`columns`:** si no pasás `title`, `search`, `newItem` o `deleteDialog`, esos sub-componentes simplemente no se renderizan (cada uno tiene su propio early return).

---

### 2.2 `DataTableHeader`

Combina el título de la tabla con la toolbar (búsqueda + botón nuevo).

```tsx
const DataTableHeader = ({ title, search, newItem }: DataTableHeaderProps): React.ReactNode => {
    if (!title && !search && !newItem) return null;

    return (
        <Box component="header" sx={{ width: "100%", display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 3 }}>
            {title && (
                <Typography
                    component="h2"
                    title={title}
                    sx={{ fontSize: theme.typography.h2.fontSize, fontWeight: 700, color: theme.custom.white, maxWidth: {...}, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                    {title}
                </Typography>
            )}
            <DataTableToolbar search={search} newItem={newItem} />
        </Box>
    );
};
```

**Puntos clave:**
- `component="header"` marca semánticamente esta zona como encabezado de la sección de tabla.
- `component="h2"` en el `Typography`: el título de la tabla es un heading real, no un párrafo — importante para la navegación por headings que hacen los lectores de pantalla.
- **Truncado por CSS, no por JS:** el texto se corta visualmente con `text-overflow: ellipsis` + `overflow: hidden` + `whiteSpace: nowrap`, en vez de recortar el string (`title.slice(0, 11)`). Esto es crítico: si truncás el string real, un lector de pantalla escucha el texto cortado ("Presentacion...") en vez del título completo. Con CSS, el DOM conserva el texto íntegro y solo se recorta la representación visual.
- `title={title}` (atributo HTML nativo) agrega un tooltip nativo del navegador al pasar el mouse, mostrando el texto completo si está truncado visualmente.
- Layout responsive: en `xs` el título y la toolbar se apilan (`flexDirection: column`), en `sm+` van en fila.

---

### 2.3 `DataTableToolbar`

Arma la barra de búsqueda + el botón de "nuevo registro". Ambos son opcionales e independientes entre sí.

```tsx
const DataTableToolbar = ({ search, newItem }: DataTableToolbarProps): React.ReactNode => {
    if (!search && !newItem) return null;

    return (
        <Box sx={{ width: "100%", display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
            {search && <SearchBar value={search.value} onChange={search.onChange} placeholder={search.placeholder} />}
            {newItem && (
                <Button onClick={newItem.onClick} href={newItem.href} startIcon={<AddIcon />} sx={{...}}>
                    {newItem.label ?? "Nuevo"}
                </Button>
            )}
        </Box>
    );
};
```

**Tipos de configuración:**

```ts
interface DataTableSearchConfig {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

interface DataTableNewItemConfig {
    label?: string;
    href?: string;
    onClick?: () => void;
}
```

El botón "Nuevo" soporta tanto navegación directa (`href`, para links tipo `<a>`) como manejo custom (`onClick`) — se pueden usar ambos o solo uno, según el caso.

---

### 2.4 `DataTableErrorAlert`

Muestra un `Alert` de error solo si `error` tiene contenido.

```tsx
const DataTableErrorAlert = ({ error, onClose }: DataTableErrorAlertProps): React.ReactNode => {
    if (!error) return null;
    return (
        <Alert severity="error" sx={{ mb: 2, width: "100%" }} onClose={onClose} closeText="Cerrar">
            {error}
        </Alert>
    );
};
```

`Alert` de MUI ya agrega `role="alert"` automáticamente — esto hace que el lector de pantalla interrumpa lo que esté leyendo para anunciar el error (comportamiento correcto para mensajes urgentes, a diferencia de un `role="status"` que no interrumpe). `closeText="Cerrar"` asegura que el botón de cierre tenga su `aria-label` en español en vez del "Close" en inglés que trae por defecto.

---

### 2.5 `DataTableDeleteDialog`

Wrapper del `ConfirmDialog` genérico, específico para el flujo de borrado de una fila.

```tsx
const DataTableDeleteDialog = ({ config }: DataTableDeleteDialogProps): React.ReactNode => {
    if (!config) return null;
    return (
        <ConfirmDialog
            open={config.open}
            title={config.title ?? "Confirmar eliminación"}
            description={config.description}
            warningText={config.warningText}
            confirmLabel={config.confirmLabel ?? "Eliminar"}
            cancelLabel={config.cancelLabel ?? "Cancelar"}
            onConfirm={config.onConfirm}
            onCancel={config.onCancel}
        />
    );
};
```

**Config esperada (`DataTableDeleteDialogConfig`):**

| Campo | Tipo | Obligatorio | Default |
|---|---|---|---|
| `open` | `boolean` | Sí | — |
| `description` | `ReactNode` | Sí | — |
| `title` | `string?` | No | "Confirmar eliminación" |
| `warningText` | `string?` | No | (no se muestra la caja de warning si falta) |
| `confirmLabel` | `string?` | No | "Eliminar" |
| `cancelLabel` | `string?` | No | "Cancelar" |
| `onConfirm` | `() => void` | Sí | — |
| `onCancel` | `() => void` | Sí | — |

**Importante:** `warningText` es opcional a propósito — si no se pasa, `ConfirmDialog` no renderiza la caja de advertencia inferior. Esto replica el comportamiento que tenían los diálogos originales por entidad: por ejemplo, `ProductDeleteDialog` sí tenía `warningText` (menciona que también se borran presentaciones y stock), mientras que `PresentationDeleteDialog` no lo tenía. Al migrar a `DataTable`, cada página define su propio texto de `description`/`warningText` en la config, preservando el comportamiento específico de cada entidad sin necesidad de un componente de diálogo separado por cada una.

---

### 2.6 `GenericDataGrid`

Wrapper de `DataGrid` de `@mui/x-data-grid`, con overlays de carga y "sin datos" ya resueltos.

```tsx
function GenericDataGrid<T extends { _id: string }>({
    rows, columns, height = 720, emptyMessage = "No hay registros", loading, ...rest
}: GenericDataGridProps<T>): React.ReactNode {
    return (
        <Box sx={{ height, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => (row as T)._id}
                loading={loading}
                pageSizeOptions={[10, 25, 50]}
                initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                disableRowSelectionOnClick
                slots={{
                    loadingOverlay: () => (
                        <Box role="status" sx={{...}}>
                            <CircularProgress aria-label="Cargando registros" />
                        </Box>
                    ),
                    noRowsOverlay: () => (
                        <Box sx={{...}}><Typography color="text.secondary">{emptyMessage}</Typography></Box>
                    ),
                    ...rest.slots,
                }}
                sx={{...}}
                {...rest}
            />
        </Box>
    );
}
```

**Puntos clave:**
- `getRowId={(row) => row._id}`: por eso el genérico exige `T extends { _id: string }` — así cualquier entidad de Mongo (que siempre tiene `_id`) funciona sin configuración adicional.
- Paginación por default: 10/25/50 filas por página, empezando en 10.
- `disableRowSelectionOnClick`: clickear una fila no la selecciona (comportamiento pensado para grids donde las acciones están en una columna de botones, no en selección de fila).
- **Overlay de carga con accesibilidad:** `role="status"` en el contenedor (anuncia el cambio sin interrumpir al lector de pantalla) + `aria-label="Cargando registros"` en el `CircularProgress` (sin esto, el lector de pantalla solo diría "progressbar" sin contexto).
- Los `slots` y `sx` pasados por `...rest` se combinan con los defaults (spread al final), permitiendo sobreescribir cualquier comportamiento puntual desde la página que consume `DataTable`.

---

### 2.7 `RowActionsCell`

Celda reutilizable para mostrar botones de acción por fila (ver, editar, eliminar, ver presentaciones, etc.). Se usa dentro de la definición de columnas (`buildColumns`) de cada entidad.

```tsx
const RowActionsCell = ({ onView, onEdit, onDelete, onPresentations }: RowActionsCellProps): React.ReactNode => (
    <Box role="group" aria-label="Acciones de la fila" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {onPresentations && (
            <Tooltip title="Ver presentaciones">
                <IconButton size="small" color="success" onClick={onPresentations} aria-label="Ver presentaciones">
                    <CookieIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )}
        {onView && (
            <Tooltip title="Ver detalle">
                <IconButton size="small" color="info" onClick={onView} aria-label="Ver detalle">
                    <VisibilityOutlinedIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )}
        {onEdit && (
            <Tooltip title="Editar">
                <IconButton size="small" color="warning" onClick={onEdit} aria-label="Editar">
                    <EditOutlinedIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )}
        {onDelete && (
            <Tooltip title="Eliminar">
                <IconButton size="small" color="error" onClick={onDelete} aria-label="Eliminar">
                    <DeleteOutlineIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        )}
    </Box>
);
```

**Cada acción es opcional e independiente:** una columna de acciones puede tener solo `onDelete`, o los cuatro handlers, según lo que necesite la entidad.

**Accesibilidad:** cada `IconButton` tiene `aria-label` explícito (el ícono solo, sin esto, no tiene nombre accesible — un lector de pantalla anunciaría solo "button" sin decir qué hace). El `Tooltip` es un complemento visual para usuarios videntes, pero no reemplaza al `aria-label`. El contenedor tiene `role="group"` con `aria-label="Acciones de la fila"` para agrupar semánticamente el conjunto de botones.

**Nota de mejora futura:** si se dispone del nombre/id de la fila en el momento de construir las columnas, conviene pasar `aria-label={`Eliminar ${itemName}`}` en vez de un label genérico fijo, para que el lector de pantalla distinga entre "Eliminar Producto A" y "Eliminar Producto B" al navegar la tabla fila por fila.

---

### 2.8 `GenericListCell`

Celda reutilizable para mostrar una lista de elementos relacionados (por ejemplo, las presentaciones de un producto) con overflow controlado: muestra el primero y un contador "+N más" con tooltip.

```tsx
function GenericListCell<T>({ items, emptyLabel, getLabel, getTooltipLine, getKey }: GenericCellProps<T>): React.ReactNode {
    if (!items.length) {
        return <Typography variant="body2" color="text.disabled">{emptyLabel}</Typography>;
    }

    const [first, ...rest] = items;
    const label = getLabel(first);
    const fullListLabel = items.map((item) => getTooltipLine(item)).join(", ");

    return (
        <Tooltip title={<Stack spacing={0.5}>{items.map((item, i) => <Typography key={getKey(item, i)} variant="caption">{getTooltipLine(item)}</Typography>)}</Stack>} arrow placement="top">
            <Box tabIndex={0} role="button" aria-label={fullListLabel} sx={{ cursor: "default", "&:focus-visible": {...} }}>
                <Typography variant="body2">
                    {label}
                    {rest.length > 0 && <Typography component="span" variant="caption" color="text.secondary">+{rest.length} más</Typography>}
                </Typography>
            </Box>
        </Tooltip>
    );
}
```

**Props (`GenericCellProps<T>`):**

| Prop | Tipo | Descripción |
|---|---|---|
| `items` | `T[]` | Array de elementos a mostrar |
| `emptyLabel` | `string` | Texto cuando `items` está vacío |
| `getLabel` | `(item: T) => string` | Texto principal del primer elemento |
| `getTooltipLine` | `(item: T) => string` | Texto de cada línea dentro del tooltip |
| `getKey` | `(item: T, i: number) => string` | Key de React para cada línea del tooltip |

**Es genérico (`<T>`)** porque no está atado a ninguna entidad — sirve tanto para mostrar presentaciones de un producto, como categorías, tags, o cualquier lista corta relacionada a una fila.

**Accesibilidad — el punto más importante de este componente:** el `Tooltip` envuelve un `Box` (`div`), que por defecto **no es focuseable por teclado**. Sin `tabIndex={0}`, un usuario que navega con `Tab` nunca puede activar el tooltip — la información de "+N más" queda inaccesible sin mouse. Con `tabIndex={0}` + `role="button"`, el `Tooltip` de MUI detecta el foco (además del hover) y se muestra igual. El `aria-label={fullListLabel}` es el fallback: contiene la lista completa como texto plano, para que un lector de pantalla la anuncie de una vez sin depender de que el tooltip visual se dispare. El `&:focus-visible` con outline visible asegura que un usuario de teclado vea claramente dónde está parado.

---

### 2.9 Tipos relevantes (`@typings/ui/dataTable.types.ts`)

```ts
interface DataTableSearchConfig {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

interface DataTableNewItemConfig {
    label?: string;
    href?: string;
    onClick?: () => void;
}

interface DataTableDeleteDialogConfig {
    open: boolean;
    title?: string;
    description: ReactNode;
    warningText?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

interface DataTableProps<T extends { _id: string }> extends Omit<DataGridProps, "rows" | "columns" | "getRowId" | "loading"> {
    rows: T[];
    columns: GridColDef[];
    loading?: boolean;
    error?: string | null;
    onClearError?: () => void;
    emptyMessage?: string;
    height?: number | string;
    title?: string;
    search?: DataTableSearchConfig;
    newItem?: DataTableNewItemConfig;
    deleteDialog?: DataTableDeleteDialogConfig;
}
```

---

### 2.10 Caso de uso completo — `ProductsListPage`

```tsx
const ProductsListPage = (): React.ReactNode => {
    const navigate = useNavigate();
    const {
        productsWithPresentations, loading, error, deleteDialog,
        clearError, handleDeleteRequest, handleDeleteCancel, handleDeleteConfirm,
        searchTerm, setSearchTerm,
    } = useProductsList();

    const columns = buildColumns({ onDeleteRequest: handleDeleteRequest, navigate });

    return (
        <AppLayout fullWidth title="Productos" icon={<StorefrontIcon />}>
            <DataTable<Product>
                rows={productsWithPresentations}
                columns={columns}
                loading={loading}
                error={error}
                onClearError={clearError}
                emptyMessage="No hay productos registrados"
                title="Listado de productos"
                search={{ value: searchTerm, onChange: setSearchTerm, placeholder: "Azucar 600gr..." }}
                newItem={{ label: "Nuevo producto", href: "/products-create" }}
                deleteDialog={{
                    open: deleteDialog.open,
                    description: <>¿Estás seguro de que querés eliminar el producto <strong>{deleteDialog.name}</strong>? Esta acción no se puede deshacer. También se eliminarán sus presentaciones y stock asociado.</>,
                    warningText: "Esta acción eliminará el producto de forma permanente.",
                    onConfirm: () => void handleDeleteConfirm(),
                    onCancel: handleDeleteCancel,
                }}
            />
        </AppLayout>
    );
};
```

Notar que `AppLayout` quedó completamente libre de props relacionadas a búsqueda o grid — solo recibe `title`/`icon`/`fullWidth`, que son responsabilidades propias del layout general de la página.

---

### 2.11 Extensión / mantenimiento futuro

- **Nueva entidad con listado:** solo hace falta un hook tipo `useXxxList` (siguiendo el patrón de `useProductsList`/`usePresentations`) y un `buildColumns` propio — la página en sí queda como un simple `<AppLayout><DataTable {...} /></AppLayout>`.
- **Columnas con listas relacionadas:** usar `GenericListCell` en vez de crear una celda custom por entidad.
- **Columnas con acciones:** usar `RowActionsCell`, pasando solo los handlers que aplican a esa entidad (el resto se omite y esa acción no se muestra).
- **Diálogo de borrado con texto especial:** no requiere crear un componente nuevo — toda la personalización se hace vía la prop `deleteDialog` (título, descripción, warning, labels de botones).
- **Si se necesita un nuevo dato en el header** (por ejemplo un contador "48 productos" al lado del título), el lugar natural es extender `DataTableHeaderProps` y ajustar `DataTableHeader`, manteniendo la misma estructura de `component="header"` + heading semántico.