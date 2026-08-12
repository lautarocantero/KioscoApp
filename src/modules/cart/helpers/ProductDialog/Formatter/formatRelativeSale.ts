export const formatRelativeSaleSubtitle = (lastSaleAt: string | null): string => {
    if (!lastSaleAt) return "Sin ventas registradas hoy";

    const last = new Date(lastSaleAt);
    const now = new Date();
    const diffMs = now.getTime() - last.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffH = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffH / 24);

    const isToday = last.toDateString() === now.toDateString();

    const time = last.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
    });

    if (diffMin < 1) return "Última venta: recién";
    if (diffMin < 60) return `Última venta hace ${diffMin} min`;
    if (isToday) return `Última venta hoy a las ${time}`;
    if (diffDays === 1) return `Última venta ayer a las ${time}`;
    if (diffDays < 7) return `Última venta hace ${diffDays} días`;

    return `Última venta el ${last.toLocaleDateString("es-AR")}`;
};