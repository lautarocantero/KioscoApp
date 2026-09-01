import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import LandingHeroMascotImage from "../pages/LandingPage/components/LandingHeroMascotImage";

describe("LandingHeroMascotImage", () => {
  it("renderiza la mascota como decoración oculta a lectores de pantalla", () => {
    const { container } = render(<LandingHeroMascotImage />);

    const image = container.querySelector('img[aria-hidden="true"]');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "");
    expect(image).toHaveAttribute("src", expect.stringContaining("stocko-mascot.png"));
  });
});
