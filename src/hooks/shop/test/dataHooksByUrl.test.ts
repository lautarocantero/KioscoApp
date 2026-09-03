import { describe, it, expect } from "vitest";
import { dataHooksByUrl } from "../dataHooksByUrl";
import { useSellsLinkData } from "../../sells/useSellData";
import { useProductsLinkData } from "../../products/useProductData";
import { useProvidersLinkData } from "../../providers/useProvidersLinkData";
import { useSellersLinkData } from "../../sellers/useSellersLinkData";

describe("dataHooksByUrl", () => {
    it("mapea cada url al hook de datos reales correspondiente", () => {
        expect(dataHooksByUrl["/sells"]).toBe(useSellsLinkData);
        expect(dataHooksByUrl["/products"]).toBe(useProductsLinkData);
        expect(dataHooksByUrl["/providers"]).toBe(useProvidersLinkData);
        expect(dataHooksByUrl["/sellers"]).toBe(useSellersLinkData);
    });

    it("no mapea urls sin dato real asociado", () => {
        expect(dataHooksByUrl["/shop"]).toBeUndefined();
        expect(dataHooksByUrl["/receipts"]).toBeUndefined();
    });
});
