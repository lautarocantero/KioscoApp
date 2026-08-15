// src/hooks/sellers/test/useSellersLinkData.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { SellerStatus } from "@typings/seller/sellerEnums";
import { useSellersLinkData } from "../useSellersLinkData";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return {
        ...actual,
        useDispatch: vi.fn(),
        useSelector: vi.fn(),
    };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);

describe("useSellersLinkData", () => {
    const dispatch = vi.fn();

    const mockSellerState = (
        sellers: unknown[] = [],
        isLoading = false,
        errorMessage: string | null = null,
    ) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ seller: { sellers, isLoading, errorMessage } })
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockSellerState();
    });

    it("expone la cantidad de vendedores como value", () => {
        mockSellerState([{ _id: "1" }, { _id: "2" }, { _id: "3" }]);
        const { result } = renderHook(() => useSellersLinkData());

        expect(result.current.value).toBe(3);
    });

    it("el subtitle es '0 en línea' cuando ningún vendedor está online", () => {
        mockSellerState([{ _id: "1", user_status: SellerStatus.Offline }]);
        const { result } = renderHook(() => useSellersLinkData());

        expect(result.current.subtitle).toBe("0 en línea");
    });

    it("el subtitle cuenta solo los vendedores con user_status online", () => {
        mockSellerState([
            { _id: "1", user_status: SellerStatus.Online },
            { _id: "2", user_status: SellerStatus.Offline },
            { _id: "3", user_status: SellerStatus.Online },
        ]);
        const { result } = renderHook(() => useSellersLinkData());

        expect(result.current.subtitle).toBe("2 en línea");
    });

    it("propaga isLoading y error del store de sellers", () => {
        mockSellerState([], true, "boom");
        const { result } = renderHook(() => useSellersLinkData());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBe("boom");
    });

    it("dispara la carga de vendedores al montar", () => {
        renderHook(() => useSellersLinkData());

        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});
