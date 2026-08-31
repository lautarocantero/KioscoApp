import { describe, it, expect } from "vitest";
import { buildChipOptions } from "../../helpers/buildChipOptions";

describe("buildChipOptions", () => {
  it("mapea cada valor a { value, label } usando getLabel", () => {
    const result = buildChipOptions(["a", "b"], (v) => v.toUpperCase());
    expect(result).toEqual([
      { value: "a", label: "A" },
      { value: "b", label: "B" },
    ]);
  });

  it("devuelve un array vacío si no hay valores", () => {
    expect(buildChipOptions([], (v) => v)).toEqual([]);
  });
});
