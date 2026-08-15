// src/hooks/sellers/test/useSellerListData.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { SellerStatus } from "@typings/seller/sellerEnums";
import useSellersListData from "../useSellerListData";

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

const seller = (id: string, user_status: SellerStatus) => ({ _id: id, user_status });

describe("useSellersListData", () => {
    const dispatch = vi.fn();

    const mockSellerState = (sellers: unknown[]) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ seller: { sellers, isLoading: false, errorMessage: null } })
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
    });

    it("devuelve los vendedores online primero, sin importar el orden del store", () => {
        mockSellerState([
            seller("1", SellerStatus.Offline),
            seller("2", SellerStatus.Online),
            seller("3", SellerStatus.Offline),
        ]);

        const { result } = renderHook(() => useSellersListData());

        expect(result.current.sellers.map((s: { _id: string }) => s._id)).toEqual(["2", "1", "3"]);
    });

    it("dispara la carga de vendedores al montar", () => {
        mockSellerState([]);
        renderHook(() => useSellersListData());

        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });
});
