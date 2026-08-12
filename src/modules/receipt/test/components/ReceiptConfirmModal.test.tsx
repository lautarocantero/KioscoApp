import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import ReceiptConfirmModal from "../../pages/ReceiptPage/components/ReceiptConfirmModal";
import { ReceiptDocAction } from "@typings/receipt/receiptEnums";

const preview = {
  stats: {
    totalRows: 4,
    totalProducts: 2,
    multiPresentation: 0,
    rubroFallback: 0,
    noSize: 0,
    noModelType: 0,
    noBarcode: 0,
  },
  pendingReview: [{ product: "p1", presentation: "pr1", reasons: ["falta dato"] }],
  products: [{ _id: "p1", name: "Producto 1", description: "", brand: "", image_url: "", created_at: "", updated_at: "", presentations: ["pr1"] }],
  presentations: [
    { _id: "pr1", product_id: "p1", sku: "sku1", barcode: "123", name: "P1", price: 10, stock: 5, min_stock: 0, model_type: "T1", model_size: 1, model_unit: "u", category: [], status: "", created_at: "", updated_at: "", action: ReceiptDocAction.Create, existingId: null, existingProductId: null },
  ],
  productsAlreadyExisting: [],
};

describe("ReceiptConfirmModal", () => {
  it("renderiza los datos de confirmación cuando hay preview", () => {
    renderWithTheme(
      <ReceiptConfirmModal
        open
        preview={preview}
        loading={false}
        onConfirm={() => undefined}
        onCancel={() => undefined}
      />
    );

    expect(document.querySelector("[role='dialog']")).toBeInTheDocument();
    expect(document.querySelector("[aria-label='Confirmar carga de boleta']")).toBeNull();
    expect(document.body.textContent).toContain("Confirmar carga de boleta");
    expect(document.body.textContent).toContain("Se analizaron 4 filas del archivo.");
    expect(document.body.textContent).toContain("1 presentaciones nuevas");
  });

  it("no renderiza cuando preview es null", () => {
    renderWithTheme(
      <ReceiptConfirmModal open preview={null} loading={false} onConfirm={() => undefined} onCancel={() => undefined} />
    );

    expect(document.body.textContent).not.toContain("Confirmar carga de boleta");
  });
});
