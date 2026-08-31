# 🪝 `useCartFormik`

> `initialValues`/`validationSchema` del Formik de checkout del carrito.

## 🎯 ¿Para qué sirve?

Saca el `useMemo` de armar `initialValues` (`getCartFormInitialValues`) y `validationSchema` (`cartFormSchema(total, t)`) fuera de `CartComponent.tsx`, para que el `.tsx` no tenga lógica propia — solo recibe el resultado y lo pasa al `<Formik>`.

## 📦 Firma

```ts
useCartFormik(total: number): { initialValues: CartFormValues; validationSchema: ReturnType<typeof cartFormSchema> }
```

## 💡 Ejemplo

```tsx
const { initialValues, validationSchema } = useCartFormik(total);

<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={generateTicket}>
  {/* ... */}
</Formik>
```
