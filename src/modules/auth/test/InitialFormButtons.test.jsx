import { beforeEach, describe, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { createTheme, ThemeProvider } from "@mui/material"
import InitialFormButtons from "../pages/LoginPage/components/LoginFormComponent/InitialFormButtons"

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

beforeEach(cleanup)

describe('InitialFormButtons', () => {

    it('InitialFormButtons should render correctly', () => {
        renderWithTheme(<InitialFormButtons />)
    })

    it('InitialFormButtons should show both buttons correctly', () => {
        renderWithTheme(<InitialFormButtons />)
        screen.getByText('Iniciar sesión');
        screen.getByText('Registrarse');
    })

})