# 🪝 `usePresentationsListData`

> Hook de React para listar las presentaciones de un producto, con búsqueda debounced y sin mostrar datos de un producto anterior.

########################################### 🎯 ¿Para qué sirve? ################################################################################

Centraliza el fetch y la búsqueda de presentaciones de un producto: lee `presentations` / `isLoading` / `errorMessage` desde Redux, y separa dos comportamientos distintos:

- Al **cambiar de producto**, limpia el store y hace el fetch de inmediato.
- Al **tipear en el buscador**, debouncea antes de pegarle al backend.

Esta separación es la que evita el "flash" del listado anterior: como el fetch por cambio de producto no espera ningún debounce, el store se limpia y se vuelve a cargar en el mismo ciclo en que cambia el `productId`, así que nunca queda una ventana de tiempo en la que se muestran filas de otro producto.

############################################ 📦 Firma  ################################################################################

```ts
usePresentationsListData(productId: string | undefined): UsePresentationsListDataResult
```

- **`productId`** — id del producto cuyas presentaciones se quieren listar.
- Devuelve `presentations`, `loading`, `error`, `searchTerm` y `setSearchTerm`.

############################################ ⚙️ Cómo funciona  ################################################################################

El hook usa **dos efectos independientes**, cada uno con una sola responsabilidad:

1. **Efecto de cambio de producto** (`[productId, dispatch]`)
   Se dispara cuando entrás a una presentación o navegás a otra. En el mismo ciclo:
   - Cancela cualquier búsqueda debounced que hubiera quedado pendiente del producto anterior.
   - Limpia el store con `resetPresentations()`, así el listado viejo desaparece de inmediato en vez de quedar visible hasta que llegue la respuesta nueva.
   - Resetea `searchTerm` a `""`.
   - Dispara `fetchPresentationsByProductId(productId)` sin debounce.

2. **Efecto de búsqueda** (`[searchTerm]`)
   Se dispara cuando el usuario tipea en el buscador. Debouncea 350ms antes de despachar `fetchPresentationsByProductId` (si el término está vacío) o `searchPresentationsByProductId` (si hay texto).

Un flag interno (`skipNextSearchEffectRef`) coordina ambos efectos: cuando el efecto de cambio de producto resetea `searchTerm` a `""`, el efecto de búsqueda detecta que ese reset no vino de un tipeo real del usuario y se saltea ese ciclo, evitando un segundo fetch redundante 350ms después del que ya se hizo de forma inmediata.

############################################ 💡 Ejemplo  ################################################################################

```tsx
import { usePresentationsListData } from "../../hooks/presentations/usePresentationsListData";

function PresentationsList({ productId }) {
  const { presentations, loading, error, searchTerm, setSearchTerm } =
    usePresentationsListData(productId);

  return (
    <section>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="600gr, pack x6..."
      />
      {loading && <p>Cargando presentaciones...</p>}
      {error && <p>{error}</p>}
      {!loading && presentations.map((p) => <div key={p._id}>{p.name}</div>)}
    </section>
  );
}
```
############################################ ✨ Beneficios  ################################################################################

- 🚫 **Sin flash de datos de otro producto**: el store se limpia en el mismo ciclo en que cambia `productId`, antes de que el fetch nuevo resuelva.
- ⚡ **Fetch inmediato en la navegación**: solo la búsqueda por texto tiene debounce, no el cambio de producto.
- 🧹 **Sin fetches redundantes**: el flag de coordinación evita que el reset de `searchTerm` dispare una llamada extra al backend.
- 🔄 **Sincronizado con Redux**: `presentations`, `loading` y `error` siempre reflejan el producto actualmente activo.