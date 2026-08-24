import { describe, it, expect } from "vitest";
import { LandingDecorationPosition } from "@typings/landing/landingEnums";
import { getDecorationPositionSx } from "../helpers/getDecorationPositionSx";

describe("getDecorationPositionSx", () => {
  it("ancla a la izquierda para bottom-left", () => {
    const sx = getDecorationPositionSx(LandingDecorationPosition.BottomLeft);
    expect(sx).toMatchObject({ left: expect.any(String), bottom: expect.any(String) });
    expect(sx).not.toHaveProperty("right");
  });

  it("ancla a la derecha para bottom-right", () => {
    const sx = getDecorationPositionSx(LandingDecorationPosition.BottomRight);
    expect(sx).toMatchObject({ right: expect.any(String), bottom: expect.any(String) });
    expect(sx).not.toHaveProperty("left");
  });
});
