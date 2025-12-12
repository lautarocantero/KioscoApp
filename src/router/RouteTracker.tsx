
// # Componente: RouteTracker  

// ## Descripción 📦  
// Componente auxiliar que registra la última ruta visitada por el usuario.  
// Su propósito es guardar en `localStorage` la ruta actual (`pathname`) cada vez que cambia la ubicación,  
// permitiendo restaurar la navegación en futuras sesiones o redirecciones.  

// ## Lógica 🔧  
// - Usa `useLocation` de `react-router-dom` para obtener la ruta actual.  
// - Usa `useEffect` para ejecutar un efecto cada vez que `location` cambia.  
// - Dentro del efecto:  
//   - Se guarda la ruta actual en `localStorage` bajo la clave `"lastRoute"`.  
// - Retorna `null` porque no renderiza nada en la interfaz; su función es puramente lógica.  

// ## Notas técnicas 💽  
// - Este componente debe estar montado en el árbol de la aplicación para que funcione correctamente.  
// - La información almacenada puede ser utilizada por `AppRouter` u otros componentes para redirigir al usuario  
//   a la última ruta visitada tras un refresh o reautenticación.  
// - Modularidad: se mantiene separado de la lógica de rutas principales, facilitando mantenimiento y reutilización.  


import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem("lastRoute", location.pathname);
  }, [location]);

  return null;
};

export default RouteTracker;