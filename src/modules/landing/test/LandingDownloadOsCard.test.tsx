import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingDownloadOsCard from "../pages/LandingPage/components/LandingDownloadOsCard";
import { getDesktopDownloadTargets } from "../helpers/getDesktopDownloadTargets";

const [windowsTarget, linuxTarget] = getDesktopDownloadTargets();

describe("LandingDownloadOsCard", () => {
  it("renderiza el nombre, la descripción y el link de descarga del sistema operativo", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingDownloadOsCard target={windowsTarget} />
      </ThemeProvider>
    );

    expect(screen.getByText("Windows")).toBeInTheDocument();
    expect(screen.getByText("Compatible con Windows 10 y 11")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: "Descargar para Windows" });
    expect(link).toHaveAttribute("href", windowsTarget.href);
    expect(link).not.toHaveAttribute("target");
  });

  it("usa un botón lleno para el target primario y contorneado para el secundario", () => {
    const { container: windowsContainer } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingDownloadOsCard target={windowsTarget} />
      </ThemeProvider>
    );
    const { container: linuxContainer } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingDownloadOsCard target={linuxTarget} />
      </ThemeProvider>
    );

    const windowsButton = windowsContainer.querySelector('a[href]') as HTMLElement;
    const linuxButton = linuxContainer.querySelector('a[href]') as HTMLElement;

    expect(windowsButton.className).toContain("MuiButton-contained");
    expect(linuxButton.className).toContain("MuiButton-outlined");
  });

  it("renderiza la onda decorativa violeta al pie de la card", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingDownloadOsCard target={windowsTarget} />
      </ThemeProvider>
    );

    const svg = container.querySelector('svg[viewBox="0 0 1440 120"]') as SVGElement;
    expect(svg).toBeInTheDocument();
    expect(getComputedStyle(svg).color).toBe("rgb(166, 92, 255)");
  });

  it("renderiza la imagen ilustrativa propia de cada sistema operativo", () => {
    const { container: windowsContainer } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingDownloadOsCard target={windowsTarget} />
      </ThemeProvider>
    );
    const { container: linuxContainer } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingDownloadOsCard target={linuxTarget} />
      </ThemeProvider>
    );

    expect(windowsContainer.querySelector("img")).toHaveAttribute("src", windowsTarget.illustrationSrc);
    expect(linuxContainer.querySelector("img")).toHaveAttribute("src", linuxTarget.illustrationSrc);
  });

  it("Linux descarga el archivo directo en la misma pestaña, sin target=_blank", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingDownloadOsCard target={linuxTarget} />
      </ThemeProvider>
    );

    const link = screen.getByRole("link", { name: "Descargar para Linux" });
    expect(link).toHaveAttribute("href", linuxTarget.href);
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("ofrece el link secundario del AppImage cuando el target lo define", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingDownloadOsCard target={linuxTarget} />
      </ThemeProvider>
    );

    const secondaryLink = screen.getByRole("link", { name: "¿Otra distro? Descargá el AppImage" });
    expect(secondaryLink).toHaveAttribute("href", linuxTarget.secondaryDownload?.href);
  });

  it("no renderiza link secundario cuando el target no lo define", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingDownloadOsCard target={windowsTarget} />
      </ThemeProvider>
    );

    expect(screen.queryByText("¿Otra distro? Descargá el AppImage")).not.toBeInTheDocument();
  });
});
