import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarSectionAction from "../SidebarSectionAction";

describe("SidebarSectionAction", () => {
  it("muestra el label de la acción", () => {
    renderWithTheme(<SidebarSectionAction action={{ label: "Nuevo producto", url: "/product-create" }} onNavigate={vi.fn()} />);

    expect(screen.getByRole("button", { name: /Nuevo producto/ })).toBeInTheDocument();
  });

  it("navega a la url de la acción al hacer click", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();

    renderWithTheme(<SidebarSectionAction action={{ label: "Nuevo producto", url: "/product-create" }} onNavigate={onNavigate} />);

    await user.click(screen.getByRole("button", { name: /Nuevo producto/ }));

    expect(onNavigate).toHaveBeenCalledWith("/product-create");
  });
});
