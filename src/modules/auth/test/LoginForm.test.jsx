import { createTheme, ThemeProvider } from "@mui/material";
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it } from "vitest";
import LoginForm from '../pages/LoginPage/components/LoginFormComponent/LoginForm'
import { beforeEach } from "node:test";
import '@testing-library/jest-dom'

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

beforeEach(cleanup)

describe('LoginForm', () => {
    const defaultProps= {showForm: true}
    
    it('LoginForm should render correctly', () => {
        renderWithTheme(<LoginForm />);
    })

    it('LoginForm should render forget password', () => {
        renderWithTheme(<LoginForm {...defaultProps}/>);
        expect(screen.getByText(/¿Olvidaste tu contraseña?/)).toBeInTheDocument();
    })
    
})