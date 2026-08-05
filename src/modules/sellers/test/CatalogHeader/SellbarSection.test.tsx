import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SellbarSection from "../../components/CatalogHeader/SellBarSection";


describe("SellbarSection", () => {
  it("renderiza el título y los children directamente cuando flexContent es false", () => {
    render(
      <SellbarSection gridArea="search" title="Búsqueda">
        <span>contenido</span>
      </SellbarSection>
    );
    expect(screen.getByText("Búsqueda")).toBeInTheDocument();
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });

  it("envuelve los children en un contenedor flex cuando flexContent es true", () => {
    render(
      <SellbarSection gridArea="quickactions" title="Acciones rápidas" flexContent>
        <span>a</span>
        <span>b</span>
      </SellbarSection>
    );
    expect(screen.getByText("Acciones rápidas")).toBeInTheDocument();
    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("b")).toBeInTheDocument();
  });
});