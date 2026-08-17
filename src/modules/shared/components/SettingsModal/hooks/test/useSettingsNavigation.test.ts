import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSettingsNavigation } from "../useSettingsNavigation";
import { SettingsSectionEnum } from "@typings/settings/settingsEnums";

describe("useSettingsNavigation", () => {
  it("arranca en 'Información de cuenta' y cambia de sección con setActiveSection", () => {
    const { result } = renderHook(() => useSettingsNavigation());

    expect(result.current.activeSection).toBe(SettingsSectionEnum.AccountInfo);

    act(() => result.current.setActiveSection(SettingsSectionEnum.AppearanceMode));

    expect(result.current.activeSection).toBe(SettingsSectionEnum.AppearanceMode);
  });
});
