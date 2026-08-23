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
      expect(target.descriptionKey).toMatch(/^landing\.download\./);
    });
  });

  it("marca a Windows como target primario y a Linux como secundario", () => {
    const targets = getDesktopDownloadTargets();

    const windows = targets.find((target) => target.os === OperatingSystemEnum.Windows)!;
    const linux = targets.find((target) => target.os === OperatingSystemEnum.Linux)!;

    expect(windows.isPrimary).toBe(true);
    expect(linux.isPrimary).toBe(false);
  });
});
