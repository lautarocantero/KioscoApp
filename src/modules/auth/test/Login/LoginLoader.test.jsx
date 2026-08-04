// src/modules/auth/test/LoginLoader.test.jsx
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { createTheme, ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import LoginLoader from "../../pages/LoginPage/components/LoginFormComponent/LoginLoader";

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

beforeEach(cleanup);

describe("LoginLoader", () => {
  it("should render correctly", () => {
    renderWithTheme(<LoginLoader />);
  });

  it("should render the welcome message", () => {
    renderWithTheme(<LoginLoader />);
    expect(screen.getByText("Bienvenido a Stoko!")).toBeInTheDocument();
    expect(
      screen.getByText("La mejor forma de gestionar tu local minorista")
    ).toBeInTheDocument();
  });

  it("should render the loading spinner", () => {
    renderWithTheme(<LoginLoader />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});