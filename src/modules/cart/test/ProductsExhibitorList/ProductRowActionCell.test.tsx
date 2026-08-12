import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests"; // 👈 ajustá el path
import { useProductItem } from "@hooks/cart/useProductItem";
import type { Product } from "@typings/product/productTypes";
import ProductRowActionCell from "../../components/ProductsExhibitorList/ProductRowActionCell";

vi.mock("@hooks/sellers/useProductItem");

const mockedHook = vi.mocked(useProductItem);

const buildProduct = (overrides: Partial<Product> = {}): Product =>
    ({
        _id: "1",
        name: "Coca Cola",
        image_url: "/images/coca.png", 
        presentations: [],
        ...overrides,
    } as Product);

describe("ProductRowActionCell", () => {
    const handleSelect = vi.fn();

    beforeEach(() => {
        handleSelect.mockClear();
        mockedHook.mockReturnValue({
            handleSelect,
        } as any);
    });

    it("renderiza el ProductItemButton", () => {
        renderWithTheme(<ProductRowActionCell product={buildProduct()} />);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("llama a handleSelect al hacer click en el botón", async () => {
        renderWithTheme(<ProductRowActionCell product={buildProduct()} />);

        await userEvent.click(screen.getByRole("button"));

        expect(handleSelect).toHaveBeenCalledTimes(1);
    });

    it("invoca a useProductItem con el producto recibido", () => {
        const product = buildProduct({ _id: "42", name: "Sprite" });

        renderWithTheme(<ProductRowActionCell product={product} />);

        expect(mockedHook).toHaveBeenCalledWith(product);
    });
});