// src/modules/auth/test/RegisterPage.test.jsx
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import authReducer from "../../../../store/auth/authSlice";

const renderWithProviders = (ui) => {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

beforeEach(cleanup);

describe("RegisterPage", () => {
  it("should render correctly", () => {
    renderWithProviders(<RegisterPage />);
  });

  it("should render the title", () => {
    renderWithProviders(<RegisterPage />);
    expect(screen.getByText("Stocko")).toBeInTheDocument();
  });

  it("should render the register form", () => {
    renderWithProviders(<RegisterPage />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});