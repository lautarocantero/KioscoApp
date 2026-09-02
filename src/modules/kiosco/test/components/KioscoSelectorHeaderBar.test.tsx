import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { useSelector } from "react-redux";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { useLogout } from "../../../../hooks/auth/useLogout";
import KioscoSelectorHeaderBar from "../../components/KioscoSelectorHeaderBar/KioscoSelectorHeaderBar";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useSelector: vi.fn() };
});

vi.mock("../../../../hooks/auth/useLogout", () => ({
    useLogout: vi.fn(),
}));

vi.mock("../../../shared/components/LanguageToggle/LanguageToggle", () => ({
    default: () => null,
}));

vi.mock("../../../shared/components/LightMode/LightMode", () => ({
    default: () => null,
}));

const mockedUseSelector = vi.mocked(useSelector);
const mockedUseLogout = vi.mocked(useLogout);

describe("KioscoSelectorHeaderBar", () => {
    const handleLogout = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        handleLogout.mockResolvedValue(undefined);
        mockedUseLogout.mockReturnValue({ handleLogout });
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ auth: { name: "Lautaro Cantero", email: "lautaro@kioscoapp.com", profilePhoto: null } })
        );
    });

    it("muestra la marca, el nombre y el email del usuario", () => {
        renderWithTheme(<KioscoSelectorHeaderBar />);

        expect(screen.getByText("Stocko")).toBeInTheDocument();
        expect(screen.getByText("Lautaro Cantero")).toBeInTheDocument();
        expect(screen.getByText("lautaro@kioscoapp.com")).toBeInTheDocument();
    });

    it("pide confirmación antes de cerrar sesión, y ejecuta handleLogout al confirmar", () => {
        renderWithTheme(<KioscoSelectorHeaderBar />);

        fireEvent.click(screen.getByText("Cerrar sesión"));
        expect(handleLogout).not.toHaveBeenCalled();

        fireEvent.click(screen.getByText("Sí, cerrar sesión"));
        expect(handleLogout).toHaveBeenCalledTimes(1);
    });

    it("no ejecuta el logout si se cancela la confirmación", () => {
        renderWithTheme(<KioscoSelectorHeaderBar />);

        fireEvent.click(screen.getByText("Cerrar sesión"));
        fireEvent.click(screen.getByText("Cancelar"));

        expect(handleLogout).not.toHaveBeenCalled();
    });
});
