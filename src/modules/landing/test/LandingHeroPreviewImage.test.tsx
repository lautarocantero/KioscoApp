import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@i18n/i18n";
import LandingHeroPreviewImage from "../pages/LandingPage/components/LandingHeroPreviewImage";

describe("LandingHeroPreviewImage", () => {
  it("renderiza la imagen de representación de Stocko con su alt descriptivo", () => {
    render(<LandingHeroPreviewImage />);

    const image = screen.getByRole("img", { name: "Panel de control de Stocko en una tableta" });
    expect(image).toHaveAttribute("src", "/images/backgroundImages/Stocko_representation.png");
  });

  it("renderiza la mascota como decoración oculta a lectores de pantalla", () => {
    const { container } = render(<LandingHeroPreviewImage />);

    const mascot = container.querySelector('img[aria-hidden="true"]');
    expect(mascot).toBeInTheDocument();
    expect(mascot).toHaveAttribute("alt", "");
    expect(mascot).toHaveAttribute("src", expect.stringContaining("stocko-mascot.png"));
  });
});
