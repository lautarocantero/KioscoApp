# 🧰 `formatSellHeaderDate`

> Formatea una fecha como `"Vie 28 · 18:40"` para el header de `/new-sell`.

## 📦 Firma

```ts
formatSellHeaderDate(date?: Date): string
```

Usa `dayjs` con locale `es` (`ddd D · HH:mm`) y capitaliza la primera letra del día, ya que dayjs en español lo devuelve en minúscula.

## 💡 Ejemplo

```ts
formatSellHeaderDate(new Date(2026, 7, 28, 18, 40)); // "Vie 28 · 18:40"
```
