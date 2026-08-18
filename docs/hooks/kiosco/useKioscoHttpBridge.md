# 🪝 `useKioscoHttpBridge` (`initKioscoHttpBridge`)

> Puente entre el store de Redux y `httpClient.ts` para adjuntar el header `x-kiosco-id` a cada request.

## 🎯 ¿Para qué sirve?

`httpClient.ts` vive fuera de React/Redux (se instancia antes de que exista el store), así que no puede hacer `useSelector` directamente. `initKioscoHttpBridge` le inyecta un getter de solo lectura sobre el store ya creado — mismo patrón que `authHttpBridge` usa para el access token.

Gracias a esto, **ningún** call site de `productApi`/`presentationApi`/`providerApi`/`sellApi`/`sellerApi`/`receiptApi` tuvo que cambiar de firma: el scoping por kiosco es transparente, se resuelve en el interceptor de `createHttpClient`.

## 📦 Firma

```ts
initKioscoHttpBridge(getState: () => RootState): void
```

- Se llama **una sola vez**, apenas se crea el store (`store/store.ts`), igual que `initAuthHttpBridge`.
- Internamente hace `setActiveKioscoIdGetter(() => getState().kiosco.activeKioscoId)`.

## ⚙️ Cómo se usa el getter

Cada request armada por `createHttpClient` lee el kiosco activo **en el momento de la request** (no un valor cacheado al crear el cliente) y le agrega el header:

```
x-kiosco-id: <activeKioscoId>
```

El backend lo valida con `requireKioscoContext` (403 si el usuario no es miembro de ese kiosco) — ver [docs/features/multiKiosco.md](../../features/multiKiosco.md).

## 💡 Ejemplo

```ts
// store/store.ts
export const store = configureStore({ /* ... */ });

initAuthHttpBridge(store.getState);
initKioscoHttpBridge(store.getState);
```

## ✨ Beneficios

- 🧵 **Cero cambios en las APIs existentes** — todo el scoping por kiosco pasa por un único interceptor.
- 🔄 **Siempre lee el valor actual**: si el usuario cambia de kiosco activo a mitad de sesión, la próxima request ya sale con el header correcto sin necesidad de recrear ningún cliente.
