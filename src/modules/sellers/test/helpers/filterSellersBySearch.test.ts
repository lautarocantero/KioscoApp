import { describe, expect, it } from "vitest";
import { filterSellersBySearch } from "../../helpers/filterSellersBySearch";
import { SellerStatus } from "@typings/seller/sellerEnums";
import type { Seller } from "@typings/seller/sellerTypes";

const buildSeller = (overrides: Partial<Seller>): Seller => ({
    _id: "1",
    name: "Lucas Pérez",
    profilePhoto: null,
    created_at: new Date().toISOString(),
    user_status: SellerStatus.Online,
    ...overrides,
});

describe("filterSellersBySearch", () => {
    const sellers: Seller[] = [
        buildSeller({ _id: "1", name: "Lucas Pérez" }),
        buildSeller({ _id: "2", name: "Ana Gómez" }),
    ];

    it("devuelve todos los vendedores cuando el término está vacío", () => {
        expect(filterSellersBySearch(sellers, " ")).toHaveLength(2);
    });

    it("filtra por coincidencia parcial y sin distinguir mayúsculas", () => {
        const result = filterSellersBySearch(sellers, "gómez");
        expect(result.map((seller) => seller._id)).toEqual(["2"]);
    });

    it("no devuelve resultados si ningún vendedor coincide", () => {
        expect(filterSellersBySearch(sellers, "inexistente")).toHaveLength(0);
    });
});
