


AppRouter🚅: Router principal. Controla acceso según autenticación.
- Si autenticado: habilita rutas privadas (Home, Ventas, Carrito, Tienda, Cuenta, Proveedores, Productos).
- Si no autenticado: muestra solo rutas de Auth.
- Usa RouteTracker para guardar última ruta en localStorage.
- Redirige '/' a '/new-sell' (forzado actualmente).

ShopRoutes: Maneja rutas de Tienda.
- Administradores: lista, crear, editar.
- Vendedores: lista, crear, editar.
- Estadísticas.

Otros módulos:
- SellsRoutes: ventas.
- CartRoutes: carrito.
- AccountRoutes: cuenta.
- ProvidersRoutes: proveedores.
- ProductsRoutes: productos.
- AuthRoutes: autenticación.