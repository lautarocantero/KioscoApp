# 🪝 `useJoinKiosco`

> Hook de React que maneja el submit del formulario de `/join-kiosco` (usuario ya logueado).

## 🎯 ¿Para qué sirve?

Envía el código de invitación, refresca `myKioscos`, marca el nuevo kiosco como activo, y navega a `/shop`. Mismo flujo de 4 pasos que `useCreateKiosco`, pero uniéndose como vendedor en vez de crear.

## 📦 Firma

```ts
useJoinKiosco(): {
  isSubmitting: boolean;
  submitError: string | null;
  handleSubmit: (values: JoinKioscoFormValues) => Promise<void>;
}
```

## ⚙️ Comportamiento de `handleSubmit`

```
1. POST /kiosco/join { invite_code }   → crea membership "seller" (404 si el código no existe, 409 si ya es miembro)
2. GET /kiosco/my-kioscos              → refresca la lista
3. POST /kiosco/:id/select             → lo marca como activo
4. navigate("/shop")
```

Si el paso 1 falla, `submitError` se setea con `"Código de invitación inválido"` (o el mensaje parseado del backend).

## 💡 Ejemplo

```tsx
const { isSubmitting, submitError, handleSubmit } = useJoinKiosco();
const [searchParams] = useSearchParams();

<Formik
  initialValues={getJoinKioscoInitialValues(searchParams.get("code"))}
  validationSchema={joinKioscoFormSchema}
  onSubmit={handleSubmit}
>
  {/* invite_code */}
</Formik>
```

## 📚 Ver también

Para el caso de usuario **deslogueado** que abre un link de invitación, ver [useJoinKioscoAccess](useJoinKioscoAccess.md) y [useHandlePendingInviteCode](useHandlePendingInviteCode.md) — `useJoinKiosco` solo cubre el caso de sesión ya iniciada.

## Tests

`src/hooks/kiosco/test/useJoinKiosco.test.ts`
