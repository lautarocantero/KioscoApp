import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type { Product } from "@typings/product/productTypes";
import { useShopRestockReport } from "../useShopRestockReport";
import { createRestockReportPdf } from "../../../modules/shop/helpers/createRestockReportPdf";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("../../../modules/shop/helpers/createRestockReportPdf");

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedCreateRestockReportPdf = vi.mocked(createRestockReportPdf);

const presentation = (id: string, stock: number, min_stock: number, product_id = "p1"): Partial<Presentation> => ({
    _id: id,
    name: `Presentación ${id}`,
    stock,
    min_stock,
    product_id,
});

const product = (id: string, name: string): Partial<Product> => ({ _id: id, name });

describe("useShopRestockReport", () => {
    const dispatch = vi.fn();

    const mockState = ({
        allPresentations = [] as Partial<Presentation>[],
        isLoadingAllPresentations = false,
        allPresentationsError = null as string | null,
        allProducts = [] as Partial<Product>[],
        isLoadingAllProducts = false,
        allProductsError = null as string | null,
    }) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({
                presentation: { allPresentations, isLoadingAllPresentations, allPresentationsError },
                product: { allProducts, isLoadingAllProducts, allProductsError },
            })
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockState({});
    });

    it("arma las filas combinando presentaciones con stock bajo y el catálogo de productos", () => {
        mockState({
            allPresentations: [presentation("1", 2, 10, "p1")],
            allProducts: [product("p1", "Fideos")],
        });

        const { result } = renderHook(() => useShopRestockReport());

        expect(result.current.rows).toHaveLength(1);
        expect(result.current.rows[0]).toMatchObject({ productName: "Fideos", minRestock: 8 });
    });

    it("dispara el fetch de presentaciones y de productos al montar si el store está vacío", () => {
        renderHook(() => useShopRestockReport());
        expect(dispatch).toHaveBeenCalledTimes(2);
    });

    it("no vuelve a disparar el fetch si ya hay datos cargados", () => {
        mockState({
            allPresentations: [presentation("1", 2, 10)],
            allProducts: [product("p1", "Fideos")],
        });

        renderHook(() => useShopRestockReport());
        expect(dispatch).not.toHaveBeenCalled();
    });

    it("propaga isLoading y error de cualquiera de las dos fuentes", () => {
        mockState({ isLoadingAllProducts: true, allPresentationsError: "boom" });
        const { result } = renderHook(() => useShopRestockReport());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBe("boom");
        expect(result.current.isDownloadDisabled).toBe(true);
    });

    it("habilita la descarga cuando ya cargó todo y no hay error", () => {
        mockState({
            allPresentations: [presentation("1", 2, 10)],
            allProducts: [product("p1", "Fideos")],
        });

        const { result } = renderHook(() => useShopRestockReport());
        expect(result.current.isDownloadDisabled).toBe(false);
    });

    it("handleDownload genera el PDF con las filas actuales", async () => {
        mockState({
            allPresentations: [presentation("1", 2, 10, "p1")],
            allProducts: [product("p1", "Fideos")],
        });

        const { result } = renderHook(() => useShopRestockReport());

        await act(async () => {
            result.current.handleDownload();
        });

        expect(mockedCreateRestockReportPdf).toHaveBeenCalledWith(result.current.rows);
    });

    it("handleDownload no rompe si la generación del PDF falla", async () => {
        mockedCreateRestockReportPdf.mockImplementation(() => {
            throw new Error("boom");
        });

        const { result } = renderHook(() => useShopRestockReport());

        await act(async () => {
            expect(() => result.current.handleDownload()).not.toThrow();
        });
    });
});
