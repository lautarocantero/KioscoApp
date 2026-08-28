import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarSellButton from "../SidebarSellButton";

describe("SidebarSellButton", () => {
  it("dispara onClick al tocarlo", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(<SidebarSellButton isActive={false} onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Vender" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("marca aria-current='page' cuando está activo", () => {
    renderWithTheme(<SidebarSellButton isActive onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Vender" })).toHaveAttribute("aria-current", "page");
  });

  it("no tiene aria-current cuando no está activo", () => {
    renderWithTheme(<SidebarSellButton isActive={false} onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Vender" })).not.toHaveAttribute("aria-current");
  });

  it("variant=rail (default) muestra el label 'Vender' bajo el ícono", () => {
    renderWithTheme(<SidebarSellButton isActive={false} onClick={vi.fn()} />);

    expect(screen.getByText("Vender")).toBeInTheDocument();
  });

  it("variant=fab (mobile) no repite el label, es solo ícono", () => {
    renderWithTheme(<SidebarSellButton isActive={false} onClick={vi.fn()} variant="fab" />);

    expect(screen.queryByText("Vender")).not.toBeInTheDocument();
  });
});
