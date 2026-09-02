# `filterKioscosByQuery` — Documentación

## ¿Para qué sirve?

Función pura que filtra la lista de kioscos del buscador de `/select-kiosco`. Matchea la query contra "nombre + dirección" concatenados, sin distinguir mayúsculas/minúsculas.

## Firma

```ts
filterKioscosByQuery(kioscos: KioscoWithStats[], query: string): KioscoWithStats[]
```

- Query vacía (o solo espacios) → devuelve la lista sin tocar.
- No hay ningún match → devuelve `[]`.

## Dónde se usa

- `useKioscoSelector.ts` — calcula `filteredKioscos` a partir de `myKioscos` y el `query` del estado.

## Tests

`src/modules/kiosco/test/helpers/filterKioscosByQuery.test.ts`
