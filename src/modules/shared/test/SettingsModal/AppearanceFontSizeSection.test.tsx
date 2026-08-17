import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { testTheme } from "../utils/setupTests";
import { FontSizeProvider } from "../../../../theme/FontSizeProvider";
import AppearanceFontSizeSection from "../../components/SettingsModal/sections/AppearanceFontSizeSection";
import { FONT_SIZE_DEFAULT, FONT_SIZE_MAX, FONT_SIZE_MIN } from "../../../../config/constants";

const renderSection = () =>
  render(
    <FontSizeProvider>
      <ThemeProvider theme={testTheme}>
        <AppearanceFontSizeSection />
      </ThemeProvider>
    </FontSizeProvider>
  );

describe("AppearanceFontSizeSection", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.style.fontSize = "";
  });

  it("muestra el slider en el valor por defecto, con el rango configurado", () => {
    renderSection();

    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("aria-valuenow", String(FONT_SIZE_DEFAULT));
    expect(slider).toHaveAttribute("aria-valuemin", String(FONT_SIZE_MIN));
    expect(slider).toHaveAttribute("aria-valuemax", String(FONT_SIZE_MAX));
  });

  it("marca el tamaño por defecto en la barra para poder volver a él", () => {
    const { container } = renderSection();

    const defaultMarkLabel = container.querySelector(".MuiSlider-markLabel[data-index='1']");
    expect(defaultMarkLabel).toHaveTextContent(`${FONT_SIZE_DEFAULT}px`);
  });

  it("actualiza el font-size del <html> al mover el slider", () => {
    renderSection();

    const slider = screen.getByRole("slider");
    slider.focus();
    // ArrowUp incrementa el value del slider en 1 (step configurado).
    act(() => {
      fireEvent.keyDown(slider, { key: "ArrowUp" });
    });

    expect(document.documentElement.style.fontSize).toBe(`${FONT_SIZE_DEFAULT + 1}px`);
  });
});
