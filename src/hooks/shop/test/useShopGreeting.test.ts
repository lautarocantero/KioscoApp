import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import { useShopGreeting } from "../useShopGreeting";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useSelector: vi.fn() };
});

const mockedUseSelector = vi.mocked(useSelector);

describe("useShopGreeting", () => {
    const mockAuthState = (name = "", isLoading = false) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ auth: { name, isLoading } })
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockAuthState();
    });

    it("saluda con el nombre real del usuario cuando hay uno en el store", () => {
        mockAuthState("Lautaro");
        const { result } = renderHook(() => useShopGreeting());

        expect(result.current.greeting).toBe("¡Hola, Lautaro! 👋");
    });

    it("usa un saludo genérico cuando todavía no hay nombre en el store", () => {
        const { result } = renderHook(() => useShopGreeting());

        expect(result.current.greeting).toBe("¡Hola! 👋");
    });

    it("propaga isLoading del store de auth", () => {
        mockAuthState("Lautaro", true);
        const { result } = renderHook(() => useShopGreeting());

        expect(result.current.isLoading).toBe(true);
    });
});
