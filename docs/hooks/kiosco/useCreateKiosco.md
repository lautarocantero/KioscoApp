# 🪝 `useCreateKiosco`

> Hook de React que maneja el submit del formulario de `/create-kiosco`.

## 🎯 ¿Para qué sirve?

Crea el kiosco, refresca `myKioscos`, lo marca como activo, y navega a `/shop` — todo en un solo flujo, para que quien acaba de crear un kiosco entre directo a él sin pasos extra.

## 📦 Firma

```ts
useCreateKiosco(): {
  isSubmitting: boolean;
  submitError: string | null;
  handleSubmit: (values: CreateKioscoFormValues) => Promise<void>;
}
```

- `handleSubmit` es el `onSubmit` que se le pasa a `<Formik>` (via `CreateKioscoForm`).

## ⚙️ Comportamiento de `handleSubmit`

```
1. POST /kiosco/create { name, address }   → crea Kiosco + membership admin
2. GET /kiosco/my-kioscos                  → refresca la lista (fetchMyKioscosThunk)
3. POST /kiosco/:id/select                 → lo marca como activo (selectKioscoThunk)
4. navigate("/shop")
```

Si el paso 1 falla, no se navega y `submitError` queda seteado con el mensaje parseado por `useErrorParser`.

## 💡 Ejemplo

```tsx
const { isSubmitting, submitError, handleSubmit } = useCreateKiosco();

<Formik
  initialValues={getCreateKioscoInitialValues()}
  validationSchema={createKioscoFormSchema}
  onSubmit={handleSubmit}
>
  {/* name, address */}
</Formik>
```

## ✨ Beneficios

- 🧭 **Quien crea un kiosco entra a él automáticamente** — no hace falta un segundo click en el selector.
- 🚦 **`isSubmitting`/`submitError` unificados** para todo el flujo de 3 pasos.

## Tests

`src/hooks/kiosco/test/useCreateKiosco.test.ts`
