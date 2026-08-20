import type { LowStockPresentationSummary } from "@typings/shop/shopTypes";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { StockSeverity } from "@typings/shop/shopEnums";
import { clampStock } from "../../../utils/formatter/clampStock";

// Selecciona las presentaciones por debajo de su stock mínimo real
// (stock < min_stock) y las clasifica: Crítico si no queda stock (0 o
// negativo, ej. una venta que dejó el stock en rojo), Bajo si queda algo
// pero menos del mínimo. Ordena las más críticas primero (menor ratio
// stock/mínimo, con el stock más negativo primero en caso de empate)
// para la lista de /shop. El `stock` que se expone ya viene clampeado a 0
// (nunca se muestra negativo) — la severidad y el orden siguen usando el
// valor real para distinguir "sin stock" de "stock muy negativo".
const getRatio = (presentation: Presentation): number =>
    presentation.min_stock === 0 ? 0 : Math.max(0, Math.min(presentation.stock / presentation.min_stock, 1));

export const getLowStockPresentations = (presentations: Presentation[]): LowStockPresentationSummary[] =>
    presentations
        .filter((presentation) => presentation.stock < presentation.min_stock)
        .sort((a, b) => getRatio(a) - getRatio(b) || a.stock - b.stock)
        .map((presentation) => ({
            presentationId: presentation._id,
            name: presentation.name,
            stock: clampStock(presentation.stock),
            minStock: presentation.min_stock,
            severity: presentation.stock <= 0 ? StockSeverity.Critico : StockSeverity.Bajo,
            ratio: getRatio(presentation),
        }));
