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
      expect(target.illustrationSrc).toMatch(/^\/images\/icons\/decoration\/.+\.png$/);
    });
  });

  it("marca a Windows como target primario y a Linux como secundario", () => {
    const targets = getDesktopDownloadTargets();

    const windows = targets.find((target) => target.os === OperatingSystemEnum.Windows)!;
    const linux = targets.find((target) => target.os === OperatingSystemEnum.Linux)!;

    expect(windows.isPrimary).toBe(true);
    expect(linux.isPrimary).toBe(false);
  });

  it("Linux descarga el .deb directo del último release; Windows todavía manda a la página de releases", () => {
    const targets = getDesktopDownloadTargets();

    const windows = targets.find((target) => target.os === OperatingSystemEnum.Windows)!;
    const linux = targets.find((target) => target.os === OperatingSystemEnum.Linux)!;

    expect(windows.opensInNewTab).toBe(true);
    expect(windows.href).toBe("https://github.com/lautarocantero/KioscoApp/releases");

    expect(linux.opensInNewTab).toBe(false);
    expect(linux.href).toBe("https://github.com/lautarocantero/KioscoApp/releases/latest/download/Stocko-Linux.deb");
  });

  it("Linux ofrece el AppImage como alternativa secundaria", () => {
    const targets = getDesktopDownloadTargets();
    const linux = targets.find((target) => target.os === OperatingSystemEnum.Linux)!;

    expect(linux.secondaryDownload?.href).toBe(
      "https://github.com/lautarocantero/KioscoApp/releases/latest/download/Stocko-Linux.AppImage"
    );
    expect(linux.secondaryDownload?.labelKey).toBe("landing.download.appImageAlternative");
  });
});
