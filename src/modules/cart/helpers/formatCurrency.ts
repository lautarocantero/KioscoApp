
//─────────────────── Helper 🧩: formatCurrency ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Función utilitaria que formatea valores numéricos a moneda local (ARS),
// aplicando formato estándar argentino con dos decimales. Se utiliza para
// mostrar precios y totales de manera consistente en todo el sistema.

//──────────────────── Funciones 🔧 ─────────────────────//
// - Utiliza Intl.NumberFormat con configuración "es-AR".
// - Aplica formato de moneda con estilo "currency" y código "ARS".
// - Garantiza siempre un mínimo de 2 decimales.
// - Devuelve el valor formateado como string listo para mostrar en UI o PDF.

//-----------------------------------------------------------------------------//

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(value);
