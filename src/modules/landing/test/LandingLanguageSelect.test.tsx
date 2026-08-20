import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import i18n from "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingLanguageSelect from "../pages/LandingPage/components/LandingLanguageSelect";
import { LanguageEnum } from "@typings/settings/settingsEnums";

describe("LandingLanguageSelect", () => {
  afterEach(async () => {
    await i18n.changeLanguage(LanguageEnum.Spanish);
  });

  it("muestra 'ES' por defecto y cambia el idioma real de i18next al elegir 'EN'", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingLanguageSelect />
      </ThemeProvider>
    );

    expect(screen.getByRole("combobox")).toHaveTextContent("ES");

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "EN" }));

    expect(screen.getByRole("combobox")).toHaveTextContent("EN");
    expect(i18n.resolvedLanguage).toBe(LanguageEnum.English);
  });
});
