import { beforeEach, describe, expect, it } from "vitest"
import LoginFormHandler from '../pages/LoginPage/components/LoginFormComponent/LoginFormHandler';
import { createTheme, ThemeProvider } from "@mui/material";
import { cleanup, render, screen } from "@testing-library/react"

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

beforeEach(cleanup)

describe("LoginFormHandler", () => {

    it('Should render the LoginFormHandler correctly', () => {
        renderWithTheme(<LoginFormHandler/>)
    })

    it(`should show 'Kiosco'`, () => {
        renderWithTheme(<LoginFormHandler />);
        expect(document.querySelector('h1').textContent).toContain('Kiosco');
        expect(screen.findAllByAltText("kiosco icon")).toBeTruthy()
    });

    it('InitialFormButtons should show both buttons correctly', () => {
        renderWithTheme(<LoginFormHandler />)
        screen.getByText('Iniciar sesión');
        screen.getByText('Registrarse');
    })

})