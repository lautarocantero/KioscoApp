import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import LoginForm from "../../../modules/auth/pages/LoginPage/components/LoginFormComponent/LoginForm";
import { ThemeContext } from "@emotion/react";
import { AuthLayout } from '../../../../src/modules/auth/layout/AuthLayout';

describe('LoginForm', () => {
  it('should render LoginForm correctly', () => {
    render(
      <ThemeContext.Provider value={{ appTheme: true }}>
        <AuthLayout>
          <LoginForm />
        </AuthLayout>
      </ThemeContext.Provider>
    );
  });
});