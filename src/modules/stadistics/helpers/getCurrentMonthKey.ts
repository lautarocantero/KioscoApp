// Clave "YYYY-MM" del mes en curso — formato usado tanto por el estado local
// de mes de ShopStadisticsPage como por meta.availableMonths del back.
export const getCurrentMonthKey = (): string => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
};

export default getCurrentMonthKey;
