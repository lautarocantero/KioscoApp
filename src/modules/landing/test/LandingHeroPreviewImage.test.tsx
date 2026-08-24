import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@i18n/i18n";
import LandingHeroPreviewImage from "../pages/LandingPage/components/LandingHeroPreviewImage";

describe("LandingHeroPreviewImage", () => {
  it("renderiza la imagen de representación de Stocko con su alt descriptivo", () => {
    render(<LandingHeroPreviewImage />);

    const image = screen.getByRole("img", { name: "Vista previa del panel de control de Stocko" });
    expect(image).toHaveAttribute("src", "/images/backgroundImages/Stocko_representation.png");
  });

  it("aplica una animación de flotación a la imagen", () => {
    render(<LandingHeroPreviewImage />);

    const image = screen.getByRole("img", { name: "Vista previa del panel de control de Stocko" });
    expect(getComputedStyle(image).animation).toContain("infinite");
  });
});
