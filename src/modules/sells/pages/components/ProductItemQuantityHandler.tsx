import { useMemo } from "react";
import { StockStatusEnum } from "../../../../typings/auth/enums";
import QuantityChip from "./ProductItemQuantityChip";
import evaluateStockBySize from "../helpers/StockStatusHandler";
import { useBreakpoint } from "../../../../hooks/useBreakpoint";
import type { ItemQuantityHandler } from "../../../../typings/sells/sellsComponentTypes";
import type { Breakpoint } from "@mui/system";

const ProductItemQuantityHandler = ({variants} : ItemQuantityHandler): React.ReactNode => {

    const breakpoint: Breakpoint = useBreakpoint();

    const limits: Record<string, number> = { xs: 3, sm: 6, md: 9, lg: 9, xl: 9 };
    const limit: number = limits[breakpoint];

    const stockStatus: Record<string, StockStatusEnum> | undefined = useMemo(() => {
      if(!variants) return undefined;
          return evaluateStockBySize({variants})
      }, [variants]);

    return (
        <>
        {stockStatus &&
          Object.entries(stockStatus)
          .slice(0, limit)
          .map(([size, status]) => (
            <QuantityChip
              key={size}
              color={status as string}
              label={size}
            />
        ))}
        </>
    )
}

export default ProductItemQuantityHandler;