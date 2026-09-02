import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import LoginForm from "../../pages/LoginPage/components/LoginFormComponent/LoginForm";
import AuthLayout from '../../layout/AuthLayout';
import authReducer from "../../../../store/auth/authSlice";
import { testTheme } from "../../../shared/test/utils/setupTests";

describe('LoginForm', () => {
  it('should render LoginForm correctly', () => {
    const store = configureStore({ reducer: { auth: authReducer } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider theme={testTheme}>
            <AuthLayout>
              <LoginForm />
            </AuthLayout>
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  });
});