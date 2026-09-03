import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartBagHandles from "../../components/CartComponent/CartBagHandles";

describe("CartBagHandles", () => {
  it("dibuja las dos asas como paths decorativos", () => {
    const { container } = renderWithTheme(<CartBagHandles />);

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("path")).toHaveLength(2);
  });

  it("aplica el transform de apretón que recibe por props", () => {
    const { container } = renderWithTheme(<CartBagHandles style={{ transform: "scaleY(0.9) scaleX(0.97)" }} />);

    const svg = container.querySelector("svg");
    expect(svg).toHaveStyle({ transform: "scaleY(0.9) scaleX(0.97)" });
  });
});
