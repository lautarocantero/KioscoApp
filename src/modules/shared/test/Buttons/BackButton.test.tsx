import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import BackButton from "../../components/Buttons/BackButton";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

const mockedUseNavigate = vi.mocked(useNavigate);

describe("BackButton", () => {
    it("navega hacia atrás al hacer click", () => {
        const navigate = vi.fn();
        mockedUseNavigate.mockReturnValue(navigate);

        render(
            <MemoryRouter>
                <BackButton />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Volver"));

        expect(navigate).toHaveBeenCalledWith(-1);
    });

    it("se alinea centrado por default", () => {
        const { container } = render(
            <MemoryRouter>
                <BackButton />
            </MemoryRouter>
        );

        expect(getComputedStyle(container.firstChild as Element).textAlign).toBe("center");
    });

    it("se alinea a la izquierda cuando align='left'", () => {
        const { container } = render(
            <MemoryRouter>
                <BackButton align="left" />
            </MemoryRouter>
        );

        expect(getComputedStyle(container.firstChild as Element).textAlign).toBe("left");
    });
});
