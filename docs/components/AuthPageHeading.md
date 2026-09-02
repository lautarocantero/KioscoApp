# 🧩 `AuthPageHeading`

> Encabezado de las pantallas de login/registro: etiqueta superior (eyebrow) en violeta + `h1` con el título de la pantalla + línea divisoria. Reemplaza al antiguo wordmark "Stocko" como `h1` de cada página (ese wordmark ahora vive en `AuthBrandPanel`).

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `eyebrow` | `string` | Etiqueta corta en mayúsculas sobre el título (ej. "Iniciar sesión", "Registro"). |
| `title` | `string` | Título principal de la pantalla, renderizado como `h1`. |

## 💡 Ejemplo

```tsx
<AuthPageHeading eyebrow="Iniciar sesión" title="Bienvenido de nuevo" />
```

## ✨ Notas

- Al mover el `h1` de cada página a este componente, cada pantalla de auth tiene un único encabezado semánticamente correcto (antes todas compartían el mismo `h1` "Stocko").
- Usado por `LoginPage` y `RegisterPage`.
