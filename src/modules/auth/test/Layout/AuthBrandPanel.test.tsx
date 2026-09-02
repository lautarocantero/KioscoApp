import { act, cleanup, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import "@testing-library/jest-dom";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import AuthBrandPanel from "../../layout/AuthBrandPanel/AuthBrandPanel";

beforeEach(cleanup);

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

  it("should hide the video and keep showing the brand content once it ends", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
    const video = document.querySelector("video") as HTMLVideoElement;

    act(() => {
      video.dispatchEvent(new Event("ended"));
    });

    expect(document.querySelector("video")).not.toBeInTheDocument();
    expect(screen.getByText("Stocko")).toBeInTheDocument();
    expect(screen.getByText("Gestión de stock y ventas para tu kiosco")).toBeInTheDocument();
  });

  it("should not allow selecting the left panel's content", () => {
    renderWithTheme(<AuthBrandPanel tagline="Gestión de stock y ventas para tu kiosco" />);
    const aside = screen.getByLabelText("Presentación de Stocko");

    expect(aside).toHaveStyle({ userSelect: "none" });
  });
});
