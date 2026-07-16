# 🪝 `useLinksData`

> Hook de React para preparar los datos de navegación de la página de inicio con las funciones de datos correspondientes.

## 🎯 ¿Para qué sirve?

Asocia las rutas del sidebar con hooks de datos específicos para cada sección, permitiendo construir los enlaces de navegación con la información necesaria desde el inicio.

## 📦 Firma

```ts
useHomePageLinks(): OptionLink[]
```

- No recibe parámetros.
- Devuelve un arreglo de enlaces enriquecidos con hook de datos según la URL.

## 💡 Ejemplo

```tsx
import { useHomePageLinks } from "../../hooks/shared/useLinksData";

function Sidebar() {
  const links = useHomePageLinks();

  return (
    <nav>
      {links.map((link) => (
        <a key={link.url} href={link.url}>{link.title}</a>
      ))}
    </nav>
  );
}
```

## ✨ Beneficios

- 🧩 **Centraliza la asociación de enlaces y datos**.
- 🔗 **Facilita construir el sidebar con información adicional**.
- ♻️ **Evita condicionales repetidos en componentes**.
- ✅ **Hace más claro qué hook de datos usa cada ruta.**
