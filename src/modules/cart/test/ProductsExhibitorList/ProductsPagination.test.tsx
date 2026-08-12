import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import ProductsPagination from "../../components/ProductsExhibitorList/ProductsPagination";

describe("ProductsPagination", () => {
    it("no renderiza nada cuando count es 1", () => {
        const { container } = renderWithTheme(
            <ProductsPagination page={1} count={1} onChange={vi.fn()} />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it("no renderiza nada cuando count es 0", () => {
        const { container } = renderWithTheme(
            <ProductsPagination page={1} count={0} onChange={vi.fn()} />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it("renderiza la paginación cuando count es mayor a 1", () => {
        renderWithTheme(<ProductsPagination page={1} count={5} onChange={vi.fn()} />);

        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    it("marca la página actual como seleccionada", () => {
        renderWithTheme(<ProductsPagination page={3} count={5} onChange={vi.fn()} />);

        expect(screen.getByRole("button", { name: /page 3/i })).toHaveAttribute("aria-current", "page");
    });

    it("llama a onChange con el número de página al hacer click", async () => {
        const onChange = vi.fn();

        renderWithTheme(<ProductsPagination page={1} count={5} onChange={onChange} />);

        await userEvent.click(screen.getByRole("button", { name: /page 3/i }));

        expect(onChange).toHaveBeenCalledWith(3);
    });

    it("llama a onChange incluso al hacer click en la página ya seleccionada", async () => {
        const onChange = vi.fn();

        renderWithTheme(<ProductsPagination page={1} count={5} onChange={onChange} />);

        await userEvent.click(screen.getByRole("button", { name: /page 1/i }));

        expect(onChange).toHaveBeenCalledWith(1);
    });
});