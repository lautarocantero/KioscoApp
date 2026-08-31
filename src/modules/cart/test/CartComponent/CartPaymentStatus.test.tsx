import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartPaymentStatus from "../../components/CartComponent/CartPaymentStatus";
import { useCartPaymentStatusForm } from "../../../../hooks/cart/useCartPaymentStatusForm";
import { SellStatusEnum } from "@typings/sells/sellsEnum";

vi.mock("../../../../hooks/cart/useCartPaymentStatusForm");

const mockedHook = vi.mocked(useCartPaymentStatusForm);

const buildReturn = (overrides: Partial<ReturnType<typeof useCartPaymentStatusForm>> = {}) => ({
  values: { payment_method: "cash", status: SellStatusEnum.Completada, amount_paid: null, debtor_name: null },
  errors: {},
  touched: {},
  isPartial: false,
  maxAmountPaid: 999,
  setFieldValue: vi.fn(),
  setStatus: vi.fn(),
  handleAmountPaidChange: vi.fn(),
  handleBlur: vi.fn(),
  options: [
    { value: SellStatusEnum.Completada, label: "Abono total" },
    { value: SellStatusEnum.Parcial, label: "Abono parcial" },
  ],
  ...overrides,
} as unknown as ReturnType<typeof useCartPaymentStatusForm>);

describe("CartPaymentStatus", () => {
  it("no renderiza nada cuando el total es 0", () => {
    mockedHook.mockReturnValue(buildReturn());
    const { container } = renderWithTheme(<CartPaymentStatus total={0} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("no muestra los campos de deuda cuando el estado es completo", () => {
    mockedHook.mockReturnValue(buildReturn());
    renderWithTheme(<CartPaymentStatus total={100} />);

    expect(screen.queryByLabelText("Precio pagado")).not.toBeInTheDocument();
  });

  it("llama a setStatus con Parcial al clickear el chip", async () => {
    const setStatus = vi.fn();
    mockedHook.mockReturnValue(buildReturn({ setStatus }));
    renderWithTheme(<CartPaymentStatus total={100} />);

    await userEvent.click(screen.getByText("Abono parcial"));

    expect(setStatus).toHaveBeenCalledWith(SellStatusEnum.Parcial);
  });

  it("muestra los campos de monto pagado y deudor cuando el estado es parcial", () => {
    mockedHook.mockReturnValue(buildReturn({ isPartial: true }));
    renderWithTheme(<CartPaymentStatus total={100} />);

    expect(screen.getByLabelText("Precio pagado")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre del moroso")).toBeInTheDocument();
  });
});
