# 🪝 `useProviderCreate` / `useProviderEdit`

> Hooks de React que manejan el submit de los formularios de alta y edición de proveedores.

## 🎯 ¿Para qué sirve?

Encapsulan el ciclo `isSubmitting` → dispatch del thunk correspondiente → `navigate("/providers")` en éxito, o `submitError` en fallo. Mismo patrón que `useSellersForm.ts`.

## 📦 `useProviderCreate`

```ts
useProviderCreate(): UseProviderCreateReturn
// { isSubmitting, submitError, handleSubmit }
```

`handleSubmit(values: ProviderFormValues)` despacha `createProviderThunk(values)`. Si devuelve un `_id`, navega a `/providers`. Si no, setea `submitError` con un mensaje parseado vía `useErrorParser`.

## 📦 `useProviderEdit`

```ts
useProviderEdit(): UseProviderEditReturn
// { editingProvider, isLoadingProvider, isSubmitting, submitError, handleEdit }
```

- Toma `provider_id` de la URL (`useParams`) y usa `useProviderData(providerId)` para precargar el formulario.
- `handleEdit(values: ProviderEditFormValues)` despacha `editProviderThunk({ _id: providerId, ...values })`. Si no hay `providerId` en la URL, no hace nada (ni dispatch ni navigate).
- En éxito navega a `/providers`; en fallo setea `submitError`.

## 💡 Ejemplo

```ts
// alta
const { isSubmitting, submitError, handleSubmit } = useProviderCreate();
<Formik onSubmit={handleSubmit} ... />

// edición
const { editingProvider, isLoadingProvider, handleEdit } = useProviderEdit();
if (isLoadingProvider) return <ProviderSkeleton />;
if (!editingProvider) return <EmptyProvider />;
```

## Tests

`src/hooks/providers/test/useProvidersForm.test.ts`
