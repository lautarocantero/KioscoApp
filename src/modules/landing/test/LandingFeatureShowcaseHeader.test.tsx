import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingFeatureShowcaseHeader from "../pages/LandingPage/components/LandingFeatureShowcaseHeader";
import { getLandingFeatureShowcase } from "../helpers/getLandingFeatureShowcase";

const multiKioscoItem = getLandingFeatureShowcase().find((item) => item.badgeKey.includes("multiKiosco"))!;

describe("LandingFeatureShowcaseHeader", () => {
  it("renderiza el badge, el título completo, la descripción y el ahorro", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseHeader item={multiKioscoItem} reverse={false} />
      </ThemeProvider>
    );

    expect(screen.getByText("Multi-local")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Varios kioscos, una sola cuenta" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "Manejá todos tus locales desde el mismo lugar. Cambiás de kiosco con un clic y cada uno mantiene su stock, sus ventas y su equipo, sin mezclar números."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Te ahorra: Una sola cuenta y un control por cada local")).toBeInTheDocument();
  });
});
