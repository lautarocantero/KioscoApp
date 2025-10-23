import InitialFormState from "../pages/LoginPage/components/LoginFormComponent/InitialFormState"
import { beforeEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { createTheme, ThemeProvider } from "@mui/material"

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

beforeEach(cleanup)

describe('InitialFormState', () => {

    it('InitialFormState should render correctly', () => {
        renderWithTheme(<InitialFormState />)
    })

    it(`should show 'Kiosco'`, () => {
        renderWithTheme(<InitialFormState />);
        expect(document.querySelector('h1').textContent).toContain('Kiosco');
        expect(screen.findAllByAltText("kiosco icon")).toBeTruthy()
    });

    it('InitialFormButtons should show both buttons correctly', () => {
        renderWithTheme(<InitialFormState />)
        screen.getByText('Iniciar sesión');
        screen.getByText('Registrarse');
    })

})