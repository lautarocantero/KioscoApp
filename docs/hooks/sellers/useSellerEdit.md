# 🪝 `useSellerEdit`

> Hook de React para manejar el envío del formulario de edición de vendedor: guarda el nombre siempre, y el rol solo si quien edita es admin y el rol cambió.

## 🎯 ¿Para qué sirve?

Centraliza el submit del form de `SellerForm` (modo Editar): carga el
vendedor por `seller_id` de la URL, arma y despacha los requests
correctos según qué cambió, maneja `isSubmitting`/`submitError` y navega
a `/sellers` al terminar.

El dato clave que resuelve este hook: **nombre y rol viven en recursos
distintos del backend** (`Seller` y `Auth` respectivamente), así que un
"Guardar" en la UI puede terminar en 1 o 2 requests según el caso. Ver
[docs/features/sellerRoleAndAccountDeletion.md](../../features/sellerRoleAndAccountDeletion.md)
para el detalle completo (incluye backend).

## 📦 Firma

```ts
useSellerEdit(): {
  editingSeller: SellerWithRole | null;
  isLoadingSeller: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  handleEdit: (values: Pick<SellerFormValues, "name" | "rol">) => Promise<void>;
}
```

- No recibe parámetros — lee `seller_id` de `useParams()`.
- `handleEdit` es el `onSubmit` que se le pasa a `<Formik>`.

## 💡 Ejemplo

```tsx
import { Formik } from "formik";
import { useSellerEdit } from "../../hooks/sellers/useSellersForm";
import { getSellerEditInitialValues, sellerEditFormSchema } from "../../modules/sellers/schema/SellerFormSchema";

function SellerEditForm() {
  const { editingSeller, isLoadingSeller, isSubmitting, submitError, handleEdit } = useSellerEdit();

  if (isLoadingSeller) return <SellerSkeleton />;

  return (
    <Formik
      initialValues={getSellerEditInitialValues(editingSeller)}
      validationSchema={sellerEditFormSchema}
      onSubmit={handleEdit}
    >
      {/* name, email (solo display), rol — el select de rol viene
          disabled si quien edita no es admin (ver SellerFormFirstStep) */}
    </Formik>
  );
}
```

## ⚙️ Comportamiento de `handleEdit`

```
1. PUT /seller/edit-seller { _id, name }                         → siempre
2. si isAdmin && activeKiosco && values.rol !== editingSeller.role:
     PUT /kiosco/:kioscoId/member/:sellerId/role { role }        → solo si cambió
3. navigate("/sellers")
```

`isAdmin` sale de [`useActiveKiosco()`](../kiosco/useActiveKiosco.md) — es
el rol del usuario logueado **en el kiosco activo**, no el vendedor que se
está editando ni un rol global. El paso 2 despacha
`updateKioscoMemberRoleThunk(activeKiosco._id, sellerId, values.rol)`
(`store/kiosco/kioscoThunks.ts`), que reemplazó al viejo
`startEditAuthRole` cuando el rol se movió de `Auth` a `KioscoMembership`
(ver [docs/store/auth.md](../../store/auth.md)). El backend igual valida
esto de nuevo con un 403 si alguien lo saltea desde afuera de la UI — este
hook no es la única barrera.

Si el paso 1 o el paso 2 fallan, no se navega y `submitError` queda
seteado con el mensaje parseado por `useErrorParser`.

## ✨ Beneficios

- 🔐 **El componente no sabe que hay dos recursos backend distintos** —
  solo le pasa `{ name, rol }` a `handleEdit` y listo.
- 🧭 **No dispara requests de más**: si el rol no cambió, no hay segunda
  llamada.
- 🚦 **`isSubmitting`/`submitError` unificados** para ambos pasos, así el
  form solo necesita un estado de carga y un mensaje de error.
