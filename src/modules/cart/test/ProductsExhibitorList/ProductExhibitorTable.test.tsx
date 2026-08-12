import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import type { GridColDef } from "@mui/x-data-grid";
import { renderWithTheme } from "../../../shared/test/utils/setupTests"; // 👈 ajustá el path
import type { Product } from "@typings/product/productTypes";
import ProductExhibitorTable from "../../components/ProductsExhibitorList/ProductExhibitorTable";

const buildProduct = (overrides: Partial<Product> = {}): Product =>
    ({
        _id: "1",
        name: "Coca Cola",
        image_url: "/images/coca.png",
        presentations: [],
        ...overrides,
    } as Product);

const testColumns: GridColDef<Product>[] = [
    { field: "name", headerName: "Producto", flex: 1 },
];

describe("ProductExhibitorTable", () => {
    it("renderiza las filas de productos", () => {
        const products = [buildProduct({ _id: "1", name: "Coca Cola" }), buildProduct({ _id: "2", name: "Sprite" })];

        renderWithTheme(
            <ProductExhibitorTable products={products} columns={testColumns} />
        );

        expect(screen.getByText("Coca Cola")).toBeInTheDocument();
        expect(screen.getByText("Sprite")).toBeInTheDocument();
    });

    it("muestra el mensaje de vacío cuando no hay productos", () => {
        renderWithTheme(<ProductExhibitorTable products={[]} columns={testColumns} />);

        expect(screen.getByText("No hay productos")).toBeInTheDocument();
    });

    it("pasa isLoading al DataTable", () => {
        renderWithTheme(
            <ProductExhibitorTable products={[]} columns={testColumns} isLoading={true} />
        );

            expect(screen.getByRole("status")).toBeInTheDocument();
            expect(screen.getByLabelText("Cargando registros")).toBeInTheDocument();
    });
});