import { createTheme, ThemeProvider } from "@mui/material";
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, expect } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import LoginForm from '../pages/LoginPage/components/LoginFormComponent/LoginForm'
import '@testing-library/jest-dom'
import authReducer from "../../../store/auth/authSlice";

const renderWithProviders = (ui) => {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
}

beforeEach(cleanup)

describe('LoginForm', () => {

    it('LoginForm should render correctly', () => {
        renderWithProviders(<LoginForm />);
    })

    it('LoginForm should render forget password', () => {
        renderWithProviders(<LoginForm />);
        expect(screen.getByText(/¿Olvidaste tu contraseña?/)).toBeInTheDocument();
    })

})