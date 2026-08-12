import { describe, it, expect } from "vitest";
import { ReceiptDocAction } from "@typings/receipt/receiptEnums";
import { buildReceiptConfirmModalView } from "../../pages/ReceiptPage/helpers/buildReceiptConfirmModalReview";

describe("buildReceiptConfirmModalView", () => {
  it("calcula correctamente los contadores de preview", () => {
    const preview = {
      stats: {
        totalRows: 5,
        totalProducts: 3,
        multiPresentation: 0,
        rubroFallback: 0,
        noSize: 0,
        noModelType: 0,
        noBarcode: 0,
      },
      pendingReview: [{ product: "p1", presentation: "pr1", reasons: ["falta rubro"] }],
      products: [{ _id: "p1", name: "Producto 1", description: "", brand: "", image_url: "", created_at: "", updated_at: "", presentations: ["pr1"] }],
      presentations: [
        { _id: "pr1", product_id: "p1", sku: "sku1", barcode: "123", name: "P1", price: 10, stock: 5, min_stock: 0, model_type: "T1", model_size: 1, model_unit: "u", category: [], status: "", created_at: "", updated_at: "", action: ReceiptDocAction.Create, existingId: null, existingProductId: null },
        { _id: "pr2", product_id: "p1", sku: "sku2", barcode: "456", name: "P2", price: 20, stock: 2, min_stock: 0, model_type: "T2", model_size: 2, model_unit: "u", category: [], status: "", created_at: "", updated_at: "", action: ReceiptDocAction.Update, existingId: null, existingProductId: null },
      ],
      productsAlreadyExisting: [],
    };

    const view = buildReceiptConfirmModalView(preview);

    expect(view.pendingReviewCount).toBe(1);
    expect(view.hasPendingReview).toBe(true);
    expect(view.productsCount).toBe(1);
    expect(view.presentationsCount).toBe(2);
    expect(view.presentationsToCreateCount).toBe(1);
    expect(view.presentationsToUpdateCount).toBe(1);
    expect(view.stats.totalRows).toBe(5);
  });
});
