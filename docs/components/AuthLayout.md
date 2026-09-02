# 🧩 `AuthLayout`

> Shell compartido por todas las pantallas de autenticación (login, registro, forgot/reset password, verificación, check-email, términos). Divide la pantalla en un panel de marca (60%, [`AuthBrandPanel`](./AuthBrandPanel.md)) y un panel de contenido (40%, scrollable) donde se renderizan los `children` de cada página. En mobile (`xs`) el panel de marca se oculta y el contenido ocupa el 100% del ancho.

## 📦 Props

| Prop | Tipo | Descripción |
| --- | --- | --- |
| `children` | `ReactNode` | Contenido de la página (heading + formulario). |
| `tagline` | `string` (opcional) | Tagline mostrada en `AuthBrandPanel`. Por defecto: "Gestión de stock y ventas para tu kiosco". |

## 💡 Ejemplo

```tsx
<AuthLayout tagline="Creá tu cuenta y empezá a vender en minutos">
  <AuthPageHeading eyebrow="Registro" title="Crear una cuenta" />
  <RegisterForm />
</AuthLayout>
```

## ✨ Notas

- `LoginPage` y `RegisterPage` pasan su propio `tagline` y renderizan [`AuthPageHeading`](./AuthPageHeading.md) en vez del antiguo wordmark "Stocko" (que ahora vive en el panel de marca).
- Las demás páginas de auth (ForgotPassword, ResetPassword, Verification, CheckEmail, TermsConditions) no pasan `tagline` y heredan el mismo shell con el valor por defecto, para mantener un único layout compartido.
- **Por qué `Box` y no `Grid` para los contenedores de layout:** el theme de este proyecto define `unstable_grid: { cssGrid: true }`, lo que hace que `<Grid container>` de MUI use CSS Grid en vez de flexbox. En ese modo, `flexDirection`/`direction="column"` no fuerza el apilado vertical de forma confiable — los hijos pueden quedar ubicados uno al lado del otro (auto-placement de grid) en vez de uno debajo del otro, generando overflow horizontal severo. Por eso `AuthLayout`, `AuthBrandPanel`, `LoginFormInputs`, `RegisterFormInputs` y los botones de ambos forms usan `Box` con `sx={{ display: "flex", flexDirection: "column" }}` para cualquier apilado, en vez de `Grid`.
