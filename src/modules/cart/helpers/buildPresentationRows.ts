import type { TFunction } from "i18next";
import type { Product } from "@typings/product/productTypes";
import type { PresentationRow } from "@typings/cart/cartTypes";
import { isWeightSaleType } from "../../shared/helpers/saleTypeHelper";
import { formatPresentationVariantLabel } from "./formatPresentationVariantLabel";
import { formatPresentationCategoryLabel } from "./formatPresentationCategoryLabel";

/*══════════════════════════════════════════════════════════════════════╗
║ 🧱 buildPresentationRows                                              ║
║ Aplana los productos ya cargados (con sus presentations embebidas) a  ║
║ un índice de 1 fila por presentación. Única fuente de este aplanado — ║
║ la usan usePresentationSearch (dropdown) y la vista de lista densa.   ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const buildPresentationRows = (products: Product[], t: TFunction): PresentationRow[] =>
  products.flatMap((product) =>
    (product.presentations ?? []).map((presentation) => ({
      key: `${product._id}:${presentation._id}`,
      productId: product._id,
      presentationId: presentation._id,
      product: product.name,
      presentation: formatPresentationVariantLabel(presentation, t),
      category: formatPresentationCategoryLabel(presentation.category, t),
      sku: presentation.sku,
      price: presentation.price,
      stock: presentation.stock,
      minStock: presentation.min_stock,
      isWeight: isWeightSaleType(presentation.sale_type),
      presentationData: presentation,
    }))
  );

export default buildPresentationRows;
