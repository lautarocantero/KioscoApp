import { describe, it, expect, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import authReducer from "../../../../store/auth/authSlice";
import ResetPassword from "../../pages/ResetPasswordPage/components/ResetPassword";

// Igual que en LoginForm/RegisterForm: nada de mocks sobre el hook, se usa
// el store y el router reales. useResetPasswordForm no dispara ningún
// dispatch al montar (a diferencia de useLoginForm/useRegisterForm), así
// que renderizar no dispara llamadas de red por sí solo.
const renderWithProviders = (ui: React.ReactNode, { route = "/reset-password" } = {}) => {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>
  );
};

beforeEach(cleanup);

describe("ResetPassword", () => {
  it("renderiza correctamente con token en la URL", () => {
    renderWithProviders(<ResetPassword />, {
      route: "/reset-password?token=abc123",
    });
  });

  it("renderiza correctamente sin token en la URL", () => {
    renderWithProviders(<ResetPassword />, { route: "/reset-password" });
  });

  it("muestra el mensaje de 'falta el token' cuando no hay token en la URL", () => {
    renderWithProviders(<ResetPassword />, { route: "/reset-password" });
    expect(
      screen.getByText("Falta el token de restablecimiento en el link")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Pedir un link nuevo" })
    ).toBeInTheDocument();
  });

  it("no muestra el mensaje de 'falta el token' cuando hay token en la URL", () => {
    renderWithProviders(<ResetPassword />, {
      route: "/reset-password?token=abc123",
    });
    expect(
      screen.queryByText("Falta el token de restablecimiento en el link")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Pedir un link nuevo" })
    ).not.toBeInTheDocument();
  });

  it("siempre renderiza el formulario, tenga o no token", () => {
    renderWithProviders(<ResetPassword />, { route: "/reset-password" });
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Nueva contraseña")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Repetí la nueva contraseña")
    ).toBeInTheDocument();
  });

  it("no muestra la pantalla de éxito antes de enviar el formulario", () => {
    renderWithProviders(<ResetPassword />, {
      route: "/reset-password?token=abc123",
    });
    expect(
      screen.queryByText("Tu contraseña fue actualizada con éxito.")
    ).not.toBeInTheDocument();
  });

  it("el botón de submit está habilitado inicialmente (isSubmitting=false)", () => {
    renderWithProviders(<ResetPassword />, {
      route: "/reset-password?token=abc123",
    });
    expect(
      screen.getByRole("button", { name: "Restablecer contraseña" })
    ).toBeEnabled();
  });
});