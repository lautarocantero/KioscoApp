import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarKioscoSwitcher from "../SidebarKioscoSwitcher";

describe("SidebarKioscoSwitcher", () => {
  it("muestra las iniciales de la tienda activa", () => {
    renderWithTheme(<SidebarKioscoSwitcher name="Kiosco Centro" initials="KC" isActive={false} onClick={vi.fn()} />);

    expect(screen.getByText("KC")).toBeInTheDocument();
  });

  it("dispara onClick al tocarlo", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(<SidebarKioscoSwitcher name="Kiosco Centro" initials="KC" isActive={false} onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Tienda activa: Kiosco Centro" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
