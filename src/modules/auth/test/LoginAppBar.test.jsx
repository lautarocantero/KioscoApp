import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it } from "vitest";
import LoginAppBar from "../layout/LoginAppBar/LoginAppBar";
import { createTheme, ThemeProvider } from "@mui/material";

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

describe('LoginAppBar', () => {

    afterEach(cleanup)

    it('should render correctly', () => {
        renderWithTheme(<LoginAppBar />);
    });

    it("should show the links to register and login", () => {
      renderWithTheme(<LoginAppBar />)
      screen.getByText('Inicio de sesión');
      screen.getByText('Registro');
   })

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