import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingNavbar from "../pages/LandingPage/components/LandingNavbar";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: vi.fn() };
});

const mockedUseNavigate = vi.mocked(useNavigate);

const renderComponent = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={darkTheme}>
        <LandingNavbar />
      </ThemeProvider>
    </MemoryRouter>
  );

describe("LandingNavbar", () => {
  const navigate = vi.fn();

  beforeEach(() => {
    navigate.mockClear();
    mockedUseNavigate.mockReturnValue(navigate);
  });

  it("navega a /login al hacer click en el botón de login", async () => {
    renderComponent();
    await userEvent.click(screen.getByTestId("landing-nav-login"));
    expect(navigate).toHaveBeenCalledWith("/login");
  });

  it("navega a /register al hacer click en el botón de registro", async () => {
    renderComponent();
    await userEvent.click(screen.getByTestId("landing-nav-register"));
    expect(navigate).toHaveBeenCalledWith("/register");
  });

  it("muestra el nombre de marca Stocko siempre visible", () => {
    renderComponent();
    const [brandmarkRoot] = screen.getAllByRole("img", { name: "Stocko" });

    expect(brandmarkRoot).toBeInTheDocument();
    expect(getComputedStyle(brandmarkRoot.parentElement as HTMLElement).opacity).not.toBe("0");
  });

  it("hace scroll al tope de la página al hacer click en el brandmark", async () => {
    window.scrollTo = vi.fn();
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "Ir al inicio" }));

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
