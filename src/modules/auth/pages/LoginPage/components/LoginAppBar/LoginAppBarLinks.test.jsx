import { describe, it } from "vitest"
import LoginAppBarLinks from "./LoginAppBarLinks"
import { render, screen } from "@testing-library/react"
import { createTheme, ThemeProvider } from "@mui/material"

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

describe("LoginAppBarLinks", () => {

//   it("should render correctly", () => {
//     render(<LoginAppBarLinks/>)
//   })

  it("should render text correctly", () => {
    renderWithTheme(<LoginAppBarLinks />)
    screen.getByText("Inicio de sesión")
    screen.getByText("Registro")
  })

})