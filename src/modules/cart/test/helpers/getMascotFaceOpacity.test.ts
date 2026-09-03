import { describe, it, expect } from "vitest";
import { getMascotFaceOpacity } from "../../helpers/getMascotFaceOpacity";

describe("getMascotFaceOpacity", () => {
  it("devuelve opacidad total cuando el carrito está vacío", () => {
    expect(getMascotFaceOpacity(true)).toBe(1);
  });

  it("devuelve una opacidad baja de marca de agua cuando tiene ítems", () => {
    expect(getMascotFaceOpacity(false)).toBe(0.07);
  });
});
