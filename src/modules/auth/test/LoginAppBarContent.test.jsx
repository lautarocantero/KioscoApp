import { afterEach, beforeEach, describe, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { createTheme, ThemeProvider } from "@mui/material"
import LoginAppBarContent from "../layout/LoginAppBar/LoginAppBarContent"

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

beforeEach(cleanup)

describe("LoginAppBarContent", () => {

    afterEach(cleanup)

   it("should render the LoginAppBarContent correctly", () => {
      renderWithTheme(<LoginAppBarContent />)
   })

   it("should show the links to register and login", () => {
      renderWithTheme(<LoginAppBarContent />)
      screen.getByText('Inicio de sesión');
      screen.getByText('Registro');
   })

   it('should render the lightMode',() => {
      renderWithTheme(<LoginAppBarContent />)
      screen.getByTestId('ModeNightIcon');
      screen.getByTestId('Brightness4Icon');
   })

})