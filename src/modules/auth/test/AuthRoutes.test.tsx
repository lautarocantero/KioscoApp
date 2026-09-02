import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import "@testing-library/jest-dom";
import AuthRoutes from "../AuthRoutes";
import authReducer from "../../../store/auth/authSlice";
import { testTheme } from "../../shared/test/utils/setupTests";

const renderAt = (initialEntry: string) => {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <ThemeProvider theme={testTheme}>
          <Routes>{AuthRoutes()}</Routes>
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

beforeEach(cleanup);

describe("AuthRoutes", () => {
  it("renders the login form on /login", () => {
    renderAt("/login");
    expect(screen.getByText("Bienvenido de nuevo")).toBeInTheDocument();
  });

  it("redirects /register to /login in register mode, on the same LoginPage", () => {
    renderAt("/register");
    expect(screen.getByText("Crear una cuenta")).toBeInTheDocument();
  });
});
