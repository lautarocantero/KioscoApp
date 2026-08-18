# `JoinKioscoFormSchema` — Documentación

## ¿Para qué sirve?

Esquema de Yup para el formulario de `/join-kiosco` (código de invitación).

## Contenido

### `joinKioscoFormSchema`

```ts
Yup.object({
  invite_code: Yup.string().trim().min(1, "Código requerido").required("Código requerido"),
})
```

### `getJoinKioscoInitialValues(prefillCode?: string | null)`

```ts
(prefillCode?: string | null): JoinKioscoFormValues => ({ invite_code: prefillCode ?? "" })
```

Prellena el campo cuando `JoinKioscoPage` se abre desde un link de invitación con `?code=...` en la URL.

## Ejemplo de uso

```tsx
const [searchParams] = useSearchParams();

<Formik
  initialValues={getJoinKioscoInitialValues(searchParams.get("code"))}
  validationSchema={joinKioscoFormSchema}
  onSubmit={handleSubmit}
>
```

## Tests

`src/modules/kiosco/test/schema/JoinKioscoFormSchema.test.ts`
