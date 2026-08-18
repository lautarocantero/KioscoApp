import { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { ChipColumnColor } from "@typings/ui/dataTable.types";

// El label se resuelve con t(`sells.status.${value}`) en sellColumns.tsx —
// acá solo vive el color, que no es texto traducible.
export const SELL_STATUS_CONFIG: Record<SellStatusEnum, { color: ChipColumnColor }> = {
    [SellStatusEnum.Completada]: { color: "success" },
    [SellStatusEnum.Parcial]: { color: "warning" },
};
