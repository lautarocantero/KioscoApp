import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../../../theme/mainTheme";
import OutlinedButtonComponent from "../components/Buttons/OutlinedButtonComponent";

describe("OutlinedButtonComponent", () => {
  it("renderiza el texto y dispara buttonOnClick al hacer click", async () => {
    const buttonOnClick = vi.fn();
    render(
      <ThemeProvider theme={darkTheme}>
        <OutlinedButtonComponent buttonText="Unirme a un kiosco" buttonOnClick={buttonOnClick} />
      </ThemeProvider>
    );

    const button = screen.getByRole("button", { name: "Unirme a un kiosco" });
    await userEvent.click(button);

    expect(buttonOnClick).toHaveBeenCalledTimes(1);
  });

  it("respeta disabled", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <OutlinedButtonComponent buttonText="Deshabilitado" buttonOnClick={vi.fn()} disabled />
      </ThemeProvider>
    );

    expect(screen.getByRole("button", { name: "Deshabilitado" })).toBeDisabled();
  });
});
