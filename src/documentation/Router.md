


AppRouter🚅: Router principal. Controla acceso según autenticación.
- Si autenticado: habilita rutas privadas (Tienda, Ventas, Carrito, Cuenta, Proveedores, Productos).
- Si no autenticado: muestra solo rutas de Auth.
- Usa RouteTracker para guardar última ruta en localStorage.
- '/shop' es el punto de entrada de la app: redirige ahí cuando no hay `lastRoute` guardada y ante cualquier ruta no encontrada (`*`).

ShopRoutes: Maneja la ruta de Tienda (`/shop`), el dashboard de inicio de la app. Es una única página (`ShopPage`) con tarjetas de resumen real por sección y link a cada una — ya no tiene submenú ni rutas propias de administradores/estadísticas.

Otros módulos:
- SellsRoutes: ventas.
- CartRoutes: carrito.
- AccountRoutes: cuenta.
- ProvidersRoutes: proveedores.
- ProductsRoutes: productos.
- AuthRoutes: autenticación.