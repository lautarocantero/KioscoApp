# 🧰 `clampPercentage` / `sanitizePercentageInput`

> Utilidades para inputs de descuento (%) por ítem y globales del carrito.

## 📦 Firma

```ts
sanitizePercentageInput(raw: string): string // deja solo dígitos
clampPercentage(value: number): number       // clampea a [0, 100]
```

## 💡 Ejemplo

```ts
sanitizePercentageInput("1a5%"); // "15"
clampPercentage(150);            // 100
clampPercentage(-5);             // 0
```

## ✨ Notas

`sanitizePercentageInput` se usa en el `onChange` del input (evita que se tipeen letras/signos); `clampPercentage` se aplica recién al calcular totales (`calculateCartTotals`), así el usuario puede borrar el input sin que se le "corrija" el valor mientras escribe.
