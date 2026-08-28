# ProductItemAvatar — Documentación

## ¿Para qué sirve?

Avatar de 38px con la inicial del producto (tinte violeta derivado del theme). Reemplaza la imagen grande de fondo que tenía la card del catálogo — con presentaciones inline no entra una imagen de portada.

## Props (`ProductItemAvatarProps`)

```ts
interface ProductItemAvatarProps {
  name: string | undefined;
  onClick?: () => void;
}
```

Sin `onClick` es puramente decorativo (`cursor: default`, sin `role="button"`).

## Ejemplo de uso

```tsx
<ProductItemAvatar name={product.name} onClick={handleSelect} />
```
