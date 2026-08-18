import i18n from "@i18n/i18n";

export const formatRelativeSaleSubtitle = (lastSaleAt: string | null): string => {
    if (!lastSaleAt) return i18n.t("cart.relativeSale.noSalesToday");

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

    if (diffMin < 1) return i18n.t("cart.relativeSale.justNow");
    if (diffMin < 60) return i18n.t("cart.relativeSale.minutesAgo", { count: diffMin });
    if (isToday) return i18n.t("cart.relativeSale.todayAt", { time });
    if (diffDays === 1) return i18n.t("cart.relativeSale.yesterdayAt", { time });
    if (diffDays < 7) return i18n.t("cart.relativeSale.daysAgo", { count: diffDays });

    return i18n.t("cart.relativeSale.onDate", { date: last.toLocaleDateString("es-AR") });
};