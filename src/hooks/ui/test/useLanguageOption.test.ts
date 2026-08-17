import { describe, it, expect, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import i18n from "@i18n/i18n";
import { useLanguageOption } from "../useLanguageOption";
import { LanguageEnum } from "@typings/settings/settingsEnums";

describe("useLanguageOption", () => {
  afterEach(async () => {
    await i18n.changeLanguage(LanguageEnum.Spanish);
    localStorage.clear();
  });

  it("expone 'es' por defecto y cambia el idioma real de i18next a 'en', persistiéndolo", async () => {
    const { result } = renderHook(() => useLanguageOption());

    expect(result.current.language).toBe(LanguageEnum.Spanish);

    act(() => result.current.setLanguage(LanguageEnum.English));

    expect(localStorage.getItem("appLanguage")).toBe(LanguageEnum.English);
    await waitFor(() => expect(result.current.language).toBe(LanguageEnum.English));
    expect(i18n.resolvedLanguage).toBe(LanguageEnum.English);
  });
});
