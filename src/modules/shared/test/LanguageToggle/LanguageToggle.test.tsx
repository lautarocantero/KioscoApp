import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { useLanguageOption } from "@hooks/ui/useLanguageOption";
import { LanguageEnum } from "@typings/settings/settingsEnums";
import LanguageToggle from "../../components/LanguageToggle/LanguageToggle";

vi.mock("@hooks/ui/useLanguageOption", () => ({
  useLanguageOption: vi.fn(),
}));

const mockedUseLanguageOption = vi.mocked(useLanguageOption);

const renderWithTheme = (ui: React.ReactNode) => render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

beforeEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("LanguageToggle", () => {
  it("muestra 'ES' y aria-checked=true cuando el idioma actual es español", () => {
    const setLanguage = vi.fn();
    mockedUseLanguageOption.mockReturnValue({ language: LanguageEnum.Spanish, setLanguage });

    renderWithTheme(<LanguageToggle />);

    const toggle = screen.getByRole("switch", { name: /idioma \/ language/i });
    expect(toggle).toHaveTextContent("ES");
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("muestra 'EN' y aria-checked=false cuando el idioma actual es inglés", () => {
    const setLanguage = vi.fn();
    mockedUseLanguageOption.mockReturnValue({ language: LanguageEnum.English, setLanguage });

    renderWithTheme(<LanguageToggle />);

    const toggle = screen.getByRole("switch", { name: /idioma \/ language/i });
    expect(toggle).toHaveTextContent("EN");
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("al hacer click en español, cambia a inglés", () => {
    const setLanguage = vi.fn();
    mockedUseLanguageOption.mockReturnValue({ language: LanguageEnum.Spanish, setLanguage });

    renderWithTheme(<LanguageToggle />);
    fireEvent.click(screen.getByRole("switch"));

    expect(setLanguage).toHaveBeenCalledWith(LanguageEnum.English);
  });

  it("al hacer click en inglés, cambia a español", () => {
    const setLanguage = vi.fn();
    mockedUseLanguageOption.mockReturnValue({ language: LanguageEnum.English, setLanguage });

    renderWithTheme(<LanguageToggle />);
    fireEvent.click(screen.getByRole("switch"));

    expect(setLanguage).toHaveBeenCalledWith(LanguageEnum.Spanish);
  });
});
