import { SellFilterEnum } from "@typings/sells/sellsEnum";
import { SELL_FILTER_OPTIONS } from "./sellFilterOptions";

// Valida el query param ?filter= de /sells (ej. al llegar desde "Ver
// morosos" del reporte mensual con ?filter=parcial) contra los valores
// reales de SellFilterEnum — nunca se confía en un query param como si ya
// fuera del tipo esperado (rule 9).
export const parseSellFilterParam = (value: string | null): SellFilterEnum => {
    const match = SELL_FILTER_OPTIONS.find((option) => option === value);
    return match ?? SellFilterEnum.All;
};

export default parseSellFilterParam;
