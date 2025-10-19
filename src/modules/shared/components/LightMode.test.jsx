import { describe, it } from "vitest"
import { render } from "@testing-library/react"
import { createTheme, ThemeProvider } from "@mui/material"
import LightMode from "./LightMode"

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

describe("LightMode", () => {

   it("should render the LightMode correctly", () => {
     renderWithTheme(<LightMode />)
   })

})