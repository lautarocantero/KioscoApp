import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import TicketSummaryDetailsComponent from "../../components/OrderConfirmed/TicketSummaryDetailsComponent";

describe("TicketSummaryDetailsComponent", () => {
  it("renderiza la información del ticket cuando existe resumen", () => {
    renderWithTheme(
      <TicketSummaryDetailsComponent
        ticketSummary={{
          sellId: "1",
          ticketNumber: "T-1",
          date: "12/08/2026",
          total: 1500,
          productsCount: 3,
          paymentMethod: "transferencia",
        } as any}
      />
    );

    expect(screen.getByText("Productos")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Pago")).toBeInTheDocument();
    expect(screen.getByText("Fecha")).toBeInTheDocument();
  });

  it("devuelve null cuando no hay ticketSummary", () => {
    const { container } = renderWithTheme(<TicketSummaryDetailsComponent ticketSummary={null} />);
    expect(container.firstChild).toBeNull();
  });
});
