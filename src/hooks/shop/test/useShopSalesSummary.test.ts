import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { act } from "react";
import { SellerStatus } from "@typings/seller/sellerEnums";
import { ShopSalesRange } from "@typings/shop/shopEnums";
import type { SellTicketType } from "@typings/sells/sellTypes";
import type { Seller } from "@typings/seller/sellerTypes";
import { useShopSalesSummary } from "../useShopSalesSummary";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);

describe("useShopSalesSummary", () => {
    const dispatch = vi.fn();

    const mockState = ({
        sells = [] as Pick<SellTicketType, "_id" | "purchase_date" | "seller_id" | "seller_name" | "total_amount">[],
        sellsLoading = false,
        sellsError = null as string | null,
        sellers = [] as Pick<Seller, "_id" | "user_status">[],
        sellersLoading = false,
        sellersError = null as string | null,
    }) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({
                sell: { sells, isLoading: sellsLoading, errorMessage: sellsError },
                seller: { sellers, isLoading: sellersLoading, errorMessage: sellersError },
            })
        );
    };

    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockState({});
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it("arma por defecto una serie de 7 días y un total en 0 sin ventas", () => {
        const { result } = renderHook(() => useShopSalesSummary());

        expect(result.current.range).toBe(ShopSalesRange.SevenDays);
        expect(result.current.dailySales).toHaveLength(7);
        expect(result.current.periodTotal).toBe(0);
        expect(result.current.topSellers).toEqual([]);
    });

    it("agrega ventas reales al total del período y al ranking de vendedores", () => {
        const today = new Date().toISOString();
        mockState({
            sells: [
                { _id: "1", purchase_date: today, seller_id: "s1", seller_name: "Ana", total_amount: 500 },
                { _id: "2", purchase_date: today, seller_id: "s1", seller_name: "Ana", total_amount: 300 },
            ],
            sellers: [{ _id: "s1", user_status: SellerStatus.Online }],
        });

        const { result } = renderHook(() => useShopSalesSummary());

        expect(result.current.periodTotal).toBe(800);
        expect(result.current.topSellers[0]).toMatchObject({ sellerId: "s1", totalAmount: 800, ordersCount: 2 });
    });

    it("recalcula la serie según el rango elegido con setRange", () => {
        const today = new Date();
        const twentyDaysAgo = new Date();
        twentyDaysAgo.setDate(today.getDate() - 20);

        mockState({
            sells: [
                { _id: "1", purchase_date: today.toISOString(), seller_id: "s1", seller_name: "Ana", total_amount: 100 },
                { _id: "2", purchase_date: twentyDaysAgo.toISOString(), seller_id: "s1", seller_name: "Ana", total_amount: 900 },
            ],
        });

        const { result } = renderHook(() => useShopSalesSummary());

        expect(result.current.dailySales).toHaveLength(7);
        expect(result.current.periodTotal).toBe(100);

        act(() => result.current.setRange(ShopSalesRange.Month));

        expect(result.current.range).toBe(ShopSalesRange.Month);
        expect(result.current.dailySales).toHaveLength(30);
        expect(result.current.periodTotal).toBe(1000);
    });

    it("propaga isLoading si cualquiera de las dos fuentes está cargando", () => {
        mockState({ sellersLoading: true });
        const { result } = renderHook(() => useShopSalesSummary());

        expect(result.current.isLoading).toBe(true);
    });

    it("propaga el primer error disponible entre sells y sellers", () => {
        mockState({ sellsError: "boom" });
        const { result } = renderHook(() => useShopSalesSummary());

        expect(result.current.error).toBe("boom");
    });
});
