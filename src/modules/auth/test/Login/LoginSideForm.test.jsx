import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import LoginForm from "../../pages/LoginPage/components/LoginFormComponent/LoginForm";
import AuthLayout from '../../layout/AuthLayout';
import authReducer from "../../../../store/auth/authSlice";

describe('LoginForm', () => {
  it('should render LoginForm correctly', () => {
    const store = configureStore({ reducer: { auth: authReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={createTheme()}>
            <AuthLayout>
              <LoginForm />
            </AuthLayout>
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  });
});