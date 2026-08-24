import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../../theme/mainTheme";
import { LandingDecorationPosition } from "@typings/landing/landingEnums";
import LandingMediaDecorationImage from "../pages/LandingPage/components/LandingMediaDecorationImage";

describe("LandingMediaDecorationImage", () => {
  it("renderiza la imagen como decorativa (alt vacío, oculta a lectores de pantalla)", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingMediaDecorationImage
          decoration={{ src: "/images/icons/decoration/2boxes.png", position: LandingDecorationPosition.BottomLeft }}
        />
      </ThemeProvider>
    );

    const image = container.querySelector("img");
    expect(image).toHaveAttribute("src", "/images/icons/decoration/2boxes.png");
    expect(image).toHaveAttribute("alt", "");
    expect(image).toHaveAttribute("aria-hidden", "true");
  });
});
