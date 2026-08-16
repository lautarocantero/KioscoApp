import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import type { ProductWithPresentations } from "@typings/product/productTypes";
import { useShopInventorySummary } from "../useShopInventorySummary";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);

const productWithStock = (id: string): Partial<ProductWithPresentations> => ({ _id: id });

describe("useShopInventorySummary", () => {
    const dispatch = vi.fn();

    const mockState = ({
        totalProducts = null as number | null,
        lowStockPresentations = null as number | null,
        statsLoading = false,
        statsError = null as string | null,
        products = [] as Partial<ProductWithPresentations>[],
        productsLoading = false,
        productsError = null as string | null,
    }) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({
                product: {
                    stats: totalProducts === null ? null : { totalProducts, lowStockPresentations },
                    isLoadingStats: statsLoading,
                    statsError,
                    products,
                    isLoading: productsLoading,
                    errorMessage: productsError,
                },
            })
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockState({});
    });

    it("deriva 'con stock' del listado real de productos con stock", () => {
        mockState({ totalProducts: 10, lowStockPresentations: 2, products: [productWithStock("1"), productWithStock("2")] });

        const { result } = renderHook(() => useShopInventorySummary());

        expect(result.current.total).toBe(10);
        expect(result.current.withStock).toBe(2);
        expect(result.current.lowStock).toBe(2);
    });

    it("deriva 'sin stock' restando con-stock al total, sin bajar de 0", () => {
        mockState({ totalProducts: 10, products: [productWithStock("1"), productWithStock("2")] });
        const { result } = renderHook(() => useShopInventorySummary());
        expect(result.current.withoutStock).toBe(8);

        mockState({ totalProducts: 1, products: [productWithStock("1"), productWithStock("2")] });
        const { result: result2 } = renderHook(() => useShopInventorySummary());
        expect(result2.current.withoutStock).toBe(0);
    });

    it("withoutStock es null mientras no hay total real todavía", () => {
        const { result } = renderHook(() => useShopInventorySummary());
        expect(result.current.withoutStock).toBeNull();
    });

    it("propaga isLoading si cualquiera de las dos fuentes está cargando", () => {
        mockState({ productsLoading: true });
        const { result } = renderHook(() => useShopInventorySummary());
        expect(result.current.isLoading).toBe(true);
    });

    it("propaga el primer error disponible entre stats y el listado con stock", () => {
        mockState({ productsError: "boom" });
        const { result } = renderHook(() => useShopInventorySummary());
        expect(result.current.error).toBe("boom");
    });
});
