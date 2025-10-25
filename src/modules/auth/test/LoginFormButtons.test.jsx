import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, beforeEach } from "vitest";
import LoginFormButtons from '../pages/LoginPage/components/LoginFormComponent/LoginFormButtons'
import { createTheme, ThemeProvider } from "@mui/material";
import '@testing-library/jest-dom'

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

beforeEach(cleanup);

describe('LoginFormButtons', () => {

    const defaultProps = { errors: {}}

    it('LoginFormButtons should render correctly', () => {
        renderWithTheme(<LoginFormButtons {...defaultProps}/>);
    })

    it('LoginFormButtons should render 2 buttons', () => {
        renderWithTheme(<LoginFormButtons {...defaultProps}/>);
        screen.getByText('Continuar');
        screen.getByText('Crear cuenta');
    })

    it('LoginFormButtons should render google button', () => {
        renderWithTheme(<LoginFormButtons {...defaultProps}/>);
        const googleButton = screen.getByRole('button', { name: /google/i });
        expect(googleButton).toBeInTheDocument();
    })

})