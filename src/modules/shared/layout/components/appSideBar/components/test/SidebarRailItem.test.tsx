import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { OptionLink } from "@typings/ui/layout.types";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarRailItem from "../SidebarRailItem";

const link: OptionLink = { description: "Ventas", icon: <span>icon</span>, url: "/sells" };

describe("SidebarRailItem", () => {
  it("dispara onClick con el link al tocarlo", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(<SidebarRailItem link={link} isActive={false} onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Ventas" }));

    expect(onClick).toHaveBeenCalledWith(link);
  });

  it("marca aria-current='page' cuando está activo", () => {
    renderWithTheme(<SidebarRailItem link={link} isActive onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Ventas" })).toHaveAttribute("aria-current", "page");
  });

  it("no marca aria-current cuando no está activo", () => {
    renderWithTheme(<SidebarRailItem link={link} isActive={false} onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Ventas" })).not.toHaveAttribute("aria-current");
  });
});
