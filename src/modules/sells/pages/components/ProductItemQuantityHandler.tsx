
// # Componente: ProductItemQuantityHandler  

// ## Descripción 📦
// Renderiza chips de cantidad por talla/variante de producto, limitados según el breakpoint actual.  
// Evalúa el stock disponible por tamaño y muestra un máximo de chips dependiendo del ancho de pantalla.  

// ## Funciones 🔧
// - `ProductItemQuantityHandler`: componente principal que recibe props tipadas con `ItemQuantityHandler`.  
//   - `variants`: listado de variantes del producto con información de stock.  
// - Lógica interna:  
//   - `useBreakpoint`: hook personalizado que devuelve el breakpoint actual (`xs`, `sm`, `md`, `lg`, `xl`).  
//   - `limits`: define cuántos chips mostrar según el breakpoint.  
//   - `useMemo`: calcula `stockStatus` usando `evaluateStockBySize` para obtener el estado de stock por talla.  
//   - Renderiza un conjunto de `QuantityChip` con:  
//     - `color`: estado de stock (`StockStatusEnum`).  
//     - `label`: nombre/tamaño de la variante.  
//   - Se limita la cantidad de chips mostrados con `.slice(0, limit)`.  

// ## Notas técnicas 💽
// - Usa `QuantityChip` como componente visual para mostrar cada talla con su estado de stock.  
// - Modularidad: `evaluateStockBySize` centraliza la lógica de cálculo de stock por tamaño.  
// - Responsividad: el número de chips mostrados depende del breakpoint actual.  
// - Se integra en `ProductItemEspecificationsRight` o similares para mostrar disponibilidad por talles.  
//-----------------------------------------------------------------------------//

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