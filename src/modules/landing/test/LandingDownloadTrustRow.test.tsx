import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingDownloadTrustRow from "../pages/LandingPage/components/LandingDownloadTrustRow";
import { getLandingDownloadTrustPoints } from "../helpers/getLandingDownloadTrustPoints";

describe("LandingDownloadTrustRow", () => {
  it("renderiza título y subtítulo de cada punto de confianza", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingDownloadTrustRow points={getLandingDownloadTrustPoints()} />
      </ThemeProvider>
    );

    expect(screen.getByText("Seguro y confiable")).toBeInTheDocument();
    expect(screen.getByText("Sin virus ni malware")).toBeInTheDocument();
    expect(screen.getByText("Instalación rápida")).toBeInTheDocument();
    expect(screen.getByText("En pocos pasos")).toBeInTheDocument();
    expect(screen.getByText("Actualizaciones automáticas")).toBeInTheDocument();
    expect(screen.getByText("Siempre al día")).toBeInTheDocument();
  });
});
