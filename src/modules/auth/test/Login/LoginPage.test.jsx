// src/modules/auth/test/LoginPage.test.jsx
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, beforeEach, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import LoginPage from "../../pages/LoginPage/LoginPage";
import authReducer from "../../../../store/auth/authSlice";
import { testTheme } from "../../../shared/test/utils/setupTests";

const renderWithProviders = (ui, initialEntries = ["/login"]) => {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeProvider theme={testTheme}>{ui}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

beforeEach(cleanup);

describe("LoginPage", () => {
  it("should render correctly", () => {
    renderWithProviders(<LoginPage />);
  });

  it("should render the login title", () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getAllByText("Stocko").length).toBeGreaterThan(0);
  });

  it("should render the login form by default", () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByText("Bienvenido de nuevo")).toBeInTheDocument();
  });

  it("should render the register form when ?mode=register", () => {
    renderWithProviders(<LoginPage />, ["/login?mode=register"]);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByText("Crear una cuenta")).toBeInTheDocument();
  });

  it("should render the login form for any other mode value", () => {
    renderWithProviders(<LoginPage />, ["/login?mode=whatever"]);
    expect(screen.getByText("Bienvenido de nuevo")).toBeInTheDocument();
  });

  it("should not remount the brand panel's video when switching between login and register", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    const videoBeforeSwitch = document.querySelector("video");
    expect(videoBeforeSwitch).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Crear cuenta" }));
    expect(screen.getByText("Crear una cuenta")).toBeInTheDocument();
    expect(document.querySelector("video")).toBe(videoBeforeSwitch);

    await user.click(screen.getByRole("button", { name: "Inicia Sesión" }));
    expect(screen.getByText("Bienvenido de nuevo")).toBeInTheDocument();
    expect(document.querySelector("video")).toBe(videoBeforeSwitch);
  });
});
