//─────────────────── Componente 🧩: ProductItemQuantityHandler ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza chips de cantidad por talla/variante de producto.
// Limita la cantidad mostrada según el breakpoint actual.  

//──────────────────── Funciones 🔧 ─────────────────────//
// - ProductItemQuantityHandler: componente principal.
//   - Recibe variants.
//   - Usa useBreakpoint para obtener el breakpoint.
//   - Define límites de chips según ancho.
//   - Calcula stockStatus con evaluateStockBySize.
//   - Renderiza QuantityChip con color (estado de stock) y label (tamaño).
//   - Limita la cantidad de chips con slice(0, limit).

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Usa QuantityChip como componente visual para mostrar cada talla con su estado de stock.
// - evaluateStockBySize centraliza la lógica de cálculo de stock por tamaño.
// - El número de chips mostrados depende del breakpoint actual.
//-----------------------------------------------------------------------------//


import type { Breakpoint } from "@mui/system";
import type { ItemQuantityHandlerProps } from "@typings/sells/reactComponents";
import { useMemo } from "react";
import { useBreakpoint } from "../../../../hooks/ui/useBreakpoint";
import { StockStatusEnum } from "../../../../typings/auth/enums";
import evaluateStockBySize from "../../helpers/StockStatusHandler";
import QuantityChip from "./ProductItemQuantityChip";

const ProductItemQuantityHandler = ({variants} : ItemQuantityHandlerProps): React.ReactNode => {

    const breakpoint: Breakpoint = useBreakpoint();

    {/*─────────────────── 🔎 Mostrar chips segun ancho disponible 🔎 ───────────────────*/}
    const limits: Record<string, number> = { xs: 3, sm: 6, md: 9, lg: 9, xl: 9 };
    const limit: number = limits[breakpoint];

    const stockStatus: Record<string, StockStatusEnum> | undefined = useMemo(() => {
      if(!variants) return undefined;
          return evaluateStockBySize({variants})
      }, [variants]);

    if(!stockStatus) return null;

    return (
        <>
          {
            Object.entries(stockStatus)
            .slice(0, limit)
            .map(([size, status]) => (
              <QuantityChip
                key={size}
                color={status as string}
                label={size}
              />
            ))
          }
        </>
    )
}

export default ProductItemQuantityHandler;