// src/modules/auth/test/RegisterPage.test.jsx
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import RegisterPage from "../../pages/RegisterPage/RegisterPage";
import authReducer from "../../../../store/auth/authSlice";
import { testTheme } from "../../../shared/test/utils/setupTests";

const renderWithProviders = (ui) => {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={testTheme}>{ui}</ThemeProvider>
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
    expect(screen.getAllByText("Stocko").length).toBeGreaterThan(0);
  });

  it("should render the register form", () => {
    renderWithProviders(<RegisterPage />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});