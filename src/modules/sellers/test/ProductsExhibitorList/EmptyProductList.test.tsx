import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EmptyProductsList from "../../components/ProductsExhibitorList/EmptyProductsList";

const testTheme = createTheme({
    custom: {
        white: "rgb(255, 255, 255)",
        black: "rgb(0, 0, 0)",
    },
} as any);


const renderWithTheme = (isEmpty: boolean) =>
    render(
        <ThemeProvider theme={testTheme}>
            <EmptyProductsList isEmpty={isEmpty} />
        </ThemeProvider>
    );

describe("EmptyProductsList", () => {
    it("no renderiza nada cuando isEmpty es false", () => {
        const { container } = renderWithTheme(false);

        expect(container).toBeEmptyDOMElement();
    });

    it("renderiza el EmptyStateCard cuando isEmpty es true", () => {
        renderWithTheme(true);

        expect(screen.getByText("No hay productos disponibles")).toBeInTheDocument();
        expect(screen.getByText("No se han encontrado productos")).toBeInTheDocument();
        expect(screen.getByAltText("Vista previa de la imagen")).toBeInTheDocument();
    });

    it("renderiza la imagen con el src correcto", () => {
        renderWithTheme(true);

        const image = screen.getByAltText("Vista previa de la imagen") as HTMLImageElement;
        expect(image.src).toContain("/images/stocko_images/empty_product_list.png");
    });
});