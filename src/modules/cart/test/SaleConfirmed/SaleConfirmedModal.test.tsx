import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import SaleConfirmedModal from "../../components/SaleConfirmed/SaleConfirmedModal";
import type { SaleConfirmedModalProps } from "@typings/cart/cartComponentTypes";
import type { TicketSummaryType } from "@typings/sells/sellTypes";
import { PaymentMethod } from "@typings/sells/sellsEnum";

const ticketSummary: TicketSummaryType = {
  sellId: "sell-1",
  ticketNumber: "sell-1",
  date: "01/09/2026",
  total: 1000,
  productsCount: 2,
  paymentMethod: PaymentMethod.Cash,
  sellerName: "Lautaro",
  change: 200,
};

const buildProps = (overrides: Partial<SaleConfirmedModalProps> = {}): SaleConfirmedModalProps => ({
  open: true,
  progress: 100,
  remainingSeconds: 4,
  isPaused: false,
  ticketSummary,
  onClose: vi.fn(),
  onPause: vi.fn(),
  onResume: vi.fn(),
  onPrintTicket: vi.fn(),
  goToTicketDetail: vi.fn(),
  ...overrides,
});

describe("SaleConfirmedModal", () => {
  it("no renderiza nada si no hay ticketSummary", () => {
    render(<SaleConfirmedModal {...buildProps({ ticketSummary: null })} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("muestra el total, el vuelto y los datos del ticket cuando está abierto", () => {
    renderWithTheme(<SaleConfirmedModal {...buildProps()} />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/1\.000,00/)).toBeInTheDocument();
    expect(screen.getByText(/200,00/)).toBeInTheDocument();
    expect(screen.getByText("Lautaro")).toBeInTheDocument();
  });

  it("dispara onClose al hacer click en el botón de cerrar", async () => {
    const props = buildProps();
    renderWithTheme(<SaleConfirmedModal {...props} />);

    await userEvent.click(screen.getByRole("button", { name: /cerrar/i }));
    expect(props.onClose).toHaveBeenCalled();
  });

  it("dispara onPrintTicket y goToTicketDetail desde las acciones", async () => {
    const props = buildProps();
    renderWithTheme(<SaleConfirmedModal {...props} />);

    await userEvent.click(screen.getByText("Imprimir ticket"));
    expect(props.onPrintTicket).toHaveBeenCalled();

    await userEvent.click(screen.getByText("Ver detalle de ticket"));
    expect(props.goToTicketDetail).toHaveBeenCalled();
  });

  it("muestra el aviso de pausa cuando isPaused es true", () => {
    renderWithTheme(<SaleConfirmedModal {...buildProps({ isPaused: true })} />);
    expect(screen.getByText(/pausado/i)).toBeInTheDocument();
  });
});
