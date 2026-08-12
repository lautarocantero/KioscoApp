import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import EmptyProductsList from "../../components/ProductsExhibitorList/EmptyProductsList";

describe("EmptyProductsList", () => {
    it("no renderiza nada cuando isEmpty es false", () => {
        const { container } = renderWithTheme(<EmptyProductsList isEmpty={false} />);

        expect(container).toBeEmptyDOMElement();
    });

    it("renderiza el EmptyStateCard cuando isEmpty es true", () => {
        renderWithTheme(<EmptyProductsList isEmpty={true} />);

        expect(screen.getByText("No hay productos disponibles")).toBeInTheDocument();
        expect(screen.getByText("No se han encontrado productos")).toBeInTheDocument();
        expect(screen.getByAltText("Vista previa de la imagen")).toBeInTheDocument();
    });

    it("renderiza la imagen con el src correcto", () => {
        renderWithTheme(<EmptyProductsList isEmpty={true} />);

        const image = screen.getByAltText("Vista previa de la imagen") as HTMLImageElement;
        expect(image.src).toContain("/images/stocko_images/empty_product_list.png");
    });
});