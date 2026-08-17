import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../../../../test/utils/setupTests";
import SidebarUserSettings from "../SidebarUserSettings";

describe("SidebarUserSettings", () => {
  it("dispara onOpenSettings al hacer click en el engranaje (sidebar expandido)", async () => {
    const user = userEvent.setup();
    const onOpenSettings = vi.fn();

    renderWithTheme(<SidebarUserSettings isExpanded onOpenSettings={onOpenSettings} />);

    await user.click(screen.getByRole("button", { name: "Abrir ajustes" }));

    expect(onOpenSettings).toHaveBeenCalledTimes(1);
  });

  it("sigue visible y funcional cuando el sidebar está colapsado (arriba del avatar)", async () => {
    const user = userEvent.setup();
    const onOpenSettings = vi.fn();

    renderWithTheme(<SidebarUserSettings isExpanded={false} onOpenSettings={onOpenSettings} />);

    const button = screen.getByRole("button", { name: "Abrir ajustes" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ order: "-1" });

    await user.click(button);
    expect(onOpenSettings).toHaveBeenCalledTimes(1);
  });
});
