import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { screen } from "@testing-library/react";
import ReceiptSummaryCard from "../../pages/ReceiptPage/components/ReceiptSummaryCard";

describe("ReceiptSummaryCard", () => {
  it("renderiza el resumen con las estadísticas de carga", () => {
    const summaryCardProps = {
      status: "Carga completada",
      description: "4 productos y 3 presentaciones procesadas de 10 filas",
      stats: {
        productsTotal: 4,
        productsInserted: 2,
        productsSkipped: 1,
        productsFailed: 0,
        presentationsCreated: 1,
        presentationsUpdated: 1,
        presentationsUnchanged: 1,
        presentationsFailed: 0,
        pendingReviewCount: 0,
        totalRows: 10,
      },
    };

    renderWithTheme(<ReceiptSummaryCard {...summaryCardProps} />);

    expect(screen.getByText("Carga completada")).toBeInTheDocument();
    expect(screen.getByText("4 productos y 3 presentaciones procesadas de 10 filas")).toBeInTheDocument();
    expect(screen.getByText("4 productos")).toBeInTheDocument();
    expect(screen.getByText("2 nuevos")).toBeInTheDocument();
    expect(screen.getByText("3 presentaciones")).toBeInTheDocument();
  });
});
