import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import type { OptionLink } from "@typings/ui/layout.types";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarSectionHeader from "../SidebarSectionHeader";

describe("SidebarSectionHeader", () => {
  it("muestra la descripción del link como título", () => {
    const link: OptionLink = { description: "Productos", icon: <span />, url: "/products" };

    renderWithTheme(<SidebarSectionHeader link={link} />);

    expect(screen.getByRole("heading", { name: "Productos" })).toBeInTheDocument();
  });

  it("muestra el subtítulo estático cuando el link no trae useData", () => {
    const link: OptionLink = { description: "Tienda", icon: <span />, url: "/shop", subtitle: "Resumen general del negocio" };

    renderWithTheme(<SidebarSectionHeader link={link} />);

    expect(screen.getByText("Resumen general del negocio")).toBeInTheDocument();
  });

  it("resuelve el subtítulo con dato real cuando el link trae useData", () => {
    const link: OptionLink = {
      description: "Ventas",
      icon: <span />,
      url: "/sells",
      subtitle: "estático",
      useData: () => ({ value: 12, subtitle: "Hoy · 12 ventas", isLoading: false }),
    };

    renderWithTheme(<SidebarSectionHeader link={link} />);

    expect(screen.getByText("Hoy · 12 ventas")).toBeInTheDocument();
    expect(screen.queryByText("estático")).not.toBeInTheDocument();
  });

  it("muestra un skeleton mientras useData está cargando", () => {
    const link: OptionLink = {
      description: "Ventas",
      icon: <span />,
      url: "/sells",
      useData: () => ({ value: null, subtitle: null, isLoading: true }),
    };

    const { container } = renderWithTheme(<SidebarSectionHeader link={link} />);

    expect(container.querySelector(".MuiSkeleton-root")).not.toBeNull();
  });
});
