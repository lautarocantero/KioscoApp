import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarMobileNavRow from "../SidebarMobileNavRow";

describe("SidebarMobileNavRow", () => {
  it("muestra el label y dispara onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(<SidebarMobileNavRow icon={<span />} label="Ventas" isActive={false} onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Ventas" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("marca aria-current cuando está activo", () => {
    renderWithTheme(<SidebarMobileNavRow icon={<span />} label="Ventas" isActive onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Ventas" })).toHaveAttribute("aria-current", "page");
  });
});
