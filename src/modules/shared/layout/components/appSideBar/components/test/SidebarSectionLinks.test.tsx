import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarSectionLinks from "../SidebarSectionLinks";

describe("SidebarSectionLinks", () => {
  it("no renderiza nada si no hay destinos", () => {
    const { container } = renderWithTheme(
      <SidebarSectionLinks destinations={[]} isSubLinkActive={() => false} onNavigate={vi.fn()} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza cada destino y navega al hacer click", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    renderWithTheme(
      <SidebarSectionLinks
        destinations={[{ label: "Categorías", url: "/categories-list" }]}
        isSubLinkActive={() => false}
        onNavigate={onNavigate}
      />
    );

    await user.click(screen.getByRole("button", { name: "Categorías" }));

    expect(onNavigate).toHaveBeenCalledWith("/categories-list");
  });

  it("marca aria-current en el destino activo", () => {
    renderWithTheme(
      <SidebarSectionLinks
        destinations={[{ label: "Categorías", url: "/categories-list" }]}
        isSubLinkActive={(url) => url === "/categories-list"}
        onNavigate={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "Categorías" })).toHaveAttribute("aria-current", "page");
  });

  it("muestra el contador cuando el destino trae count > 0", () => {
    renderWithTheme(
      <SidebarSectionLinks
        destinations={[{ label: "Stock bajo", url: "/products?filter=low-stock", count: 3 }]}
        isSubLinkActive={() => false}
        onNavigate={vi.fn()}
      />
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("no muestra el contador cuando count es 0", () => {
    renderWithTheme(
      <SidebarSectionLinks
        destinations={[{ label: "Más vendidos", url: "/products", count: 0 }]}
        isSubLinkActive={() => false}
        onNavigate={vi.fn()}
      />
    );

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("muestra el label 'Páginas' asociado a la lista, para dejar claro que son clickeables", () => {
    renderWithTheme(
      <SidebarSectionLinks
        destinations={[{ label: "Categorías", url: "/categories-list" }]}
        isSubLinkActive={() => false}
        onNavigate={vi.fn()}
      />
    );

    const heading = screen.getByText("Páginas");
    expect(screen.getByRole("list")).toHaveAccessibleName("Páginas");
    expect(heading).toBeInTheDocument();
  });
});
