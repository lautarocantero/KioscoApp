
//─────────────────── Helper 🦸: evaluateStockBySize ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Función auxiliar que evalúa el estado de stock de un producto agrupado por talles/tamaños.  
// Retorna un objeto donde cada clave es un tamaño (`model_size`) y el valor es un `StockStatusEnum` indicando disponibilidad.

//──────────────────── Lógica 🔧 ─────────────────────//
// - Recorre las variantes del producto y agrupa por `model_size`.  
// - Para cada grupo acumula:  
//   - `totalStock`: cantidad total disponible.  
//   - `totalMinStock`: stock mínimo requerido.  
// - Evalúa cada grupo:  
//   - Si `totalStock >= totalMinStock` → estado `green` (stock suficiente).  
//   - Si `totalStock < totalMinStock` → estado `red` (stock insuficiente).  
// - Devuelve un objeto con el estado de stock por cada tamaño.  

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Tipado con `EvaluateStockType` para recibir las variantes.  
// - Usa `StockStatusEnum` para estandarizar los estados de stock.  
// - Se integra en componentes como `ProductItemQuantityHandler` para mostrar chips de disponibilidad por talla.  

//-----------------------------------------------------------------------------//

import { StockStatusEnum } from "../../../typings/auth/enums";
import type { EvaluateStockType } from "../../../typings/sells/sellsComponentTypes";

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