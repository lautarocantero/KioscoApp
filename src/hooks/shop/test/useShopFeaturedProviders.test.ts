import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import type { Provider } from "@typings/provider/providerTypes";
import { useShopFeaturedProviders } from "../useShopFeaturedProviders";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);

const provider = (id: string): Provider => ({
    _id: id,
    name: `Proveedor ${id}`,
    valoration: 4,
    contact_phone: "",
    contact_email: "",
});

describe("useShopFeaturedProviders", () => {
    const dispatch = vi.fn();

    const mockProviderState = (providers: Provider[] = [], isLoading = false, errorMessage: string | null = null) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ provider: { providers, isLoading, errorMessage } })
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockProviderState();
    });

    it("recorta el listado real a los primeros 5 proveedores destacados", () => {
        const providers = Array.from({ length: 8 }, (_, i) => provider(String(i)));
        mockProviderState(providers);

        const { result } = renderHook(() => useShopFeaturedProviders());

        expect(result.current.featured).toHaveLength(5);
        expect(result.current.total).toBe(8);
    });

    it("devuelve featured vacío si todavía no hay proveedores", () => {
        const { result } = renderHook(() => useShopFeaturedProviders());

        expect(result.current.featured).toEqual([]);
        expect(result.current.total).toBe(0);
    });

    it("propaga isLoading y error del store de providers", () => {
        mockProviderState([], true, "boom");
        const { result } = renderHook(() => useShopFeaturedProviders());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBe("boom");
    });
});
