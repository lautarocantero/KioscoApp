import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { CartButtonComponentProps } from "@typings/seller/sellerComponentTypes";
import CartButtonComponent from "../../components/CatalogHeader/CartButtonComponent";

const testTheme = createTheme({
  palette: {
    secondary: { main: "rgb(10, 20, 30)" },
  },
  custom: {
    darkMain: "rgb(255, 255, 255)",
  },
} as any);

const buildCart = (
  overrides: Partial<CartButtonComponentProps["cart"]> = {}
): CartButtonComponentProps["cart"] => ({
  goToCart: vi.fn(),
  count: 3,
  ...overrides,
});

const renderWithTheme = (cart: CartButtonComponentProps["cart"]) =>
  render(
    <ThemeProvider theme={testTheme}>
      <CartButtonComponent cart={cart} />
    </ThemeProvider>
  );

describe("CartButtonComponent", () => {
  it("muestra la cantidad de productos en el badge", () => {
    render(<CartButtonComponent cart={buildCart({ count: 5 })} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("llama a goToCart al hacer click", async () => {
    const cart = buildCart();
    render(<CartButtonComponent cart={cart} />);
    await userEvent.click(screen.getByText("3"));
    expect(cart.goToCart).toHaveBeenCalledTimes(1);
  });

  it("renderiza el badge vacío cuando count es undefined", () => {
    const { container } = render(<CartButtonComponent cart={buildCart({ count: undefined })} />);
    expect(container.querySelector(".cart-badge")).toHaveTextContent("");
  });

  it("usa darkMain como color cuando el carrito está vacío (count 0)", () => {
    renderWithTheme(buildCart({ count: 0 }));
    const badge = screen.getByText("0");
    expect(badge).toHaveStyle({ color: "rgb(255, 255, 255)" });
  });

  it("usa darkMain como color cuando count es undefined", () => {
    renderWithTheme(buildCart({ count: undefined }));
    const badge = document.querySelector(".cart-badge");
    expect(badge).toHaveStyle({ color: "rgb(255, 255, 255)" });
  });

  it("usa secondary.main como color cuando hay productos en el carrito", () => {
    renderWithTheme(buildCart({ count: 4 }));
    const badge = screen.getByText("4");
    expect(badge).toHaveStyle({ color: "rgb(10, 20, 30)" });
  });
});