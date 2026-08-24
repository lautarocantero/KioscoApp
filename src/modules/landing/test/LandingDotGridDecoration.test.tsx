import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../../theme/mainTheme";
import LandingDotGridDecoration from "../pages/LandingPage/components/LandingDotGridDecoration";

describe("LandingDotGridDecoration", () => {
  it("renderiza como decoración oculta para lectores de pantalla, a izquierda y derecha", () => {
    const { container: leftContainer } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingDotGridDecoration side="left" />
      </ThemeProvider>
    );
    const { container: rightContainer } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingDotGridDecoration side="right" />
      </ThemeProvider>
    );

    expect(leftContainer.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
    expect(rightContainer.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
