import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartSummaryFooter from "../../components/CartComponent/CartSummaryFooter";
import { formatCurrency } from "../../helpers/formatCurrency";

// formatCurrency puede usar espacios "non-breaking" entre el símbolo y el
// monto; getByText normaliza el texto del DOM colapsando \s a un espacio
// común, así que hay que normalizar el string esperado de la misma forma.
const normalizeSpaces = (value: string): string => value.replace(/\s/g, " ");

describe("CartSummaryFooter", () => {
  it("muestra el total y el hint F9", () => {
    renderWithTheme(<CartSummaryFooter total={1210} onGenerateTicket={vi.fn()} />);

    expect(screen.getByText(normalizeSpaces(formatCurrency(1210)))).toBeInTheDocument();
    expect(screen.getByText("F9")).toBeInTheDocument();
  });

  it("deshabilita el botón 'Generar ticket' cuando el total es 0 (carrito vacío)", () => {
    renderWithTheme(<CartSummaryFooter total={0} onGenerateTicket={vi.fn()} />);
    expect(screen.getByRole("button", { name: /Generar ticket/ })).toBeDisabled();
  });

  it("llama a onGenerateTicket al clickear el botón con carrito no vacío", async () => {
    const onGenerateTicket = vi.fn();
    renderWithTheme(<CartSummaryFooter total={1210} onGenerateTicket={onGenerateTicket} />);

    await userEvent.click(screen.getByRole("button", { name: /Generar ticket/ }));

    expect(onGenerateTicket).toHaveBeenCalledTimes(1);
  });
});
