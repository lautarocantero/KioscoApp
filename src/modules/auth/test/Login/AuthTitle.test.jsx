// src/modules/auth/test/AuthTitle.test.jsx
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { createTheme, ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import AuthTitle from "../../pages/LoginPage/components/LoginFormComponent/AuthTitle";

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

beforeEach(cleanup);

describe("AuthTitle", () => {
  it("should render correctly", () => {
    renderWithTheme(<AuthTitle />);
  });

  it("should render the Stocko title", () => {
    renderWithTheme(<AuthTitle />);
    expect(screen.getByText("Stocko")).toBeInTheDocument();
  });
});