# `getInitials`

Función pura que devuelve las iniciales de un nombre (hasta 2 letras).

## Para qué sirve

`SidebarKioscoSwitcher` la usa para mostrar las iniciales del kiosco activo en el riel cuando no hay un logo que mostrar.

## Firma

```ts
getInitials(name: string): string
```

## Ejemplo

```ts
getInitials("Kiosco Centro"); // "KC"
getInitials("Kiosco");        // "KI"
getInitials("");              // ""
```
