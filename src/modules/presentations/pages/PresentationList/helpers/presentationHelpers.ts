// ─── Helpers 🛞: formatters ───────────────────────────────────────────────────
 
export const formatPrice = (price: number): string =>
    new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
        maximumFractionDigits: 0,
    }).format(price);
 
export const formatDate = (iso: string): string =>
    iso
        ? new Date(iso).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
          })
        : "—";
 
