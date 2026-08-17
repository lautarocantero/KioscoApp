import type { Presentation } from "@typings/presentation/presentationTypes";
import type { Product } from "@typings/product/productTypes";
import type { RestockReportRow } from "@typings/shop/shopTypes";

// Mismo criterio de "más crítico primero" que getLowStockPresentations
// (menor ratio stock/mínimo, con el stock más negativo primero en caso de
// empate), para que la boleta de reposición liste primero lo más urgente.
const getRatio = (stock: number, minStock: number): number =>
    minStock === 0 ? 0 : Math.max(0, Math.min(stock / minStock, 1));

const compareByCriticality = (a: Presentation, b: Presentation): number =>
    getRatio(a.stock, a.min_stock) - getRatio(b.stock, b.min_stock) || a.stock - b.stock;

// Arma las filas de la boleta de reposición: todas las presentaciones por
// debajo de su stock mínimo real (sin recortar a un top N, a diferencia de
// la lista de /shop), con el nombre del producto padre resuelto vía
// `products` (allProducts, ver useShopRestockReport) y la cantidad mínima
// a comprar para llegar justo al mínimo. provider1/provider2 quedan vacíos
// porque todavía no hay proveedores asociados a presentaciones.
export const buildRestockReportRows = (
    presentations: Presentation[],
    products: Product[]
): RestockReportRow[] => {
    const productNameById = new Map(products.map((product) => [product._id, product.name]));

    return presentations
        .filter((presentation) => presentation.stock < presentation.min_stock)
        .sort(compareByCriticality)
        .map((presentation) => ({
            productName: productNameById.get(presentation.product_id) ?? "",
            presentationName: presentation.name,
            currentStock: presentation.stock,
            minStock: presentation.min_stock,
            minRestock: Math.max(presentation.min_stock - presentation.stock, 0),
            provider1: "",
            provider2: "",
        }));
};
