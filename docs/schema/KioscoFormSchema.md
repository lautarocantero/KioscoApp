# `KioscoFormSchema` — Documentación

## ¿Para qué sirve?

Esquema de Yup para el formulario de `/create-kiosco` — mismo patrón (Formik + Yup) que el resto de los formularios del proyecto (`ProviderFormSchema`, `SellerFormSchema`).

## Contenido

### `createKioscoFormSchema`

```ts
Yup.object({
  name: Yup.string().trim().min(1, "Nombre requerido").required("Nombre requerido"),
  address: Yup.string().trim().min(1, "Dirección requerida").required("Dirección requerida"),
})
```

### `getCreateKioscoInitialValues()`

```ts
(): CreateKioscoFormValues => ({ name: "", address: "" })
```

## Ejemplo de uso

```tsx
<Formik
  initialValues={getCreateKioscoInitialValues()}
  validationSchema={createKioscoFormSchema}
  onSubmit={handleSubmit}
>
```

## Tests

`src/modules/kiosco/test/schema/KioscoFormSchema.test.ts`
