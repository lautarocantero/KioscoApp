import { describe, it, expect } from "vitest";
import { SellerStatus } from "@typings/seller/sellerEnums";
import { sortSellersOnlineFirst } from "../../helpers/sortSellersOnlineFirst";

const seller = (id: string, user_status: SellerStatus) => ({ _id: id, user_status });

describe("sortSellersOnlineFirst", () => {
    it("pone a los vendedores online antes que a los offline", () => {
        const sellers = [
            seller("1", SellerStatus.Offline),
            seller("2", SellerStatus.Online),
            seller("3", SellerStatus.Offline),
            seller("4", SellerStatus.Online),
        ];

        const sorted = sortSellersOnlineFirst(sellers);

        expect(sorted.map((s) => s._id)).toEqual(["2", "4", "1", "3"]);
    });

    it("conserva el orden relativo dentro de cada grupo (sort estable)", () => {
        const sellers = [
            seller("a", SellerStatus.Online),
            seller("b", SellerStatus.Online),
            seller("c", SellerStatus.Offline),
            seller("d", SellerStatus.Offline),
        ];

        const sorted = sortSellersOnlineFirst(sellers);

        expect(sorted.map((s) => s._id)).toEqual(["a", "b", "c", "d"]);
    });

    it("no muta el array original", () => {
        const sellers = [seller("1", SellerStatus.Offline), seller("2", SellerStatus.Online)];
        const original = [...sellers];

        sortSellersOnlineFirst(sellers);

        expect(sellers).toEqual(original);
    });

    it("devuelve un array vacío si no recibe vendedores", () => {
        expect(sortSellersOnlineFirst([])).toEqual([]);
    });
});
