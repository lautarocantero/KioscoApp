import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { darkTheme } from "../../../theme/mainTheme";
import LandingFeatureShowcaseItemCard from "../pages/LandingPage/components/LandingFeatureShowcaseItemCard";

describe("LandingFeatureShowcaseItemCard", () => {
  it("renderiza el label y el detail como texto plano, sin rol de botón", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseItemCard
          Icon={AdminPanelSettingsOutlinedIcon}
          label="Gestión de vendedores"
          detail="Cada empleado con su usuario."
          accent="blue"
        />
      </ThemeProvider>
    );

    expect(screen.getByText("Gestión de vendedores")).toBeInTheDocument();
    expect(screen.getByText("Cada empleado con su usuario.")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renderiza el label como botón accesible cuando isClickable es true", () => {
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseItemCard
          Icon={AdminPanelSettingsOutlinedIcon}
          label="Permisos por rol"
          detail="Definís qué puede ver y tocar cada uno."
          accent="blue"
          isClickable
        />
      </ThemeProvider>
    );

    expect(screen.getByRole("button", { name: "Permisos por rol" })).toBeInTheDocument();
  });

  it("dispara onClick al hacer click en la card clickeable", () => {
    const onClick = vi.fn();
    render(
      <ThemeProvider theme={darkTheme}>
        <LandingFeatureShowcaseItemCard
          Icon={AdminPanelSettingsOutlinedIcon}
          label="Permisos por rol"
          detail="Definís qué puede ver y tocar cada uno."
          accent="blue"
          isClickable
          onClick={onClick}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Permisos por rol" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
