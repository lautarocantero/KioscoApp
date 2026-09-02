import { describe, it, expect, beforeEach } from "vitest"
import { cleanup, render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material"
import { ThemeContext } from "../../../../theme/ThemeContext"
import LightMode from "../../components/LightMode/LightMode"

// LightMode depende de ThemeContext para el estado real (el valor por
// defecto del contexto trae un setAppTheme no-op), así que este wrapper
// provee un Provider con estado de verdad para poder testear el toggle.
const StatefulThemeContextProvider = ({ children }) => {
  const [appTheme, setAppTheme] = useState(true)
  return (
    <ThemeContext.Provider value={{ appTheme, setAppTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider theme={createTheme()}>
      <StatefulThemeContextProvider>{ui}</StatefulThemeContextProvider>
    </ThemeProvider>
  )
}

beforeEach(() => {
  cleanup()
  localStorage.clear()
})

describe("LightMode", () => {

   it("should render the LightMode correctly", () => {
     renderWithTheme(<LightMode />)
   })

   it("should render as a switch with the moon icon in light mode (default)", () => {
     renderWithTheme(<LightMode />)
     const toggle = screen.getByRole("switch", { name: /cambiar modo de tema/i })
     expect(toggle).toHaveAttribute("aria-checked", "true")
     expect(screen.getByTestId("ModeNightIcon")).toBeInTheDocument()
     expect(screen.queryByTestId("Brightness4Icon")).not.toBeInTheDocument()
   })

   it("should switch to the sun icon after a click (dark mode)", () => {
     renderWithTheme(<LightMode />)
     const toggle = screen.getByRole("switch", { name: /cambiar modo de tema/i })

     fireEvent.click(toggle)

     expect(toggle).toHaveAttribute("aria-checked", "false")
     expect(screen.getByTestId("Brightness4Icon")).toBeInTheDocument()
     expect(screen.queryByTestId("ModeNightIcon")).not.toBeInTheDocument()
   })

})
