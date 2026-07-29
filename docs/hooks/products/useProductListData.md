# 🪝 `useProductsListData`

> Hook de React para listar productos (con o sin stock), con búsqueda debounced y sin mostrar el estado "vacío" antes de que termine de cargar.

########################################### 🎯 ¿Para qué sirve? ################################################################################

Centraliza el fetch y la búsqueda de productos: lee `products` / `isLoading` / `errorMessage` desde Redux, y separa dos comportamientos distintos:

- Al **montar** (o cambiar `selectedCategory` / `stockAvailable`), hace el fetch de inmediato.
- Al **tipear en el buscador**, debouncea antes de pegarle al backend.

Esta separación es la que evita el "flash" de vacío: como el fetch inicial no espera ningún debounce, `loading` pasa a `true` en el mismo ciclo en que se monta el hook (o cambia la categoría/`stockAvailable`), así que nunca queda una ventana de tiempo en la que `products` está vacío y `loading` en `false` a la vez — que es justo la combinación que hace que un listado se pinte como "vacío" antes de haber empezado a cargar.

############################################ 📦 Firma  ################################################################################

```ts
useProductsListData(
  selectedCategory?: PresentationCategory | null,
  stockAvailable?: boolean
): UseProductsListDataResult
```

- **`selectedCategory`** — categoría por la que filtrar (opcional, `null` por defecto).
- **`stockAvailable`** — si es `true` y no hay búsqueda activa, trae solo productos con stock (`getProductsWithStock`) en vez de todos (`getProducts`).
- Devuelve `products`, `loading`, `error`, `searchTerm` y `setSearchTerm`.

############################################ ⚙️ Cómo funciona  ################################################################################

El hook usa **dos efectos independientes**, cada uno con una sola responsabilidad:

1. **Efecto de fetch inmediato** (`[selectedCategory, stockAvailable, dispatch]`)
   Se dispara al montar el hook y cada vez que cambia `selectedCategory` o `stockAvailable`. En el mismo ciclo:
   - Cancela cualquier búsqueda debounced que hubiera quedado pendiente.
   - Decide qué traer según el estado actual: `searchProducts` si hay categoría o texto activo, `getProductsWithStock` si se pidió `stockAvailable`, o `getProducts` en el resto de los casos.
   - Despacha esa acción sin debounce, para que `loading` se ponga en `true` de inmediato.

2. **Efecto de búsqueda** (`[searchTerm]`)
   Se dispara cuando el usuario tipea en el buscador. Debouncea 350ms antes de despachar `searchProducts` (con categoría, si hay), `getProductsWithStock` o `getProducts`, según corresponda.

Un flag interno (`skipNextSearchEffectRef`) coordina ambos efectos: cuando el efecto de fetch inmediato corre (por mount o cambio de categoría/`stockAvailable`), marca ese ciclo para que el efecto de búsqueda se lo saltee, evitando un segundo fetch redundante 350ms después del que ya se hizo de forma inmediata.

############################################ 💡 Ejemplo  ################################################################################

```tsx
import { useProductsListData } from "../../hooks/products/useProductsListData";

function ProductsList() {
  const { products, loading, error, searchTerm, setSearchTerm } =
    useProductsListData(null, true);

  return (
    <section>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar producto..."
      />
      {loading && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}
      {!loading && products.length === 0 && <p>No hay productos</p>}
      {!loading && products.map((p) => <div key={p._id}>{p.name}</div>)}
    </section>
  );
}
```
############################################ ✨ Beneficios  ################################################################################

- 🚫 **Sin flash de "vacío"**: `loading` pasa a `true` en el mismo ciclo en que se monta el hook o cambia `selectedCategory`/`stockAvailable`, antes de que se llegue a evaluar si el listado está vacío.
- ⚡ **Fetch inmediato al montar/filtrar**: solo la búsqueda por texto tiene debounce, no la carga inicial ni el cambio de categoría o de `stockAvailable`.
- 🧹 **Sin fetches redundantes**: el flag de coordinación evita que el fetch inmediato dispare, 350ms después, una segunda llamada innecesaria desde el efecto de búsqueda.
- 🔄 **Sincronizado con Redux**: `products`, `loading` y `error` siempre reflejan el filtro (`selectedCategory`/`stockAvailable`) actualmente activo.