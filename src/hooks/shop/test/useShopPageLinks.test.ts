import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useShopPageLinks } from "../useShopPageLinks";
import { useSellsLinkData } from "../../sells/useSellData";
import { useProductsLinkData } from "../../products/useProductData";
import { useProvidersLinkData } from "../../providers/useProvidersLinkData";
import { useSellersLinkData } from "../../sellers/useSellersLinkData";

describe("useShopPageLinks", () => {
    it("excluye el Catálogo y la propia Tienda de las tarjetas de sección", () => {
        const { result } = renderHook(() => useShopPageLinks());

        const descriptions = result.current.map((link) => link.description);

        expect(descriptions).not.toContain("Catalogo");
        expect(descriptions).not.toContain("Tienda");
    });

    it("incluye el resto de secciones existentes", () => {
        const { result } = renderHook(() => useShopPageLinks());

        const descriptions = result.current.map((link) => link.description);

        expect(descriptions).toEqual(
            expect.arrayContaining(["Ventas", "Productos", "Boletas", "Vendedores", "Proveedores"])
        );
    });

    it("asigna el hook de datos reales correspondiente a cada sección con estadísticas", () => {
        const { result } = renderHook(() => useShopPageLinks());

        const byUrl = Object.fromEntries(result.current.map((link) => [link.url, link.useData]));

        expect(byUrl["/sells"]).toBe(useSellsLinkData);
        expect(byUrl["/products"]).toBe(useProductsLinkData);
        expect(byUrl["/providers"]).toBe(useProvidersLinkData);
        expect(byUrl["/sellers"]).toBe(useSellersLinkData);
    });

    it("no inventa datos para secciones sin fuente real (ej. Boletas)", () => {
        const { result } = renderHook(() => useShopPageLinks());

        const receipts = result.current.find((link) => link.url === "/receipts");

        expect(receipts?.useData).toBeUndefined();
    });
});
