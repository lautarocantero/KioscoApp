import { describe, it } from "vitest"
import LoginAppBarLinks from "../pages/LoginPage/components/LoginAppBar/LoginAppBarLinks"
import { render, screen } from "@testing-library/react"
import { createTheme, ThemeProvider } from "@mui/material"

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

describe("LoginAppBarLinks", () => {

   it("should render the LoginAppBarLinks correctly", () => {
     renderWithTheme(<LoginAppBarLinks/>)
   })

  it("should render texts correctly", () => {
    renderWithTheme(<LoginAppBarLinks />)
    screen.findAllByText(/Inicio de sesión/i)
    screen.findAllByText("Registro")
  })

})