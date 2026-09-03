import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartHandGrab from "../../components/CartComponent/CartHandGrab";

describe("CartHandGrab", () => {
  it("dibuja la mano como ilustración decorativa", () => {
    const { container } = renderWithTheme(
      <CartHandGrab style={{ transform: "translate(0px, 0px) rotate(0deg)", opacity: 1 }} />
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveStyle({ opacity: "1" });
  });

  it("aplica la posición oculta cuando así lo indica el style", () => {
    const { container } = renderWithTheme(
      <CartHandGrab style={{ transform: "translate(220px, -310px) rotate(14deg)", opacity: 0 }} />
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveStyle({ opacity: "0" });
  });
});
