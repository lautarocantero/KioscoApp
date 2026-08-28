import { describe, it, expect } from "vitest";
import { getInitials } from "../../helpers/getInitials";

describe("getInitials", () => {
  it("devuelve las 2 primeras letras cuando el nombre es una sola palabra", () => {
    expect(getInitials("Kiosco")).toBe("KI");
  });

  it("devuelve la inicial de cada una de las 2 primeras palabras", () => {
    expect(getInitials("Kiosco Centro")).toBe("KC");
  });

  it("ignora palabras extra más allá de la segunda", () => {
    expect(getInitials("Kiosco del Centro Norte")).toBe("KD");
  });

  it("ignora espacios repetidos o al borde", () => {
    expect(getInitials("  Kiosco   Centro  ")).toBe("KC");
  });

  it("devuelve string vacío si el nombre está vacío", () => {
    expect(getInitials("")).toBe("");
    expect(getInitials("   ")).toBe("");
  });
});
