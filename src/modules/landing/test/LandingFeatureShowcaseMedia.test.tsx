import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../../theme/mainTheme";
import { LandingDecorationPosition } from "@typings/landing/landingEnums";
import LandingFeatureShowcaseMedia from "../pages/LandingPage/components/LandingFeatureShowcaseMedia";

const VIDEO_SRC = "/files/video/film.mp4";
const ALT = "Vista previa de Stocko";
const ACCENT_COLOR = "#A78BFA";

describe("LandingFeatureShowcaseMedia", () => {
  it("reproduce el video en loop, sin controles ni forma de pausarlo", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseMedia alt={ALT} videoSrc={VIDEO_SRC} accentColor={ACCENT_COLOR} />
      </ThemeProvider>
    );

    const video = screen.getByLabelText(ALT) as HTMLVideoElement;
    expect(video.tagName).toBe("VIDEO");
    expect(video).toHaveAttribute("src", VIDEO_SRC);
    expect(video).not.toHaveAttribute("controls");
    expect(video.loop).toBe(true);
  });

  it("renderiza una decoración a cada lado cuando se pasan por parámetro", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseMedia
          alt={ALT}
          videoSrc={VIDEO_SRC}
          accentColor={ACCENT_COLOR}
          decorations={[
            { src: "/images/icons/decoration/2boxes.png", position: LandingDecorationPosition.BottomLeft },
            { src: "/images/icons/decoration/3boxes.png", position: LandingDecorationPosition.BottomRight },
          ]}
        />
      </ThemeProvider>
    );

    const decorationImages = container.querySelectorAll('img[aria-hidden="true"]');
    expect(decorationImages).toHaveLength(2);
    expect(decorationImages[0]).toHaveAttribute("src", "/images/icons/decoration/2boxes.png");
    expect(decorationImages[1]).toHaveAttribute("src", "/images/icons/decoration/3boxes.png");
  });

  it("no renderiza ninguna decoración si no se pasan", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseMedia alt={ALT} videoSrc={VIDEO_SRC} accentColor={ACCENT_COLOR} />
      </ThemeProvider>
    );

    expect(container.querySelectorAll('img[aria-hidden="true"]')).toHaveLength(0);
  });

  it("usa el accentColor recibido como color de borde del marco", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseMedia alt={ALT} videoSrc={VIDEO_SRC} accentColor={ACCENT_COLOR} />
      </ThemeProvider>
    );

    const frame = container.querySelector("video")?.parentElement;
    expect(frame).toHaveStyle({ borderColor: ACCENT_COLOR });
  });
});
