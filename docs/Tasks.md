# 🗂️ To-Do / Roadmap

**Leyenda de prioridad:** 
🔴 Alta
🟡 Media
🟢 Baja

---
________________________________________________________________________________________________
| 🧾 **Login**                                                                                   |
|-------------------------------------------------------------------------------------------------| 
| 🔴 Logout global en 401 post-refresh: si httpClient.ts intenta refrescar y también falla,       |
|    hoy nadie despacha logout() en el store (solo pasa en authThunks.ts). Definir si lo hace     |
|    el propio httpClient o cada thunk de negocio en su catch                                     |
| 🔴 Verificar el interceptor de refresh end-to-end: bajar expiresIn a 10s, loguearse, disparar   |
|    una request protegida y confirmar en Network 401 → POST /refresh → reintento exitoso         |
| 🔴 Verificar caso de sesión realmente vencida: borrar refresh_token manualmente y confirmar      |
|    que el usuario termina redirigido al login en vez de quedar colgado                          |
| 🟡 Probar el caso rememberMe: false en DevTools (cookie debe aparecer como Session, sin fecha)  |
| 🟡 Confirmar que el JWT interno respeta el flag (exp: 1d sin remember vs 30d con remember)      |
| 🟢 Excluir /login, /register, /check-auth del interceptor de refresh (evitar refresh inútil     |
|    en cada login fallido)                                                                        |
| 🟢 Actualizar tabla de endpoints en el header de auth.controller.ts (falta /refresh)             |
| 🟢 Revisar AuthCheckAutResponse en authTypes.ts (tiene password/refreshToken que no deberían    |
|    viajar al frontend — confirmar si es un tipo viejo sin uso)                                  |
| 🟢 Decidir si checkAuth debe reemitir access_token al validar sesión, o dejarlo al interceptor  |
| 🟢 Test automatizado (Jest/Supertest): POST /login valida Max-Age presente/ausente según         |
|    rememberMe                                                                                    |
| 🟢 Test automatizado: POST /refresh → 200 con token válido, 401 sin cookie, 401 con token vencido|
| 🟢 (pausado) Cerrar sesión en todos los dispositivos — ya existe deleteRefreshToken en el modelo,|
|    falta exponerlo como acción de usuario                                                        |
| 🟢 terminar de comprobar que funcione remember me. (luego documentar y agregar test)             |
| 🟢 Implementar emial de olvidaste tu password                                                      |
| 🟢 Implementar inicio de sesion con google         |
| 🟢 Agregar envio de mail para cuando creas sesion         |
| 🟢 Verificar que solo se pueda al aceptar los terminos y condiciones (luego ver que pingo pongo)         |
| 🟢 terminar de comprobar que funcione remember me. (luego documentar y agregar test)             |
|_________________________________________________________________________________________________|
________________________________________________________________________________________________
| 🧾 **Ventas**                                                                                   |
|-------------------------------------------------------------------------------------------------| 
| 🟢 cuando no hay stock de una sola presentacion por peso, aparece 0. contemplar que hacer
| 🟢 dividir entre cantidad (100,200) y valor (gramos, kilos)                                     
|_________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| 👤 **Vendedores**                                                                               |
|--------------------------------------------------------------------------------------------------|
| 🔴 Modificar datos para que no sean los mismos que `auth`, también los campos                    |
|____________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| ⚙️ **General**                                                                                  |
|--------------------------------------------------------------------------------------------------|
| 🟢 los form card deben de mostrar con un snackbar o algo que fallo la peticion, ahora solo muestrea la validacion.                                                |
| 🟢 Comentar secciones no disponibles aun o poner algo                                                  |
| 🟢 Leer la documentación y dejarla presentable                                                   |
| 🟢 Agregar componente para las situaciones donde algo no carga o llega sin datos (early return)  |
| 🟢 Agregar skeletons                                                                              |
| 🟢 Mejorar login y Register                                                                            |
|____________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| 📌 **Sidebar**                                                                                  |
|--------------------------------------------------------------------------------------------------|
| 🟢 Implementar colores para los menús y color picker                                             |
|____________________________________________________________________________________________________|

 ________________________________________________________________________________________________
| 📦 **Productos**                                                                                |
|--------------------------------------------------------------------------------------------------|
| 🟢 Hacer que la card de stock funcione, implementar cambios en backend `(pausado por ahora)`     |
| 🟢 Comprobar si se puede incluir alguna forma para comparar períodos, etc. `(pausado por ahora)` |
|____________________________________________________________________________________________________|

## ✅ Checklist — Revisión general de componente

Antes de dar por cerrado un componente, verificar:

1. ¿Es atómico?
2. ¿Usa hooks y lógica de otros archivos?
3. ¿Tiene un skeleton?
4. ¿Tiene un empty state?
5. ¿Usa enums?
6. ¿Usa interfaces y tipos, y **no** declaración explícita?
7. ¿Las interfaces son `Props` e interfaces respectivamente?
8. ¿Usa los colores del theme y no los inventa?