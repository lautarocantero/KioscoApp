import { act, cleanup, screen } from "@testing-library/react";
import { describe, it, beforeEach, afterEach, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { HOLD_LAST_FRAME_MS, FADE_TRANSITION_MS } from "@hooks/auth/useAuthBrandVideo";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import AuthBrandPanel from "../../layout/AuthBrandPanel/AuthBrandPanel";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  cleanup();
});

const getLogoWrapper = (): HTMLElement => screen.getByRole("presentation").parentElement as HTMLElement;

describe("AuthBrandPanel", () => {
  it("should render correctly", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
  });

  it("should render the Stocko brand name", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
    expect(screen.getByText("Stocko")).toBeInTheDocument();
  });

  it("should render the given tagline", () => {
    renderWithTheme(<AuthBrandPanel tagline="Creá tu cuenta y empezá a vender en minutos" />);
    expect(screen.getByText("Creá tu cuenta y empezá a vender en minutos")).toBeInTheDocument();
  });

  it("should render the logo image", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
    const logo = screen.getByRole("presentation");
    expect(logo.tagName).toBe("IMG");
  });

  it("should autoplay the intro video muted and without controls", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
    const video = document.querySelector("video") as HTMLVideoElement;

    expect(video).toBeInTheDocument();
    expect(video.autoplay).toBe(true);
    expect(video.muted).toBe(true);
    expect(video).not.toHaveAttribute("controls");
  });

  it("should hide the logo while the video plays", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);

    expect(getLogoWrapper()).toHaveStyle({ opacity: "0" });
  });

  it("should hold the last frame after the video ends, before fading it out", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
    const video = document.querySelector("video") as HTMLVideoElement;

    act(() => {
      video.dispatchEvent(new Event("ended"));
    });

    expect(document.querySelector("video")).toBeInTheDocument();
    expect(getLogoWrapper()).toHaveStyle({ opacity: "0" });
  });

  it("should slowly fade the video out and the logo back in once the hold ends", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
    const video = document.querySelector("video") as HTMLVideoElement;

    act(() => {
      video.dispatchEvent(new Event("ended"));
    });
    act(() => {
      vi.advanceTimersByTime(HOLD_LAST_FRAME_MS);
    });

    expect(document.querySelector("video")).toHaveStyle({ opacity: "0" });
    expect(getLogoWrapper()).toHaveStyle({ opacity: "1" });
  });

  it("should remove the video and keep showing the brand content once the fade finishes", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
    const video = document.querySelector("video") as HTMLVideoElement;

    act(() => {
      video.dispatchEvent(new Event("ended"));
    });
    act(() => {
      vi.advanceTimersByTime(HOLD_LAST_FRAME_MS);
    });
    act(() => {
      vi.advanceTimersByTime(FADE_TRANSITION_MS);
    });

    expect(document.querySelector("video")).not.toBeInTheDocument();
    expect(getLogoWrapper()).toHaveStyle({ opacity: "1" });
    expect(screen.getByText("Stocko")).toBeInTheDocument();
    expect(screen.getByText("Gestión de stock y ventas para tu kiosco")).toBeInTheDocument();
  });

  it("should not allow selecting the left panel's content", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
    const aside = screen.getByLabelText("Presentación de Stocko");

    expect(aside).toHaveStyle({ userSelect: "none" });
  });
});
