import { describe, expect, it } from "vitest";
import { getSellerStatusLabel } from "../../helpers/getSellerStatusLabel";
import { SellerStatus } from "@typings/seller/sellerEnums";

describe("getSellerStatusLabel", () => {
    it("devuelve 'En línea' para vendedores online", () => {
        expect(getSellerStatusLabel(SellerStatus.Online)).toBe("En línea");
    });

    it("devuelve 'Desconectado' para vendedores offline", () => {
        expect(getSellerStatusLabel(SellerStatus.Offline)).toBe("Desconectado");
    });
});
