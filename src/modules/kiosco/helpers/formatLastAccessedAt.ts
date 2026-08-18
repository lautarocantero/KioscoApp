import type { TFunction } from "i18next";

// "Último acceso" de la card del selector: relativo si fue hoy/ayer, fecha
// corta si no. `lastAccessedAt` puede venir null (nunca se registró acceso).
export const formatLastAccessedAt = (lastAccessedAt: string | null, t: TFunction): string => {
    if (!lastAccessedAt) return t("kiosco.selector.card.never");

    const date = new Date(lastAccessedAt);
    if (Number.isNaN(date.getTime())) return t("kiosco.selector.card.never");

    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false });

    if (isToday) return t("kiosco.selector.card.today", { time });
    if (isYesterday) return t("kiosco.selector.card.yesterday", { time });

    return date.toLocaleDateString();
};
