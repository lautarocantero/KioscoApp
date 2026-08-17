import { describe, it, expect, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "@i18n/i18n";
import { renderWithTheme } from "../utils/setupTests";
import AppearanceLanguageSection from "../../components/SettingsModal/sections/AppearanceLanguageSection";
import { LanguageEnum } from "@typings/settings/settingsEnums";

describe("AppearanceLanguageSection", () => {
  afterEach(async () => {
    await i18n.changeLanguage(LanguageEnum.Spanish);
  });

  it("muestra 'Español' por defecto y cambia el idioma real de i18next al elegir 'English'", async () => {
    const user = userEvent.setup();
    renderWithTheme(<AppearanceLanguageSection />);

    expect(screen.getByRole("combobox")).toHaveTextContent("Español");

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "English" }));

    expect(screen.getByRole("combobox")).toHaveTextContent("English");
    expect(i18n.resolvedLanguage).toBe(LanguageEnum.English);
  });
});
