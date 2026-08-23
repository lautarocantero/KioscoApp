import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingFeatureShowcaseRow from "../pages/LandingPage/components/LandingFeatureShowcaseRow";
import { getLandingFeatureShowcase } from "../helpers/getLandingFeatureShowcase";

const productsStockItem = getLandingFeatureShowcase().find((item) => item.badgeKey.includes("productsStock"))!;

describe("LandingFeatureShowcaseRow", () => {
  it("renderiza el badge, el título completo, el subtítulo y los 3 bullets", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseRow item={productsStockItem} reverse={false} />
      </ThemeProvider>
    );

    expect(screen.getByText("Todo tu inventario bajo control.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Productos y stock siempre al día" })).toBeInTheDocument();
    expect(
      screen.getByText("Controlá tus productos, presentaciones y stock en tiempo real. Evitá faltantes y optimizá tus compras.")
    ).toBeInTheDocument();
    expect(screen.getByText("Gestión de productos")).toBeInTheDocument();
    expect(screen.getByText("Múltiples presentaciones")).toBeInTheDocument();
    expect(screen.getByText("Alertas de stock bajo")).toBeInTheDocument();
  });

  it("renderiza el video de media con su alt descriptivo", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseRow item={productsStockItem} reverse />
      </ThemeProvider>
    );

    const video = screen.getByLabelText("Vista previa de la gestión de productos y stock en Stocko");
    expect(video).toHaveAttribute("src", productsStockItem.mediaVideoSrc);
  });
});
