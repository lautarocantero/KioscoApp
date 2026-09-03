import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import CartMascotFace from "../../components/CartComponent/CartMascotFace";

describe("CartMascotFace", () => {
  it("aplica la opacidad recibida y desplaza los ojos según eyeOffset", () => {
    const { container } = renderWithTheme(<CartMascotFace eyeOffset={{ x: 5, y: -3 }} opacity={0.5} />);

    const svg = container.querySelector("svg");
    expect(svg).toHaveStyle({ opacity: "0.5" });

    const eyesGroup = container.querySelector("g[transform='translate(5, -3)']");
    expect(eyesGroup).not.toBeNull();
    expect(eyesGroup?.querySelectorAll("rect")).toHaveLength(2);
  });

  it("es puramente decorativa (aria-hidden)", () => {
    const { container } = renderWithTheme(<CartMascotFace eyeOffset={{ x: 0, y: 0 }} opacity={1} />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });
});
