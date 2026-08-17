import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../utils/setupTests";
import AccountInfoSection from "../../components/SettingsModal/sections/AccountInfoSection";
import { useSidebarUserData } from "../../layout/components/appSideBar/hooks/useSidebarUserData";

vi.mock("../../layout/components/appSideBar/hooks/useSidebarUserData");

const mockedUseSidebarUserData = vi.mocked(useSidebarUserData);

describe("AccountInfoSection", () => {
  it("muestra el nombre de usuario y el correo cuando los datos están listos", () => {
    mockedUseSidebarUserData.mockReturnValue({
      userData: { id: "1", name: "lau_cantero", role: "admin", email: "lau@example.com" },
      isLoading: false,
    });

    renderWithTheme(<AccountInfoSection />);

    expect(screen.getByText("Nombre de usuario")).toBeInTheDocument();
    expect(screen.getByText("lau_cantero")).toBeInTheDocument();
    expect(screen.getByText("Correo electrónico")).toBeInTheDocument();
    expect(screen.getByText("lau@example.com")).toBeInTheDocument();
  });

  it("no muestra las filas de datos mientras está cargando", () => {
    mockedUseSidebarUserData.mockReturnValue({ userData: null, isLoading: true });

    renderWithTheme(<AccountInfoSection />);

    expect(screen.queryByText("Nombre de usuario")).not.toBeInTheDocument();
  });
});
