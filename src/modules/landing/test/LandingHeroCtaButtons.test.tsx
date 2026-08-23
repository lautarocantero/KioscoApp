import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingHeroCtaButtons from "../pages/LandingPage/components/LandingHeroCtaButtons";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: vi.fn() };
});

const mockedUseNavigate = vi.mocked(useNavigate);

const renderComponent = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={darkTheme}>
        <LandingHeroCtaButtons />
      </ThemeProvider>
    </MemoryRouter>
  );

describe("LandingHeroCtaButtons", () => {
  const navigate = vi.fn();

  beforeEach(() => {
    navigate.mockClear();
    mockedUseNavigate.mockReturnValue(navigate);
  });

  it("navega a /login al hacer click en 'Abrir en el navegador'", async () => {
    renderComponent();
    await userEvent.click(screen.getByTestId("landing-hero-open-in-browser"));
    expect(navigate).toHaveBeenCalledWith("/login");
  });

  it("hace scroll a la sección de recursos/descarga al hacer click en 'Descargar'", async () => {
    const section = document.createElement("div");
    section.id = "landing-download";
    section.scrollIntoView = vi.fn();
    document.body.appendChild(section);

    renderComponent();
    await userEvent.click(screen.getByTestId("landing-hero-download"));

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
    expect(navigate).not.toHaveBeenCalled();

    document.body.removeChild(section);
  });
});
