// src/modules/auth/test/StockoTitle.test.jsx
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { createTheme, ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import StockoTitle from "../../pages/LoginPage/components/LoginFormComponent/StockoTitle";

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

beforeEach(cleanup);

describe("StockoTitle", () => {
  it("should render correctly", () => {
    renderWithTheme(<StockoTitle />);
  });

  it("should render the title text", () => {
    renderWithTheme(<StockoTitle />);
    expect(screen.getByText("Stocko")).toBeInTheDocument();
  });

  it("should render the logo image", () => {
    renderWithTheme(<StockoTitle />);
    const logo = screen.getByAltText("Stocko");
    expect(logo).toBeInTheDocument();
    expect(logo.tagName).toBe("IMG");
  });
});