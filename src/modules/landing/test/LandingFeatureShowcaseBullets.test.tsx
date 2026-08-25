import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import "@i18n/i18n";
import { darkTheme } from "../../../theme/mainTheme";
import LandingFeatureShowcaseBullets from "../pages/LandingPage/components/LandingFeatureShowcaseBullets";

const BULLETS = [
    { Icon: GroupOutlinedIcon, labelKey: "landing.showcase.multiKiosco.bullets.sellerManagement" },
    { Icon: AdminPanelSettingsOutlinedIcon, labelKey: "landing.showcase.multiKiosco.bullets.rolePermissions", isClickable: true },
];

describe("LandingFeatureShowcaseBullets", () => {
    it("renderiza un bullet normal como texto plano, sin rol de botón", () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <LandingFeatureShowcaseBullets bullets={BULLETS} accent="blue" />
            </ThemeProvider>
        );

        expect(screen.getByText("Gestión de vendedores")).toBeInTheDocument();
        expect(screen.queryByRole("button", { name: "Gestión de vendedores" })).not.toBeInTheDocument();
    });

    it("renderiza el bullet marcado isClickable como botón accesible", () => {
        render(
            <ThemeProvider theme={darkTheme}>
                <LandingFeatureShowcaseBullets bullets={BULLETS} accent="blue" />
            </ThemeProvider>
        );

        expect(screen.getByRole("button", { name: "Permisos por rol" })).toBeInTheDocument();
    });

    it("dispara onBulletClick al hacer click en el bullet clickeable", () => {
        const onBulletClick = vi.fn();
        render(
            <ThemeProvider theme={darkTheme}>
                <LandingFeatureShowcaseBullets bullets={BULLETS} accent="blue" onBulletClick={onBulletClick} />
            </ThemeProvider>
        );

        fireEvent.click(screen.getByRole("button", { name: "Permisos por rol" }));

        expect(onBulletClick).toHaveBeenCalledTimes(1);
    });
});
