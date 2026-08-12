import { describe, it, expect } from "vitest";
import { ReceiptStatusEnum } from "@typings/receipt/receiptEnums";
import { buildReceiptSummaryCardProps } from "../../pages/ReceiptPage/helpers/buildReceiptSummaryCardProps";
import type { ReceiptImportResult } from "@typings/receipt/receiptTypes";

describe("buildReceiptSummaryCardProps", () => {
  it("devuelve el estado inicial cuando no hay carga", () => {
    const props = buildReceiptSummaryCardProps(ReceiptStatusEnum.Idle, null, null, 0);

    expect(props.status).toBe("Aún no has cargado");
    expect(props.description).toBe("Ningún archivo procesado");
    expect(props.showProgress).toBeUndefined();
  });

  it("devuelve progreso de subida mientras carga", () => {
    const props = buildReceiptSummaryCardProps(ReceiptStatusEnum.Loading, null, null, 42);

    expect(props.status).toBe("Subiendo archivo…");
    expect(props.description).toBe("42% subido");
    expect(props.showProgress).toBe(true);
    expect(props.isProcessing).toBe(false);
    expect(props.progress).toBe(42);
  });

  it("devuelve análisis cuando el progreso supera 100%", () => {
    const props = buildReceiptSummaryCardProps(ReceiptStatusEnum.Loading, null, null, 100);

    expect(props.status).toBe("Analizando…");
    expect(props.description).toBe("Revisando el contenido del archivo");
    expect(props.showProgress).toBe(true);
    expect(props.isProcessing).toBe(true);
  });

  it("devuelve estado de espera de confirmación", () => {
    const props = buildReceiptSummaryCardProps(ReceiptStatusEnum.AwaitingConfirmation, null, null, 0);

    expect(props.status).toBe("Esperando confirmación");
    expect(props.description).toBe("Revisá el detalle antes de aplicar los cambios");
  });

  it("devuelve estado de confirmación cuando se aplica la carga", () => {
    const props = buildReceiptSummaryCardProps(ReceiptStatusEnum.Confirming, null, null, 0);

    expect(props.status).toBe("Aplicando cambios…");
    expect(props.description).toBe("Insertando productos y presentaciones");
    expect(props.showProgress).toBe(true);
    expect(props.isProcessing).toBe(true);
  });

  it("devuelve estado de error con mensaje personalizado", () => {
    const props = buildReceiptSummaryCardProps(ReceiptStatusEnum.Failed, null, "Algo falló", 0);

    expect(props.status).toBe("Error");
    expect(props.description).toBe("Algo falló");
  });

  it("devuelve resumen correcto al completar la carga", () => {
    const result: ReceiptImportResult = {
      stats: {
        totalRows: 10,
        totalProducts: 7,
        multiPresentation: 0,
        rubroFallback: 0,
        noSize: 0,
        noModelType: 0,
        noBarcode: 0,
      },
      pendingReview: [{ product: "123", presentation: "abc", reasons: ["dato"] }],
      insertResult: {
        products: {
          inserted: ["p1", "p2"],
          skippedDuplicates: ["p3"],
          failed: [{ _id: "p4", error: "error" }],
        },
        presentations: {
          created: ["pr1"],
          updated: ["pr2"],
          unchanged: ["pr3"],
          failed: [{ _id: "pr4", error: "error" }],
        },
      },
      productsAlreadyExisting: ["p5", "p6"],
    };

    const props = buildReceiptSummaryCardProps(ReceiptStatusEnum.Succeeded, result, null, 0);

    expect(props.status).toBe("Carga completada");
    expect(props.description).toBe("4 productos y 3 presentaciones procesadas de 10 filas");
    expect(props.stats).toEqual({
      productsTotal: 4,
      productsInserted: 2,
      productsSkipped: 1,
      productsFailed: 1,
      presentationsCreated: 1,
      presentationsUpdated: 1,
      presentationsUnchanged: 1,
      presentationsFailed: 1,
      pendingReviewCount: 1,
      totalRows: 10,
    });
  });
});
