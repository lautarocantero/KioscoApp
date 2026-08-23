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
    expect(link).toHaveAttribute("target", "_blank");
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
});
