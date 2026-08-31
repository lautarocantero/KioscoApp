import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartSectionLabel from "../../components/CartComponent/CartSectionLabel";

describe("CartSectionLabel", () => {
  it("renderiza el ícono y el label", () => {
    renderWithTheme(<CartSectionLabel icon={<span data-testid="icon" />} label="Forma de pago" />);

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Forma de pago")).toBeInTheDocument();
  });
});
