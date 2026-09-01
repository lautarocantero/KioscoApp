import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingFeatureShowcaseItems from "../pages/LandingPage/components/LandingFeatureShowcaseItems";

const ITEMS = [
  {
    Icon: GroupOutlinedIcon,
    labelKey: "landing.showcase.multiKiosco.items.sellerManagement.label",
    detailKey: "landing.showcase.multiKiosco.items.sellerManagement.detail",
  },
  {
    Icon: AdminPanelSettingsOutlinedIcon,
    labelKey: "landing.showcase.multiKiosco.items.rolePermissions.label",
    detailKey: "landing.showcase.multiKiosco.items.rolePermissions.detail",
    isClickable: true,
  },
];

describe("LandingFeatureShowcaseItems", () => {
  it("renderiza una card por cada item recibido, con su label y detail traducidos", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseItems items={ITEMS} accent="blue" />
      </ThemeProvider>
    );

    expect(screen.getByText("Gestión de vendedores")).toBeInTheDocument();
    expect(screen.getByText("Cada empleado con su usuario.")).toBeInTheDocument();
    expect(screen.getByText("Definís qué puede ver y tocar cada uno.")).toBeInTheDocument();
  });

  it("dispara onItemClick solo al clickear la card marcada isClickable", () => {
    const onItemClick = vi.fn();
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseItems items={ITEMS} accent="blue" onItemClick={onItemClick} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Permisos por rol" }));

    expect(onItemClick).toHaveBeenCalledTimes(1);
  });
});
