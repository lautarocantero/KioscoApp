import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingFeatureShowcaseBand from "../pages/LandingPage/components/LandingFeatureShowcaseBand";
import { getLandingFeatureShowcase } from "../helpers/getLandingFeatureShowcase";

const productsStockItem = getLandingFeatureShowcase().find((item) => item.badgeKey.includes("productsStock"))!;
const sellsReportsItem = getLandingFeatureShowcase().find((item) => item.badgeKey.includes("sellsReports"))!;
const NEXT_FILL_COLOR = "#ffffff";

describe("LandingFeatureShowcaseBand", () => {
  it("renderiza el contenido de la feature dentro de la band", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseBand item={productsStockItem} reverse={false} nextFillColor={NEXT_FILL_COLOR} waveVariant={0} />
      </ThemeProvider>
    );

    expect(screen.getByRole("heading", { name: "Cargás la mercadería una sola vez" })).toBeInTheDocument();
  });

  it("tiñe el fondo de toda la band (no solo una card) con el color de acento propio de cada feature", () => {
    const { container: productsStockContainer } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseBand item={productsStockItem} reverse={false} nextFillColor={NEXT_FILL_COLOR} waveVariant={0} />
      </ThemeProvider>
    );
    const { container: sellsReportsContainer } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseBand item={sellsReportsItem} reverse={false} nextFillColor={NEXT_FILL_COLOR} waveVariant={1} />
      </ThemeProvider>
    );

    const productsStockBand = productsStockContainer.firstChild as HTMLElement;
    const sellsReportsBand = sellsReportsContainer.firstChild as HTMLElement;

    expect(getComputedStyle(productsStockBand).backgroundColor).toContain("color-mix(in srgb,");
    expect(getComputedStyle(productsStockBand).backgroundColor).not.toBe(
      getComputedStyle(sellsReportsBand).backgroundColor
    );
  });

  it("renderiza la onda decorativa al pie, fundida con el color de la siguiente sección", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseBand item={productsStockItem} reverse={false} nextFillColor={NEXT_FILL_COLOR} waveVariant={0} />
      </ThemeProvider>
    );

    const svg = container.querySelector('svg[viewBox="0 0 1440 120"]') as SVGElement;
    expect(svg).toBeInTheDocument();
    expect(getComputedStyle(svg).color).toBe("rgb(255, 255, 255)");
  });

  it("pasa el waveVariant recibido a la onda, para que cada band tenga un patrón distinto", () => {
    const { container: variant0Container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseBand item={productsStockItem} reverse={false} nextFillColor={NEXT_FILL_COLOR} waveVariant={0} />
      </ThemeProvider>
    );
    const { container: variant1Container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseBand item={productsStockItem} reverse={false} nextFillColor={NEXT_FILL_COLOR} waveVariant={1} />
      </ThemeProvider>
    );

    const path0 = variant0Container.querySelector('svg[viewBox="0 0 1440 120"] path')?.getAttribute("d");
    const path1 = variant1Container.querySelector('svg[viewBox="0 0 1440 120"] path')?.getAttribute("d");

    expect(path0).not.toBe(path1);
  });
});
