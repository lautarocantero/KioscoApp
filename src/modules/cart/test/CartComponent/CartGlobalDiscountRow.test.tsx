import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartGlobalDiscountRow from "../../components/CartComponent/CartGlobalDiscountRow";
import { formatCurrency } from "../../helpers/formatCurrency";

// formatCurrency puede usar espacios non-breaking (u00A0) entre el simbolo
// y el monto; getByText normaliza el texto del DOM colapsando \s a un
// espacio comun, asi que hay que normalizar el string esperado igual.
const normalizeSpaces = (value: string): string => value.replace(/\s/g, " ");

describe("CartGlobalDiscountRow", () => {
  it("muestra el monto descontado formateado", () => {
    renderWithTheme(<CartGlobalDiscountRow globalDiscount="10" onGlobalDiscountChange={vi.fn()} discountAmount={140} />);
    expect(screen.getByText(normalizeSpaces(`− ${formatCurrency(140)}`))).toBeInTheDocument();
  });

  it("muestra el input vacío (no '0') cuando no hay descuento cargado", () => {
    renderWithTheme(<CartGlobalDiscountRow globalDiscount="0" onGlobalDiscountChange={vi.fn()} discountAmount={0} />);
    expect(screen.getByRole("textbox", { name: "Descuento global" })).toHaveValue("");
  });

  it("llama a onGlobalDiscountChange al tipear en el input", async () => {
    const onGlobalDiscountChange = vi.fn();
    renderWithTheme(<CartGlobalDiscountRow globalDiscount="0" onGlobalDiscountChange={onGlobalDiscountChange} discountAmount={0} />);

    await userEvent.type(screen.getByRole("textbox", { name: "Descuento global" }), "5");

    expect(onGlobalDiscountChange).toHaveBeenCalledWith("5");
  });
});
