import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useShopStatLinks } from "../useShopStatLinks";
import { useSellsLinkData } from "../../sells/useSellData";
import { useProductsLinkData } from "../../products/useProductData";
import { useProvidersLinkData } from "../../providers/useProvidersLinkData";
import { useSellersLinkData } from "../../sellers/useSellersLinkData";

describe("useShopStatLinks", () => {
    it("solo incluye las 4 tarjetas de stats: Ventas, Productos, Vendedores, Proveedores", () => {
        const { result } = renderHook(() => useShopStatLinks());

        const descriptions = result.current.map((link) => link.description);

        expect(descriptions).toEqual(
            expect.arrayContaining(["Ventas", "Productos", "Vendedores", "Proveedores"])
        );
        expect(descriptions).not.toContain("Catalogo");
        expect(descriptions).not.toContain("Tienda");
        expect(descriptions).not.toContain("Boletas");
        expect(descriptions).toHaveLength(4);
    });

    it("asigna el hook de datos reales correspondiente a cada tarjeta", () => {
        const { result } = renderHook(() => useShopStatLinks());

        const byUrl = Object.fromEntries(result.current.map((link) => [link.url, link.useData]));

        expect(byUrl["/sells"]).toBe(useSellsLinkData);
        expect(byUrl["/products"]).toBe(useProductsLinkData);
        expect(byUrl["/providers"]).toBe(useProvidersLinkData);
        expect(byUrl["/sellers"]).toBe(useSellersLinkData);
    });
});
