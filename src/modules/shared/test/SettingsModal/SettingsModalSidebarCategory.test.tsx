import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../utils/setupTests";
import SettingsModalSidebarCategory from "../../components/SettingsModal/SettingsModalSidebarCategory";
import { SettingsCategoryEnum, SettingsSectionEnum } from "@typings/settings/settingsEnums";

const category = {
  id: SettingsCategoryEnum.Account,
  label: "Cuenta",
  icon: null,
  sections: [
    { id: SettingsSectionEnum.AccountInfo, label: "Información de cuenta" },
    { id: SettingsSectionEnum.AccountPassword, label: "Contraseña y seguridad" },
  ],
};

describe("SettingsModalSidebarCategory", () => {
  it("marca como activa la sección actual y dispara onSelectSection al hacer click en otra", async () => {
    const user = userEvent.setup();
    const onSelectSection = vi.fn();

    renderWithTheme(
      <SettingsModalSidebarCategory
        category={category}
        activeSection={SettingsSectionEnum.AccountInfo}
        onSelectSection={onSelectSection}
      />
    );

    expect(screen.getByText("Información de cuenta").closest("li")).toHaveAttribute("aria-current", "true");
    expect(screen.getByText("Contraseña y seguridad").closest("li")).not.toHaveAttribute("aria-current");

    await user.click(screen.getByText("Contraseña y seguridad"));

    expect(onSelectSection).toHaveBeenCalledWith(SettingsSectionEnum.AccountPassword);
  });
});
