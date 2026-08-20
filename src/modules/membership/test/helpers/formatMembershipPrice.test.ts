import { describe, it, expect, vi } from "vitest";
import { formatCurrency } from "../../../cart/helpers/formatCurrency";
import { formatMembershipPrice } from "../../helpers/formatMembershipPrice";

vi.mock("../../../cart/helpers/formatCurrency", () => ({
    formatCurrency: vi.fn(() => "$9.999"),
}));

const mockedFormatCurrency = vi.mocked(formatCurrency);

describe("formatMembershipPrice", () => {
    it("delega en formatCurrency con la moneda en minúscula (currency_id del back viene en mayúscula)", () => {
        formatMembershipPrice(9999, "ARS");

        expect(mockedFormatCurrency).toHaveBeenCalledWith(9999, "ars");
    });

    it("devuelve el resultado formateado tal cual", () => {
        expect(formatMembershipPrice(9999, "ARS")).toBe("$9.999");
    });
});
