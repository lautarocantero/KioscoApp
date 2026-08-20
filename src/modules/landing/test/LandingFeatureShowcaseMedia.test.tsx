import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../../theme/mainTheme";
import LandingFeatureShowcaseMedia from "../pages/LandingPage/components/LandingFeatureShowcaseMedia";

const IMAGE_SRC = "/images/backgroundImages/Stocko_representation.png";
const VIDEO_SRC = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const ALT = "Vista previa de Stocko";

describe("LandingFeatureShowcaseMedia", () => {
  it("arranca mostrando el video sin controles ni loop, y sin mostrar la imagen", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseMedia src={IMAGE_SRC} alt={ALT} videoSrc={VIDEO_SRC} />
      </ThemeProvider>
    );

    const video = screen.getByLabelText(ALT) as HTMLVideoElement;
    expect(video.tagName).toBe("VIDEO");
    expect(video).toHaveAttribute("src", VIDEO_SRC);
    expect(video).not.toHaveAttribute("controls");
    expect(video.loop).toBe(false);
    expect(screen.queryByRole("img", { name: ALT })).not.toBeInTheDocument();
  });

  it("al terminar el video, lo reemplaza por la imagen ya existente", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseMedia src={IMAGE_SRC} alt={ALT} videoSrc={VIDEO_SRC} />
      </ThemeProvider>
    );

    fireEvent.ended(screen.getByLabelText(ALT));

    const image = screen.getByRole("img", { name: ALT });
    expect(image).toHaveAttribute("src", IMAGE_SRC);
    expect(screen.queryByLabelText(ALT, { selector: "video" })).not.toBeInTheDocument();
  });
});
