import { describe, it, vi, expect, beforeEach } from "vitest"
import { render, screen, fireEvent, cleanup } from "@testing-library/react"
import '@testing-library/jest-dom'
import { ThemeProvider, createTheme } from "@mui/material"
import LoginFormInputs from "../pages/LoginPage/components/LoginFormComponent/LoginFormInputs"

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)

beforeEach(cleanup)

describe("LoginFormInputs", () => {
  const mockSetFieldValue = vi.fn()
  const defaultProps = {
    values: { email: "", password: "" },
    setFieldValue: mockSetFieldValue,
    errors: {},
  }

  it("should render email and password inputs", () => {
    renderWithTheme(<LoginFormInputs {...defaultProps} />)

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument()
    expect(screen.getByText(/Iniciar sesión/i)).toBeInTheDocument()
  })

  it("should call setFieldValue when typing in inputs", () => {
    renderWithTheme(<LoginFormInputs {...defaultProps} />)

    const emailInput = screen.getByLabelText(/E-mail/i)
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })

    expect(mockSetFieldValue).toHaveBeenCalledWith("email", "test@example.com")
  })

  it("should toggle password visibility when clicking the icon", () => {
    renderWithTheme(<LoginFormInputs {...defaultProps} />)

    const toggleButton = screen.getByRole("button")

    const passwordInput = screen.getByLabelText(/Contraseña/i)
    expect(passwordInput).toHaveAttribute("type", "password")

    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute("type", "text")

    fireEvent.click(toggleButton)
    expect(passwordInput).toHaveAttribute("type", "password")
  })

  it("should show error messages when provided", () => {
    const propsWithErrors = {
      ...defaultProps,
      errors: { email: "Email inválido", password: "Campo requerido" },
    }

    renderWithTheme(<LoginFormInputs {...propsWithErrors} />)

    expect(screen.getByText(/Email inválido/i)).toBeInTheDocument()
    expect(screen.getByText(/Campo requerido/i)).toBeInTheDocument()
  })
})
