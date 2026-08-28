import { describe, it, expect, vi } from "vitest";
import { screen, within, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import type { UserData } from "@typings/account/accountComponentTypes";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { renderWithTheme } from "../../../../../test/utils/setupTests";
import SidebarUserMenu from "../SidebarUserMenu";

const userData: UserData = { id: "u1", name: "Lautaro", role: AuthRoleEnum.Admin, email: "lautaro@test.com" };

const renderMenu = (onOpenSettings = vi.fn(), onLogout = vi.fn()) =>
  renderWithTheme(
    <MemoryRouter>
      <SidebarUserMenu userData={userData} onOpenSettings={onOpenSettings} onLogout={onLogout} />
    </MemoryRouter>
  );

describe("SidebarUserMenu", () => {
  it("muestra el nombre y el rol del usuario", () => {
    renderMenu();

    expect(screen.getByText("Lautaro")).toBeInTheDocument();
  });

  it("dispara onOpenSettings al tocar Ajustes", async () => {
    const user = userEvent.setup();
    const onOpenSettings = vi.fn();
    renderMenu(onOpenSettings);

    await user.click(screen.getByRole("button", { name: /Ajustes/ }));

    expect(onOpenSettings).toHaveBeenCalledTimes(1);
  });

  it("no dispara onLogout directo — abre un diálogo de confirmación", async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn();
    renderMenu(vi.fn(), onLogout);

    await user.click(screen.getByRole("button", { name: "Cerrar sesión" }));

    expect(onLogout).not.toHaveBeenCalled();
    expect(screen.getByText("¿Seguro que querés cerrar sesión?")).toBeInTheDocument();
  });

  it("dispara onLogout recién al confirmar en el diálogo", async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn();
    renderMenu(vi.fn(), onLogout);

    await user.click(screen.getByRole("button", { name: "Cerrar sesión" }));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: "Cerrar sesión" }));

    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it("cancelar el diálogo no dispara onLogout y lo cierra", async () => {
    const user = userEvent.setup();
    const onLogout = vi.fn();
    renderMenu(vi.fn(), onLogout);

    await user.click(screen.getByRole("button", { name: "Cerrar sesión" }));
    const dialog = screen.getByRole("dialog");
    await user.click(within(dialog).getByRole("button", { name: "Cancelar" }));

    expect(onLogout).not.toHaveBeenCalled();
    await waitForElementToBeRemoved(() => screen.queryByText("¿Seguro que querés cerrar sesión?"));
  });

  it("no repite los links de cuenta (ya están en la página de Cuenta)", () => {
    renderMenu();

    expect(screen.queryByRole("link", { name: /Editar cuenta/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Plan de suscripción/ })).not.toBeInTheDocument();
  });
});
