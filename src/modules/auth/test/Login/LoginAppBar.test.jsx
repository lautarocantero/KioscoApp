import { beforeEach, describe, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import LoginAppBar from "../../layout/LoginAppBar/LoginAppBar"
import { createTheme, ThemeProvider } from "@mui/material"
import { MemoryRouter } from "react-router-dom"

const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider theme={createTheme()}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>
  )
}

describe('LoginAppBar', () => {

    beforeEach(cleanup)

    it('should render correctly', () => {
        renderWithTheme(<LoginAppBar />);
    });

   it('should render the lightMode',() => {
      renderWithTheme(<LoginAppBar />)
      screen.getByTestId('ModeNightIcon');
      screen.getByTestId('Brightness4Icon');
   })

   it('should render the Appbar', () => {
        renderWithTheme(<LoginAppBar />);
        screen.getByTestId('login-appbar');
    });

});