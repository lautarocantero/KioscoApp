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
});
