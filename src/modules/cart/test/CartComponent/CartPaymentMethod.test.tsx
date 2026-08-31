import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartPaymentMethod from "../../components/CartComponent/CartPaymentMethod";
import { useCartPaymentMethodForm } from "../../../../hooks/cart/useCartPaymentMethodForm";
import { PaymentMethod, SellStatusEnum } from "@typings/sells/sellsEnum";

vi.mock("../../../../hooks/cart/useCartPaymentMethodForm");

const mockedHook = vi.mocked(useCartPaymentMethodForm);

const OPTIONS = [
  { value: PaymentMethod.Cash, label: "Efectivo" },
  { value: PaymentMethod.Debit, label: "Débito" },
  { value: PaymentMethod.Credit, label: "Crédito" },
  { value: PaymentMethod.Transfer, label: "Transferencia" },
];

const buildValues = (payment_method: PaymentMethod) => ({
  payment_method,
  status: SellStatusEnum.Completada,
  amount_paid: null,
  debtor_name: null,
});

describe("CartPaymentMethod", () => {
  it("no renderiza nada cuando el total es 0", () => {
    mockedHook.mockReturnValue({ setPaymentMethod: vi.fn(), values: buildValues(PaymentMethod.Cash), options: OPTIONS });
    const { container } = renderWithTheme(<CartPaymentMethod total={0} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza las 4 chips y llama a setPaymentMethod al clickear una", async () => {
    const setPaymentMethod = vi.fn();
    mockedHook.mockReturnValue({ setPaymentMethod, values: buildValues(PaymentMethod.Cash), options: OPTIONS });

    renderWithTheme(<CartPaymentMethod total={100} />);

    expect(screen.getAllByRole("radio")).toHaveLength(4);
    await userEvent.click(screen.getByText("Débito"));

    expect(setPaymentMethod).toHaveBeenCalledWith(PaymentMethod.Debit);
  });

  it("marca como seleccionada la opción activa", () => {
    mockedHook.mockReturnValue({ setPaymentMethod: vi.fn(), values: buildValues(PaymentMethod.Credit), options: OPTIONS });

    renderWithTheme(<CartPaymentMethod total={100} />);

    expect(screen.getByText("Crédito")).toHaveAttribute("aria-checked", "true");
  });
});
