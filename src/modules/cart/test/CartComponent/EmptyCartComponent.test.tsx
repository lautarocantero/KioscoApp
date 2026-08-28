import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import EmptyCartComponent from "../../components/CartComponent/EmptyCartComponent";

describe("EmptyCartComponent", () => {
  it("muestra el título y la descripción del carrito vacío", () => {
    renderWithTheme(<EmptyCartComponent />);

    expect(screen.getByText("¡Agrega productos al carrito!")).toBeInTheDocument();
    expect(screen.getByAltText("Carrito vacío")).toBeInTheDocument();
  });
});
