import { SellStatusEnum } from "@typings/sells/sellsEnum";
import type { ChipColumnColor } from "@typings/ui/dataTable.types";

export const SELL_STATUS_CONFIG: Record<SellStatusEnum, { label: string; color: ChipColumnColor }> = {
    [SellStatusEnum.Completada]: { label: "Completada", color: "success" },
    [SellStatusEnum.Parcial]: { label: "Parcial", color: "warning" },
};
