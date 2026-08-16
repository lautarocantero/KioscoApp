import type { LowStockPresentationSummary } from "@typings/shop/shopTypes";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { StockSeverity } from "@typings/shop/shopEnums";

// Selecciona las presentaciones por debajo de su stock mínimo real
// (stock < min_stock) y las clasifica: Crítico si no queda stock (0 o
// negativo, ej. una venta que dejó el stock en rojo), Bajo si queda algo
// pero menos del mínimo. Ordena las más críticas primero (menor ratio
// stock/mínimo, con el stock más negativo primero en caso de empate)
// para la lista de /shop.
export const getLowStockPresentations = (presentations: Presentation[]): LowStockPresentationSummary[] =>
    presentations
        .filter((presentation) => presentation.stock < presentation.min_stock)
        .map((presentation) => ({
            presentationId: presentation._id,
            name: presentation.name,
            stock: presentation.stock,
            minStock: presentation.min_stock,
            severity: presentation.stock <= 0 ? StockSeverity.Critico : StockSeverity.Bajo,
            ratio: presentation.min_stock === 0
                ? 0
                : Math.max(0, Math.min(presentation.stock / presentation.min_stock, 1)),
        }))
        .sort((a, b) => a.ratio - b.ratio || a.stock - b.stock);
