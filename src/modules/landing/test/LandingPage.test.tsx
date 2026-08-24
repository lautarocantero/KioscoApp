import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@i18n/i18n";
import LandingPage from "../pages/LandingPage/LandingPage";

describe("LandingPage", () => {
  it("renderiza el hero, las features y la descarga", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );

    expect(screen.getAllByRole("img", { name: "Stocko" }).length).toBeGreaterThan(0);
    expect(screen.getByText("Ventas, productos, stock, proveedores y boletas. Todo tu negocio en un solo lugar.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Productos y stock siempre al día" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Múltiples kioscos en un solo lugar" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Llevá Stocko a tu escritorio" })).toBeInTheDocument();
  });
});
