import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSidebarNavLinks } from "../useSidebarNavLinks";
import { SidebarNavLinks } from "../../../../../../../config/Links";
import { useSellsLinkData } from "../../../../../../../hooks/sells/useSellData";
import { useProductsLinkData } from "../../../../../../../hooks/products/useProductData";
import { useProvidersLinkData } from "../../../../../../../hooks/providers/useProvidersLinkData";
import { useSellersLinkData } from "../../../../../../../hooks/sellers/useSellersLinkData";

describe("useSidebarNavLinks", () => {
    it("devuelve los links del riel en el mismo orden que Links.tsx", () => {
        const { result } = renderHook(() => useSidebarNavLinks());

        expect(result.current.map((link) => link.url)).toEqual(SidebarNavLinks.map((link) => link.url));
    });

    it("asigna el hook de datos reales a Ventas, Productos, Proveedores y Vendedores", () => {
        const { result } = renderHook(() => useSidebarNavLinks());

        const byUrl = Object.fromEntries(result.current.map((link) => [link.url, link.useData]));

        expect(byUrl["/sells"]).toBe(useSellsLinkData);
        expect(byUrl["/products"]).toBe(useProductsLinkData);
        expect(byUrl["/providers"]).toBe(useProvidersLinkData);
        expect(byUrl["/sellers"]).toBe(useSellersLinkData);
    });

    it("deja useData sin definir para secciones sin hook de datos reales (Tienda, Boletas)", () => {
        const { result } = renderHook(() => useSidebarNavLinks());

        const byUrl = Object.fromEntries(result.current.map((link) => [link.url, link.useData]));

        expect(byUrl["/shop"]).toBeUndefined();
        expect(byUrl["/receipts"]).toBeUndefined();
    });
});
