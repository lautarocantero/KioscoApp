import { describe, it } from "vitest"
import { render } from "@testing-library/react"
import { createTheme, ThemeProvider } from "@mui/material"
import LoginAppBarContent from "./LoginAppBarContent"

const renderWithTheme = (ui) => {
  return render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>)
}

describe("LoginAppBarContent", () => {

   it("should render the LoginAppBarContent correctly", () => {
     renderWithTheme(<LoginAppBarContent />)
   })

})