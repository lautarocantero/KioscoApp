import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../../theme/mainTheme";
import LandingWaveDivider from "../pages/LandingPage/components/LandingWaveDivider";

const FILL_COLOR = "#60A5FA";

describe("LandingWaveDivider", () => {
  it("renderiza el SVG decorativo de transición como oculto para lectores de pantalla", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingWaveDivider fillColor={FILL_COLOR} />
      </ThemeProvider>
    );

    const wrapper = container.querySelector('[aria-hidden="true"]');
    expect(wrapper).toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("path")).toBeInTheDocument();
  });

  it("usa el fillColor recibido como color del SVG, para fundirse con la sección siguiente", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingWaveDivider fillColor={FILL_COLOR} />
      </ThemeProvider>
    );

    const svg = container.querySelector("svg") as SVGElement;
    expect(getComputedStyle(svg).color).toBe("rgb(96, 165, 250)");
  });

  it("aplica textura noisy (feTurbulence) recortada a la forma de la onda", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingWaveDivider fillColor={FILL_COLOR} />
      </ThemeProvider>
    );

    expect(container.querySelector("feTurbulence")).toBeInTheDocument();
    expect(container.querySelector("clipPath")).toBeInTheDocument();
  });

  it("renderiza un patrón de onda distinto según el variant recibido", () => {
    const { container: variant0Container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingWaveDivider fillColor={FILL_COLOR} variant={0} />
      </ThemeProvider>
    );
    const { container: variant1Container } = render(
      <ThemeProvider theme={darkTheme}>
        <LandingWaveDivider fillColor={FILL_COLOR} variant={1} />
      </ThemeProvider>
    );

    const path0 = variant0Container.querySelector("path")?.getAttribute("d");
    const path1 = variant1Container.querySelector("path")?.getAttribute("d");

    expect(path0).not.toBe(path1);
  });

  it("genera ids únicos de clipPath/filter entre instancias, para no pisarse entre sí", () => {
    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <>
          <LandingWaveDivider fillColor={FILL_COLOR} variant={0} />
          <LandingWaveDivider fillColor={FILL_COLOR} variant={1} />
        </>
      </ThemeProvider>
    );

    const clipPathIds = [...container.querySelectorAll("clipPath")].map((el) => el.id);
    expect(new Set(clipPathIds).size).toBe(clipPathIds.length);
  });
});
