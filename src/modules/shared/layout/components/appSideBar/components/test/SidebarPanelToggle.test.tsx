import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarPanelToggle from "../SidebarPanelToggle";

describe("SidebarPanelToggle", () => {
  it("dispara onClick al tocar 'Ocultar panel'", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    renderWithTheme(<SidebarPanelToggle onClick={onClick} />);

    await user.click(screen.getByRole("button", { name: "Ocultar panel" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
