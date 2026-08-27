export type PercentageChange = {
    isPositive: boolean;
    label: string;
};

// Formatea una variación porcentual ya calculada (ver calculateVariationPct)
// como "▲ 14,6%" / "▼ 6,9%" en formato es-AR.
export const formatPercentageChange = (pct: number): PercentageChange => ({
    isPositive: pct >= 0,
    label: `${pct >= 0 ? "▲" : "▼"} ${Math.abs(pct).toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`,
});

export default formatPercentageChange;
