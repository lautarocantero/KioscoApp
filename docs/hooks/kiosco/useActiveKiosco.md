# 🪝 `useActiveKiosco`

> Hook de React que resuelve el kiosco en el que el usuario está trabajando ahora mismo.

## 🎯 ¿Para qué sirve?

Único punto de verdad para "¿cuál es mi kiosco activo, y soy admin ahí?". Cruza `activeKioscoId` contra la lista `myKioscos` ya cargada en el store — no dispara ningún request.

## 📦 Firma

```ts
useActiveKiosco(): {
  activeKiosco: KioscoWithStats | null;
  isAdmin: boolean;
}
```

- No recibe parámetros.
- `activeKiosco` es `null` si `activeKioscoId` todavía no matchea ningún kiosco de `myKioscos` (por ejemplo, justo después del login, antes de que `fetchMyKioscosThunk` resuelva).
- `isAdmin` compara `activeKiosco?.role` contra `AuthRoleEnum.Admin` — es el rol de la membership en **este** kiosco, no un rol global (ver [docs/features/multiKiosco.md](../../features/multiKiosco.md)).

## 💡 Ejemplo

```ts
import { useActiveKiosco } from "../../hooks/kiosco/useActiveKiosco";

const { activeKiosco, isAdmin } = useActiveKiosco();
if (!activeKiosco) return null;
```

## 📍 Consumidores actuales

- `useIsActiveKioscoAdmin` — expone solo el booleano.
- `useKioscoInvite` — necesita el `_id` del kiosco activo para pedir el código de invitación.
- `useSellers`, `useSellerEdit` — gating de acciones admin-only.
- `ShopHeader` (vía `ShopPage`) — nombre del kiosco activo en el título.

## ✨ Beneficios

- 🧠 **Una sola fuente de verdad** para "kiosco activo" — evita que cada consumidor repita el `.find()` sobre `myKioscos`.
- ⚡ **Sin requests**: deriva de estado ya cargado, así que es seguro llamarlo desde cualquier componente sin preocuparse por N llamadas duplicadas.

## Tests

`src/hooks/kiosco/test/useActiveKiosco.test.ts`
