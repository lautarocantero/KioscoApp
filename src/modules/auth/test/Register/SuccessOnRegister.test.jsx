// src/modules/auth/test/SuccessOnRegister.test.jsx
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import SuccessOnRegister from "../../pages/RegisterPage/components/SuccessOnRegister";

const renderWithProviders = (ui) =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>
    </MemoryRouter>
  );

beforeEach(cleanup);

describe("SuccessOnRegister", () => {
  it("should render nothing when isSuccess is false", () => {
    const { container } = renderWithProviders(
      <SuccessOnRegister isSuccess={false} secondsLeft={5} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("should render the success message when isSuccess is true", () => {
    renderWithProviders(<SuccessOnRegister isSuccess={true} secondsLeft={5} />);
    expect(screen.getByText("¡Cuenta creada con éxito!")).toBeInTheDocument();
  });

  it("should render the countdown with secondsLeft", () => {
    renderWithProviders(<SuccessOnRegister isSuccess={true} secondsLeft={3} />);
    expect(
      screen.getByText(/Te estamos redirigiendo al login en 3s\.\.\./)
    ).toBeInTheDocument();
  });

  it("should update the displayed countdown when secondsLeft changes", () => {
    const { rerender } = renderWithProviders(
      <SuccessOnRegister isSuccess={true} secondsLeft={5} />
    );
    expect(screen.getByText(/en 5s\.\.\./)).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <SuccessOnRegister isSuccess={true} secondsLeft={1} />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/en 1s\.\.\./)).toBeInTheDocument();
  });

  it('should render a link to go to login now', () => {
    renderWithProviders(<SuccessOnRegister isSuccess={true} secondsLeft={5} />);
    const link = screen.getByRole("link", { name: /Ir ahora/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/login");
  });
});