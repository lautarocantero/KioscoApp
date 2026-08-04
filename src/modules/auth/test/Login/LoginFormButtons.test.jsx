import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach, vi } from "vitest";
import LoginFormButtons from '../../pages/LoginPage/components/LoginFormComponent/LoginFormButtons'
import { createTheme, ThemeProvider } from "@mui/material";
import '@testing-library/jest-dom'

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

beforeEach(cleanup);

describe('LoginFormButtons', () => {

    const defaultProps = {
        errors: {},
        isSubmitting: false,
        onGoToRegister: vi.fn(),
    }

    it('LoginFormButtons should render correctly', () => {
        renderWithTheme(<LoginFormButtons {...defaultProps}/>);
    })

    it('LoginFormButtons should render 2 buttons', () => {
        renderWithTheme(<LoginFormButtons {...defaultProps}/>);
        screen.getByText('Iniciar sesión');
        screen.getByText('Crear cuenta');
    })

    it('LoginFormButtons should render google button', () => {
        renderWithTheme(<LoginFormButtons {...defaultProps}/>);
        const googleButton = screen.getByRole('button', { name: /google/i });
        expect(googleButton).toBeInTheDocument();
    })

    it('should call onGoToRegister when clicking "Crear cuenta"', () => {
        const onGoToRegister = vi.fn();
        renderWithTheme(<LoginFormButtons {...defaultProps} onGoToRegister={onGoToRegister} />);
        screen.getByText('Crear cuenta').click();
        expect(onGoToRegister).toHaveBeenCalledOnce();
    })

})