import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../../theme/mainTheme";
import LandingFeatureShowcaseMediaWatermark from "../pages/LandingPage/components/LandingFeatureShowcaseMediaWatermark";

describe("LandingFeatureShowcaseMediaWatermark", () => {
  it("renderiza el logo como decoración oculta a lectores de pantalla", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseMediaWatermark />
      </ThemeProvider>
    );

    const image = container.querySelector('img[aria-hidden="true"]');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "");
    expect(image).toHaveAttribute("src", expect.stringContaining("StocoLogoCircle.png"));
  });
});
