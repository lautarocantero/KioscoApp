# 🪝 `useCardCarousel`

> Hook de React para manejar la navegación y comportamiento de un carrusel de tarjetas.

## 🎯 ¿Para qué sirve?

Controla el índice activo, la interacción por arrastre, el tamaño de las cards y la visibilidad de flechas en un carrusel responsivo.

## 📦 Firma

```ts
useCardCarousel(params: UseCardCarouselParams)
```

- **`items`** — arreglo de cards con ancho opcional.
- **`defaultCardWidth`** — ancho por defecto para cada card.
- **`gap`** — separación entre cards.
- **`activeIndex`** — índice controlado opcional.
- **`onIndexChange`** — callback cuando cambia el índice.
- **`hintText`** — texto de ayuda para la interacción.
- **`showArrows`** — si muestra flechas en desktop.
- Devuelve índices, offsets, control de arrastre, y un flag para mostrar flechas.

## 💡 Ejemplo

```tsx
import { useCardCarousel } from "../../hooks/ui/useCardCarousel";

function CardsCarousel({ items }) {
  const { activeIndex, translateX, goTo, handlePointerDown, handlePointerMove, handlePointerUp } =
    useCardCarousel({ items });

  return (
    <div onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
      <div style={{ transform: `translateX(${translateX}px)` }}>
        {items.map((item, index) => (
          <div key={index}>{item.content}</div>
        ))}
      </div>
      <button onClick={() => goTo(activeIndex - 1)}>Anterior</button>
      <button onClick={() => goTo(activeIndex + 1)}>Siguiente</button>
    </div>
  );
}
```

## ✨ Beneficios

- 🌀 **Abstrae la lógica del carrusel** y el arrastre.
- 📐 **Ajusta anchos y gaps responsivos automáticamente**.
- 👇 **Soporta control de índice externo**.
- ✅ **Maneja la visibilidad de flechas según el tamaño**.
