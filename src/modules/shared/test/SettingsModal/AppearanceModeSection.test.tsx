import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { testTheme } from "../utils/setupTests";
import { LightDarkThemeProvider } from "../../../../theme/LightDarkThemeProvider";
import AppearanceModeSection from "../../components/SettingsModal/sections/AppearanceModeSection";

const renderSection = () =>
  render(
    <LightDarkThemeProvider>
      <ThemeProvider theme={testTheme}>
        <AppearanceModeSection />
      </ThemeProvider>
    </LightDarkThemeProvider>
  );

describe("AppearanceModeSection", () => {
  beforeEach(() => localStorage.clear());

  it("muestra 'Claro' por defecto y permite cambiar a 'Oscuro'", async () => {
    const user = userEvent.setup();
    renderSection();

    expect(screen.getByRole("combobox")).toHaveTextContent("Claro");

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "Oscuro" }));

    expect(screen.getByRole("combobox")).toHaveTextContent("Oscuro");
    expect(JSON.parse(localStorage.getItem("appTheme") ?? "null")).toBe(false);
  });
});
