# Guía de Convenciones del Proyecto

> Este documento define las reglas obligatorias para generar o modificar código en este proyecto.
> Debe leerse y aplicarse antes de crear cualquier archivo, componente, hook o helper.

---

## 1. Atomicidad de archivos

- Cada archivo debe tener **una única responsabilidad**.
- No mezclar componentes, hooks, helpers, tipos o constantes en un mismo archivo.
- Si un archivo empieza a resolver más de una cosa, se debe dividir.

---

## 2. Tipos, interfaces, props y enums

- **Nunca** declarar `interface`, `type` o `enum` dentro de archivos `.tsx` o `.ts` de lógica/presentación.
- Toda definición de tipos vive en una carpeta `typings/`, separada en **exactamente 3 archivos**:
  - `typings/types.ts` → todos los `type`.
  - `typings/props.ts` → props de componentes React (`ComponentNameProps`).
  - `typings/enums.ts` → todos los `enum`.
- Toda interface/type que se pueda derivar de otra debe usar `extends`, `Pick` o `Omit` en lugar de redefinir campos.

```ts
// typings/props.ts
export interface UserCardProps extends Pick<UserTypes, 'name' | 'avatarUrl'> {
  onSelect: () => void;
}
```

---

## 3. Funciones y early return

- Toda función (helpers, hooks, handlers, utils) debe usar **early return**.
- Evitar `if/else` anidados; se retorna temprano ante condiciones inválidas o casos base.

```ts
// ❌ Evitar
function getDiscount(user) {
  if (user) {
    if (user.isPremium) {
      return 0.2;
    } else {
      return 0;
    }
  }
  return 0;
}

// ✅ Correcto
function getDiscount(user) {
  if (!user) return 0;
  if (!user.isPremium) return 0;
  return 0.2;
}
```

---

## 4. Theming

- Usar únicamente los colores, espaciados y tokens definidos en el theme del proyecto.
- Prohibido inventar valores de color, hex codes o tokens ad-hoc.
- Si un valor necesario no existe en el theme, se debe señalar como pendiente en vez de inventarlo.

---

## 5. Componentes `.tsx`: solo presentación

- Ningún archivo `.tsx` debe contener lógica de negocio, cálculos, transformaciones de datos ni llamadas a servicios.
- Toda esa lógica debe vivir en:
  - `hooks/` (estado, efectos, orquestación)
  - `helpers/` (funciones puras)
  - `handlers/` (manejadores de eventos)
- El `.tsx` solo debe:
  - Recibir props.
  - Renderizar UI.
  - Invocar funciones ya resueltas por hooks/helpers/handlers.

### Excepción: renderizado condicional

- La lógica de **cuándo mostrar u ocultar** un componente (condicionales de render tipo `if (!data) return null`) **sí puede** vivir en el propio `.tsx`.
- Lo que **no puede** vivir ahí es lógica de negocio o cálculos que determinen esa condición (esos cálculos deben resolverse en un hook/helper y llegar ya como boolean/dato listo).

```tsx
// ✅ Correcto: la condición vive en el tsx, el cálculo no
export const OrderSummary = ({ order }: OrderSummaryProps) => {
  const { hasItems } = useOrderSummary(order); // cálculo resuelto en hook

  if (!hasItems) return null;

  return <div>{/* ... */}</div>;
};
```

---

## 6. Revisión previa antes de escribir código

- Antes de crear o modificar cualquier archivo, revisar lo que ya existe en el proyecto:
  - `context/` (contextos de React ya definidos)
  - `store/` (estado global)
  - `slice/` (slices del store)
  - carpeta de `apis`/`services` (llamadas existentes)
- No duplicar lógica, estado o llamadas que ya estén resueltas en alguno de esos lugares.

---

## 7. Prohibido usar barrel files / `index.ts` de exports

- No crear archivos `index.ts` que solo re-exporten contenido de otros archivos.
- Cada import debe apuntar directamente al archivo real (ej. `@/hooks/useUserCard` y no `@/hooks`).

---

## 8. Loaders y manejo de errores

- Toda funcionalidad nueva que involucre datos asíncronos (fetch, mutación, etc.) debe incluir:
  - Un **estado de carga (loader)** propio.
  - Un **`handleError`** que capture el fallo y muestre al usuario un mensaje claro de qué falló (toast, mensaje inline, etc., según el patrón del proyecto).
- No dejar promesas o llamadas sin manejo de error.

---

## 9. Validación de datos

- Toda entrada externa (formularios, respuestas de API, query params) debe validarse con **Zod** o **Yup** antes de usarse en la UI o lógica de negocio.
- No confiar en el tipado de TypeScript como única validación en tiempo de ejecución.

---

## 10. Estados de carga: Skeletons

- Mientras un dato esté cargando, mostrar un **skeleton** acorde al layout final del componente, no un spinner genérico salvo que el patrón del proyecto lo indique.

---

## 11. Accesibilidad

- Agregar atributos de accesibilidad (`aria-*`, `role`, `alt`, labels asociados a inputs, foco visible, navegación por teclado) en todo elemento interactivo o informativo que lo requiera.
- No omitir accesibilidad "porque es un detalle menor": es parte obligatoria del componente.

---

## 12. HTML semántico

- Cada componente debe usar la etiqueta HTML semántica que le corresponde según su función (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `h1`-`h6`, etc.) en vez de abusar de `div`.
- Esto aplica tanto por accesibilidad como por SEO.

---

## 13. Lazy loading

- Aplicar `lazy`/`Suspense` (o el mecanismo del framework del proyecto) en rutas, modales, y componentes pesados que no sean necesarios en el primer render.

---

## 14. ESLint y tipado estricto

- El código debe pasar las reglas de ESLint del proyecto sin warnings ni errores.
- **Nunca** usar `any`. Si el tipo es incierto, definirlo explícitamente en `typings/` (usando `unknown` + narrowing si aplica).
- Toda prop, parámetro o valor tipado debe usar las interfaces/types definidos en `typings/`, nunca tipos inline ni redefinidos localmente.

---

## 15. Tests y documentación

- Todo archivo creado (componente, hook, helper, handler) debe incluir:
  - **Test** correspondiente en la carpeta de tests asignada del proyecto.
  - **Documentación** breve en la carpeta de documentación asignada, explicando propósito, props/params y ejemplo de uso.

---

## 16. Checklist antes de dar por terminado un cambio

- [ ] ¿Revisé `context/`, `store/`, `slice/` y `apis` existentes antes de crear algo nuevo?
- [ ] ¿Cada archivo nuevo tiene una sola responsabilidad?
- [ ] ¿Evité crear `index.ts` de barrel exports?
- [ ] ¿Los tipos/interfaces/props/enums están en `typings/` y no en `.tsx`/`.ts` de lógica?
- [ ] ¿Se usó `extends`/`Pick`/`Omit` donde era posible?
- [ ] ¿Todas las funciones usan early return?
- [ ] ¿Se usaron solo colores/tokens del theme del proyecto?
- [ ] ¿Los `.tsx` están libres de lógica de negocio (salvo condicionales de render)?
- [ ] ¿Cada dato asíncrono tiene loader y `handleError`?
- [ ] ¿Los datos externos se validan con Zod/Yup?
- [ ] ¿Se usa skeleton mientras carga, en vez de spinner genérico?
- [ ] ¿Se agregó accesibilidad (`aria-*`, roles, labels, foco)?
- [ ] ¿Se usó la etiqueta HTML semántica correcta?
- [ ] ¿Se aplicó lazy loading donde correspondía?
- [ ] ¿El código pasa ESLint sin warnings?
- [ ] ¿Se evitó `any` en todo el código?
- [ ] ¿Se agregaron tests?
- [ ] ¿Se agregó documentación?
