import { describe, it, expect } from "vitest";
import type { ProductTicketType, SellTicketType } from "@typings/sells/sellTypes";
import { aggregateTopProductsToday } from "../../helpers/aggregateTopProductsToday";

const product = (id: string, name: string, price: number, stock_required: number): ProductTicketType => ({
    _id: id,
    sku: id,
    name,
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

const sell = (products: ProductTicketType[]): SellTicketType => ({
    _id: Math.random().toString(),
    currency: "ars",
    iva: 0,
    modification_date: null,
    payment_method: "cash" as SellTicketType["payment_method"],
    products,
    purchase_date: new Date().toISOString(),
    seller_id: "s1",
    seller_name: "Vendedor",
    sub_total: 0,
    total_amount: 0,
    status: "completada" as SellTicketType["status"],
    amount_paid: null,
    debtor_name: null,
    settles_sell_id: null,
    settled_by_sell_id: null,
});

describe("aggregateTopProductsToday", () => {
    it("devuelve un array vacío sin ventas", () => {
        expect(aggregateTopProductsToday([])).toEqual([]);
    });

    it("suma cantidad y monto (price * stock_required) del mismo producto en distintas ventas", () => {
        const sells = [
            sell([product("p1", "Coca-Cola", 1000, 2)]),
            sell([product("p1", "Coca-Cola", 1000, 3)]),
        ];

        const result = aggregateTopProductsToday(sells);

        expect(result).toEqual([{ productId: "p1", name: "Coca-Cola", quantity: 5, amount: 5000 }]);
    });

    it("ordena de mayor a menor monto y respeta el límite", () => {
        const sells = [
            sell([product("p1", "Barato", 100, 1), product("p2", "Caro", 5000, 1)]),
        ];

        const result = aggregateTopProductsToday(sells, 1);

        expect(result).toHaveLength(1);
        expect(result[0].productId).toBe("p2");
    });
});
