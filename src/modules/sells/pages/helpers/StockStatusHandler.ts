import { StockStatusEnum } from "../../../../typings/auth/enums";
import type { EvaluateStockType } from "../../../../typings/sells/sellsComponentTypes";

    const evaluateStockBySize = ({variants}: EvaluateStockType): Record<string, StockStatusEnum> => {

      const grouped: Record<string, { totalStock: number; totalMinStock: number }> = {};
      const result: Record<string, StockStatusEnum> = {};

      for (const variant of variants) {
        const size: string = variant.model_size;
        if (!grouped[size]) {
          grouped[size] = { totalStock: 0, totalMinStock: 0 };
        }
        grouped[size].totalStock += variant.stock;
        grouped[size].totalMinStock += variant.min_stock;
      }

      

      for (const size in grouped) {
        const { totalStock, totalMinStock } = grouped[size];
        result[size] = totalStock >= totalMinStock ? StockStatusEnum.green : StockStatusEnum.red;
      }

      return result as Record<string, StockStatusEnum>;
    };

export default evaluateStockBySize;