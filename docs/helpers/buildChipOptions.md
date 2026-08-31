# 🧰 `buildChipOptions`

> Arma las `options` de un `CartChipToggleGroup` a partir de una lista de valores crudos + una función de label.

## 📦 Firma

```ts
buildChipOptions<T extends string>(values: T[], getLabel: (value: T) => string): CartChipOption[]
```

## 💡 Ejemplo

```ts
buildChipOptions([PaymentMethod.Cash, PaymentMethod.Debit], (v) => t(`paymentMethod.${v}`));
// [{ value: "cash", label: "Efectivo" }, { value: "debit", label: "Débito" }]
```

## ✨ Notas

Vive en `useCartPaymentMethodForm`/`useCartPaymentStatusForm` (no en los componentes `.tsx`) — así el `.tsx` solo recibe `options` ya resueltas.
