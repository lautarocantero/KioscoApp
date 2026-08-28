import { describe, it, expect } from "vitest";
import { normalizeSearchText } from "../../helpers/normalizeSearchText";

describe("normalizeSearchText", () => {
  it("pasa a minúsculas", () => {
    expect(normalizeSearchText("ARROZ")).toBe("arroz");
  });

  it("quita acentos para que 'almacen' matchee 'Almacén'", () => {
    expect(normalizeSearchText("Almacén")).toBe("almacen");
  });

  it("no rompe con texto ya normalizado", () => {
    expect(normalizeSearchText("coca cola")).toBe("coca cola");
  });
});
