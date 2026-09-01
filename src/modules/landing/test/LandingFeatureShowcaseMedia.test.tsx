import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../../theme/mainTheme";
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

  it("no renderiza ninguna decoración más allá de la marca de agua fija", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseMedia alt={ALT} videoSrc={VIDEO_SRC} accentColor={ACCENT_COLOR} />
      </ThemeProvider>
    );

    expect(container.querySelectorAll('img[aria-hidden="true"]')).toHaveLength(1);
    expect(container.querySelector('img[aria-hidden="true"]')).toHaveAttribute("src", expect.stringContaining("StocoLogoCircle.png"));
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
