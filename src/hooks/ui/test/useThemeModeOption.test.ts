import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { LightDarkThemeProvider } from "../../../theme/LightDarkThemeProvider";
import { useThemeModeOption } from "../useThemeModeOption";
import { ThemeModeEnum } from "@typings/settings/settingsEnums";

describe("useThemeModeOption", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("expone 'light' por defecto (sin nada guardado en localStorage)", () => {
    const { result } = renderHook(() => useThemeModeOption(), { wrapper: LightDarkThemeProvider });

    expect(result.current.mode).toBe(ThemeModeEnum.Light);
  });

  it("cambia a 'dark' y persiste la elección en localStorage", () => {
    const { result } = renderHook(() => useThemeModeOption(), { wrapper: LightDarkThemeProvider });

    act(() => result.current.setMode(ThemeModeEnum.Dark));

    expect(result.current.mode).toBe(ThemeModeEnum.Dark);
    expect(JSON.parse(localStorage.getItem("appTheme") ?? "null")).toBe(false);
  });
});
