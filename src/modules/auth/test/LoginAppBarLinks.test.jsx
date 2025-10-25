import { beforeEach, describe, it } from "vitest"
import LoginAppBarLinks from "../layout/LoginAppBar/LoginAppBarLinks"
import { cleanup, render, screen } from "@testing-library/react"
import { createTheme, ThemeProvider } from "@mui/material"
import { MemoryRouter } from 'react-router-dom'

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

beforeEach(cleanup)

describe("LoginAppBarLinks", () => {

   it("should render the LoginAppBarLinks correctly", () => {
     renderWithTheme(
      <MemoryRouter>
        <LoginAppBarLinks/>
      </MemoryRouter>
     )
   })

  it("should render texts correctly", () => {
    renderWithTheme(
      <MemoryRouter>
        <LoginAppBarLinks />
      </MemoryRouter>
    )
    screen.findAllByText(/Inicio de sesión/i)
    screen.findAllByText("Registro")
  })

})