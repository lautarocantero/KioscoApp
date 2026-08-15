# `ProviderFormSchema` (Yup) — Documentación

## ¿Para qué sirve?

Validación de formulario (Yup) + valores iniciales de Formik para `ProviderForm`. A diferencia de `ProviderSchema.ts` (Zod, valida el payload antes de pegarle a la API), esto valida lo que el usuario tipea en el formulario, con mensajes en español listos para mostrar debajo de cada campo.

## Contenido

### `providerFormSchema` / `providerEditFormSchema`

```ts
Yup.object({
  name: Yup.string().trim().min(1).required("Nombre requerido"),
  valoration: Yup.number()
    .min(1, "La valoración mínima es 1")
    .max(5, "La valoración máxima es 5")
    .required("Valoración requerida"),
  contact_phone: Yup.string().trim().min(1).required("Teléfono requerido"),
  contact_email: Yup.string().email("Email inválido").required("Email requerido"),
})
```

`providerEditFormSchema` es el mismo schema (no hay diferencia entre alta y edición porque el form siempre manda los 4 campos completos, aunque el backend acepte ediciones parciales).

### `getProviderFormInitialValues()`

Valores iniciales para **alta**: todos los campos vacíos salvo `valoration`, que arranca en `5`.

### `getProviderEditInitialValues(provider)`

Mapea un `Provider` (o `null`) a `ProviderFormValues`. Si `provider` es `null`, devuelve los mismos defaults que `getProviderFormInitialValues()`.

## Ejemplo de uso

```tsx
<Formik
  initialValues={getProviderFormInitialValues()}
  validationSchema={providerFormSchema}
  onSubmit={handleSubmit}
  validateOnBlur={false}
  validateOnChange={false}
>
```

## Tests

`src/modules/providers/test/schema/ProviderFormSchema.test.ts`
