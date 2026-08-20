import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithTheme } from "../utils/setupTests";
import SettingsModal from "../../components/SettingsModal/SettingsModal";

vi.mock("../../components/SettingsModal/sections/AccountInfoSection", () => ({
  default: () => <div data-testid="section-account-info" />,
}));
vi.mock("../../components/SettingsModal/sections/AccountPasswordSection", () => ({
  default: () => <div data-testid="section-account-password" />,
}));
vi.mock("../../components/SettingsModal/sections/AppearanceModeSection", () => ({
  default: () => <div data-testid="section-appearance-mode" />,
}));
vi.mock("../../components/SettingsModal/sections/AppearanceLanguageSection", () => ({
  default: () => <div data-testid="section-appearance-language" />,
}));

describe("SettingsModal", () => {
  it("muestra 'Información de cuenta' por defecto, navega entre secciones y cierra con el botón X", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    renderWithTheme(
      <MemoryRouter>
        <SettingsModal open onClose={onClose} />
      </MemoryRouter>
    );

    expect(screen.getByText("Ajustes")).toBeInTheDocument();
    expect(screen.getByTestId("section-account-info")).toBeInTheDocument();

    await user.click(screen.getByText("Modo"));
    expect(screen.getByTestId("section-appearance-mode")).toBeInTheDocument();

    await user.click(screen.getByText("Contraseña y seguridad"));
    expect(screen.getByTestId("section-account-password")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cerrar ajustes" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
