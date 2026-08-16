import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { useShopLowStockPresentations } from "../useShopLowStockPresentations";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);

const presentation = (id: string, stock: number, min_stock: number): Partial<Presentation> => ({
    _id: id,
    name: `Presentación ${id}`,
    stock,
    min_stock,
});

describe("useShopLowStockPresentations", () => {
    const dispatch = vi.fn();

    const mockState = ({
        allPresentations = [] as Partial<Presentation>[],
        isLoadingAllPresentations = false,
        allPresentationsError = null as string | null,
    }) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ presentation: { allPresentations, isLoadingAllPresentations, allPresentationsError } })
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockState({});
    });

    it("filtra y devuelve solo las presentaciones con stock bajo real", () => {
        mockState({
            allPresentations: [presentation("1", 20, 10), presentation("2", 2, 10)],
        });

        const { result } = renderHook(() => useShopLowStockPresentations());

        expect(result.current.lowStock).toHaveLength(1);
        expect(result.current.lowStock[0].presentationId).toBe("2");
        expect(result.current.total).toBe(1);
    });

    it("acota la lista visible a 20 pero expone el total real completo", () => {
        const many = Array.from({ length: 45 }, (_, i) => presentation(String(i), 1, 10));
        mockState({ allPresentations: many });

        const { result } = renderHook(() => useShopLowStockPresentations());

        expect(result.current.lowStock).toHaveLength(20);
        expect(result.current.total).toBe(45);
    });

    it("dispara el fetch al montar si todavía no hay presentaciones en el store", () => {
        renderHook(() => useShopLowStockPresentations());
        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it("no vuelve a disparar el fetch si ya hay presentaciones cargadas", () => {
        mockState({ allPresentations: [presentation("1", 20, 10)] });
        renderHook(() => useShopLowStockPresentations());
        expect(dispatch).not.toHaveBeenCalled();
    });

    it("propaga isLoading y error del store de presentation", () => {
        mockState({ isLoadingAllPresentations: true, allPresentationsError: "boom" });
        const { result } = renderHook(() => useShopLowStockPresentations());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBe("boom");
    });
});
