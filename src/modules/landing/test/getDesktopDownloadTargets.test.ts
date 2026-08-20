import { describe, it, expect } from "vitest";
import { getDesktopDownloadTargets } from "../helpers/getDesktopDownloadTargets";
import { OperatingSystemEnum } from "@typings/landing/landingEnums";

describe("getDesktopDownloadTargets", () => {
  it("devuelve un target por cada sistema operativo soportado con href válido", () => {
    const targets = getDesktopDownloadTargets();

    expect(targets.map((target) => target.os)).toEqual([
      OperatingSystemEnum.Windows,
      OperatingSystemEnum.Linux,
    ]);
    targets.forEach((target) => {
      expect(target.href).toMatch(/^https:\/\//);
      expect(target.Icon).toBeDefined();
    });
  });
});
