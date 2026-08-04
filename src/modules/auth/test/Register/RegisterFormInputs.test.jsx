// src/modules/auth/test/Register/RegisterFormInputs.test.jsx
import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import RegisterFormInputs from "../../pages/RegisterPage/components/RegisterFormInputs";

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

beforeEach(cleanup);

describe("RegisterFormInputs", () => {
  const mockSetFieldValue = vi.fn();
  const defaultProps = {
    values: { username: "", email: "", password: "", repeatPassword: "" },
    setFieldValue: mockSetFieldValue,
    errors: {},
  };

  it("should call setFieldValue when typing in the username input", () => {
    const { container } = renderWithTheme(<RegisterFormInputs {...defaultProps} />);
    const usernameInput = container.querySelector('input[name="username"]');
    fireEvent.change(usernameInput, { target: { value: "lautaro" } });
    expect(mockSetFieldValue).toHaveBeenCalledWith("username", "lautaro");
  });

  it("should call setFieldValue when typing in the email input", () => {
    const { container } = renderWithTheme(<RegisterFormInputs {...defaultProps} />);
    const emailInput = container.querySelector('input[name="email"]');
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(mockSetFieldValue).toHaveBeenCalledWith("email", "test@example.com");
  });

  it("should call setFieldValue when typing in the password input", () => {
    const { container } = renderWithTheme(<RegisterFormInputs {...defaultProps} />);
    const passwordInput = container.querySelector('input[name="password"]');
    fireEvent.change(passwordInput, { target: { value: "secret123" } });
    expect(mockSetFieldValue).toHaveBeenCalledWith("password", "secret123");
  });

  it("should call setFieldValue when typing in the repeat password input", () => {
    const { container } = renderWithTheme(<RegisterFormInputs {...defaultProps} />);
    const repeatInput = container.querySelector('input[name="repeatPassword"]');
    fireEvent.change(repeatInput, { target: { value: "secret123" } });
    expect(mockSetFieldValue).toHaveBeenCalledWith("repeatPassword", "secret123");
  });

  it("should toggle password visibility independently from repeat password", () => {
    const { container } = renderWithTheme(<RegisterFormInputs {...defaultProps} />);

    const passwordInput = container.querySelector('input[name="password"]');
    const repeatInput = container.querySelector('input[name="repeatPassword"]');

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(repeatInput).toHaveAttribute("type", "password");

    const passwordToggle = passwordInput
      .closest(".MuiFormControl-root")
      .querySelector('button[type="button"]');
    const repeatToggle = repeatInput
      .closest(".MuiFormControl-root")
      .querySelector('button[type="button"]');

    fireEvent.click(passwordToggle);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(repeatInput).toHaveAttribute("type", "password");

    fireEvent.click(repeatToggle);
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(repeatInput).toHaveAttribute("type", "text");
  });

  it("should show error messages when provided", () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: {
        username: "Usuario requerido",
        email: "Email inválido",
        password: "Campo requerido",
        repeatPassword: "Las contraseñas no coinciden",
      },
    };

    const { getByText } = renderWithTheme(<RegisterFormInputs {...propsWithErrors} />);

    expect(getByText(/Usuario requerido/i)).toBeInTheDocument();
    expect(getByText(/Email inválido/i)).toBeInTheDocument();
    expect(getByText(/Campo requerido/i)).toBeInTheDocument();
    expect(getByText(/Las contraseñas no coinciden/i)).toBeInTheDocument();
  });
});