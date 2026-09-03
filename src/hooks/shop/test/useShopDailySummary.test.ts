import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { SellerStatus } from "@typings/seller/sellerEnums";
import type { SellTicketType, ProductTicketType } from "@typings/sells/sellTypes";
import type { Seller } from "@typings/seller/sellerTypes";
import { useShopDailySummary } from "../useShopDailySummary";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);

const NOW = new Date("2024-06-11T14:00:00");

const product = (id: string, price: number, stock_required: number): ProductTicketType => ({
    _id: id,
    sku: id,
    name: `Producto ${id}`,
    description: "",
    brand: "",
    model_type: "",
    model_size: 1,
    price,
    expiration_date: "",
    image_url: "",
    stock_required,
    sale_type: "unit",
});

const sell = (purchase_date: string, total_amount: number, products: ProductTicketType[] = []): SellTicketType => ({
    _id: purchase_date + total_amount,
    currency: "ars",
    iva: 0,
    modification_date: null,
    payment_method: "cash" as SellTicketType["payment_method"],
    products,
    purchase_date,
    seller_id: "s1",
    seller_name: "Ana",
    sub_total: total_amount,
    total_amount,
    status: "completada" as SellTicketType["status"],
    amount_paid: null,
    debtor_name: null,
    settles_sell_id: null,
    settled_by_sell_id: null,
});

describe("useShopDailySummary", () => {
    const dispatch = vi.fn();

    const mockState = ({
        sells = [] as SellTicketType[],
        sellsLoading = false,
        sellsError = null as string | null,
        sellers = [] as Seller[],
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
        vi.setSystemTime(NOW);
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockState({});
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it("sin ventas: kpis en 0, hasSellsToday false, listas vacías", () => {
        const { result } = renderHook(() => useShopDailySummary());

        expect(result.current.kpis.sales.value).toBe(0);
        expect(result.current.hasSellsToday).toBe(false);
        expect(result.current.topProducts).toEqual([]);
        expect(result.current.partialsAlert.count).toBe(0);
    });

    it("agrega ventas de hoy al total, tickets y más vendidos", () => {
        const today = NOW.toISOString();
        mockState({
            sells: [
                sell(today, 1000, [product("p1", 500, 2)]),
                sell(today, 500, [product("p1", 500, 1)]),
            ],
        });

        const { result } = renderHook(() => useShopDailySummary());

        expect(result.current.hasSellsToday).toBe(true);
        expect(result.current.kpis.sales.value).toBe(1500);
        expect(result.current.kpis.ticketsCount.value).toBe(2);
        expect(result.current.topProducts[0]).toMatchObject({ productId: "p1", quantity: 3, amount: 1500 });
    });

    it("ignora ventas de otros días para el resumen de hoy", () => {
        const yesterday = new Date(NOW);
        yesterday.setDate(yesterday.getDate() - 2);

        mockState({ sells: [sell(yesterday.toISOString(), 9999)] });

        const { result } = renderHook(() => useShopDailySummary());

        expect(result.current.hasSellsToday).toBe(false);
        expect(result.current.kpis.sales.value).toBe(0);
    });

    it("solo incluye vendedores online en activeSellers, con sus ventas de hoy", () => {
        const today = NOW.toISOString();
        mockState({
            sells: [sell(today, 800)],
            sellers: [
                { _id: "s1", name: "Ana", profilePhoto: null, created_at: today, user_status: SellerStatus.Online },
                { _id: "s2", name: "Beto", profilePhoto: null, created_at: today, user_status: SellerStatus.Offline },
            ],
        });

        const { result } = renderHook(() => useShopDailySummary());

        expect(result.current.activeSellers).toHaveLength(1);
        expect(result.current.activeSellers[0]).toMatchObject({ sellerId: "s1", totalAmount: 800 });
    });

    it("propaga isLoading y error de cualquiera de las dos fuentes", () => {
        mockState({ sellersLoading: true, sellsError: "boom" });
        const { result } = renderHook(() => useShopDailySummary());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBe("boom");
    });
});
