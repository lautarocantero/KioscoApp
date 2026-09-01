import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingFeatureShowcaseRow from "../pages/LandingPage/components/LandingFeatureShowcaseRow";
import { getLandingFeatureShowcase } from "../helpers/getLandingFeatureShowcase";

const productsStockItem = getLandingFeatureShowcase().find((item) => item.badgeKey.includes("productsStock"))!;
const multiKioscoItem = getLandingFeatureShowcase().find((item) => item.badgeKey.includes("multiKiosco"))!;

describe("LandingFeatureShowcaseRow", () => {
  it("renderiza el badge, el título completo, la descripción, el ahorro y los 3 items", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseRow item={productsStockItem} reverse={false} />
      </ThemeProvider>
    );

    expect(screen.getByText("Stock")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cargás la mercadería una sola vez" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "El stock se descuenta solo con cada venta y te avisa antes de que falte lo que más sale. Un mismo producto puede venderse por unidad, pack o caja."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Te ahorra: Contar góndola y perder ventas por faltantes")).toBeInTheDocument();
    expect(screen.getByText("Alta de productos en un minuto")).toBeInTheDocument();
    expect(screen.getByText("Varias presentaciones")).toBeInTheDocument();
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

  it("no monta RolesPermissionsDialog en items sin cards clickeables", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseRow item={productsStockItem} reverse={false} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Alta de productos en un minuto"));

    expect(screen.queryByText("Roles y permisos")).not.toBeInTheDocument();
  });

  it("multi-kiosco: clickear la card 'Permisos por rol' abre RolesPermissionsDialog", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseRow item={multiKioscoItem} reverse={false} />
      </ThemeProvider>
    );

    expect(screen.queryByText("Roles y permisos")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Permisos por rol" }));

    expect(screen.getByText("Roles y permisos")).toBeInTheDocument();
  });
});
