import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { createTheme, ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import AuthPageHeading from "../../layout/AuthPageHeading/AuthPageHeading";

const renderWithTheme = (ui: React.ReactNode) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

beforeEach(cleanup);

describe("AuthPageHeading", () => {
  it("should render correctly", () => {
    renderWithTheme(<AuthPageHeading eyebrow="Iniciar sesión" title="Bienvenido de nuevo" />);
  });

  it("should render the eyebrow label", () => {
    renderWithTheme(<AuthPageHeading eyebrow="Iniciar sesión" title="Bienvenido de nuevo" />);
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
  });

  it("should render the title as the page's h1", () => {
    renderWithTheme(<AuthPageHeading eyebrow="Registro" title="Crear una cuenta" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Crear una cuenta");
  });
});
