import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import SellPageHeader from "../../components/CatalogHeader/SellPageHeader";

describe("SellPageHeader", () => {
  it("renderiza el título, el subtítulo con kiosco/vendedor/fecha y los atajos", () => {
    renderWithTheme(
      <SellPageHeader kioscoName="Kiosco Belgrano 1420" sellerName="Lautaro C." dateLabel="Vie 28 · 18:40" />
    );

    expect(screen.getByRole("heading", { name: "Nueva venta" })).toBeInTheDocument();
    expect(screen.getByText("Kiosco Belgrano 1420 · Lautaro C. · Vie 28 · 18:40")).toBeInTheDocument();
    expect(screen.getByText("/")).toBeInTheDocument();
    expect(screen.getByText("F2")).toBeInTheDocument();
    expect(screen.getByText("F9")).toBeInTheDocument();
  });
});
