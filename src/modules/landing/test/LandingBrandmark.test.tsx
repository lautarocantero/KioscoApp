import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../../theme/mainTheme";
import LandingBrandmark from "../pages/LandingPage/components/LandingBrandmark";

describe("LandingBrandmark", () => {
  it("se expone como accesible con nombre 'Stocko'", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingBrandmark />
      </ThemeProvider>
    );

    expect(screen.getAllByRole("img", { name: "Stocko" }).length).toBeGreaterThan(0);
  });

  it("renderiza el texto 'Stocko'", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingBrandmark />
      </ThemeProvider>
    );

    expect(screen.getByText("Stocko")).toBeInTheDocument();
  });
});
