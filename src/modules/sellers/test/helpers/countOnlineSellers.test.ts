import { describe, it, expect } from "vitest";
import { SellerStatus } from "@typings/seller/sellerEnums";
import { countOnlineSellers } from "../../helpers/countOnlineSellers";

const seller = (id: string, user_status: SellerStatus) => ({ _id: id, user_status });

describe("countOnlineSellers", () => {
    it("cuenta solo los vendedores con user_status online", () => {
        const sellers = [
            seller("1", SellerStatus.Online),
            seller("2", SellerStatus.Offline),
            seller("3", SellerStatus.Online),
        ];

        expect(countOnlineSellers(sellers)).toBe(2);
    });

    it("devuelve 0 si no hay vendedores online", () => {
        const sellers = [seller("1", SellerStatus.Offline), seller("2", SellerStatus.Offline)];

        expect(countOnlineSellers(sellers)).toBe(0);
    });

    it("devuelve 0 con un array vacío", () => {
        expect(countOnlineSellers([])).toBe(0);
    });
});
