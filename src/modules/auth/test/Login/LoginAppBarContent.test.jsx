import { afterEach, beforeEach, describe, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { createTheme, ThemeProvider } from "@mui/material"
import { MemoryRouter } from "react-router-dom"
import LoginAppBarContent from "../../layout/LoginAppBar/LoginAppBarContent"

const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider theme={createTheme()}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>
  )
}

beforeEach(cleanup)

describe("LoginAppBarContent", () => {

    afterEach(cleanup)

   it("should render the LoginAppBarContent correctly", () => {
      renderWithTheme(<LoginAppBarContent />)
   })

   it('should render the lightMode',() => {
      renderWithTheme(<LoginAppBarContent />)
      screen.getByTestId('ModeNightIcon');
      screen.getByTestId('Brightness4Icon');
   })

})