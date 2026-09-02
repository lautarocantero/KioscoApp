import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { createTheme, ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import AuthCompactBrand from "../../layout/AuthCompactBrand/AuthCompactBrand";

const renderWithTheme = (ui: React.ReactNode) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

beforeEach(cleanup);

describe("AuthCompactBrand", () => {
  it("should render correctly", () => {
    renderWithTheme(<AuthCompactBrand />);
  });

  it("should render the Stocko brand name", () => {
    renderWithTheme(<AuthCompactBrand />);
    expect(screen.getByText("Stocko")).toBeInTheDocument();
  });

  it("should render the compact logo image", () => {
    renderWithTheme(<AuthCompactBrand />);
    const logo = screen.getByRole("presentation");
    expect(logo.tagName).toBe("IMG");
  });
});
