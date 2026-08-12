import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { screen } from "@testing-library/react";
import ReceiptSideCards from "../../pages/ReceiptPage/components/ReceiptSideCards";

describe("ReceiptSideCards", () => {
  it("renderiza el resumen y la lista de consejos", () => {
    const summaryCardProps = {
      status: "Carga completada",
      description: "Resumen de prueba",
      stats: {
        productsTotal: 1,
        productsInserted: 1,
        productsSkipped: 0,
        productsFailed: 0,
        presentationsCreated: 0,
        presentationsUpdated: 0,
        presentationsUnchanged: 0,
        presentationsFailed: 0,
        pendingReviewCount: 0,
        totalRows: 1,
      },
    };

    renderWithTheme(<ReceiptSideCards summaryCardProps={summaryCardProps} />);

    expect(screen.getByText("Resumen de la última carga")).toBeInTheDocument();
    expect(screen.getByText("Consejos")).toBeInTheDocument();
  });
});
