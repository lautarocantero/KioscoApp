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
    expect(screen.getByRole("heading", { name: "Stock y ventas en un solo lugar" })).toBeInTheDocument();
    expect(screen.getByText("El stock se actualiza solo con cada venta")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Cargás la mercadería una sola vez" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Varios kioscos, una sola cuenta" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Llevá Stocko a tu escritorio" })).toBeInTheDocument();
  });
});
