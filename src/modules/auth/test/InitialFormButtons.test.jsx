import { beforeEach, describe, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { createTheme, ThemeProvider } from "@mui/material"
import InitialFormButtons from "../pages/LoginPage/components/LoginFormComponent/InitialFormButtons"
import { MemoryRouter } from "react-router-dom"

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

beforeEach(cleanup)

describe('InitialFormButtons', () => {

    it('InitialFormButtons should render correctly', () => {
        renderWithTheme(
            <MemoryRouter>
                <InitialFormButtons />
            </MemoryRouter>
        );
    })

    it('InitialFormButtons should show both buttons correctly', () => {
        renderWithTheme(
            <MemoryRouter>
                <InitialFormButtons />
            </MemoryRouter>
        );
        screen.getByText('Iniciar sesión');
        screen.getByText('Registrarse');
    })

})