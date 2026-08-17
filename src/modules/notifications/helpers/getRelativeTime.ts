import type { TFunction } from "i18next";

const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

// Tiempo relativo tipo "Hace 5 min" sin sumar el plugin relativeTime de
// dayjs (no está instalado en el repo) — diff manual contra Date.now().
export const getRelativeTime = (createdAt: string, t: TFunction): string => {
    const diffMs = Date.now() - new Date(createdAt).getTime();

    if (diffMs < MINUTE_MS) return t("notifications.time.justNow");
    if (diffMs < HOUR_MS) return t("notifications.time.minutesAgo", { count: Math.floor(diffMs / MINUTE_MS) });
    if (diffMs < DAY_MS) return t("notifications.time.hoursAgo", { count: Math.floor(diffMs / HOUR_MS) });

    return t("notifications.time.daysAgo", { count: Math.floor(diffMs / DAY_MS) });
};
