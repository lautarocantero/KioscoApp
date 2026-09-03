import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../utils/setupTests";
import DataTableToolbar from "../../components/DataTable/DataTableToolbar";

describe("DataTableToolbar", () => {
    it("no renderiza nada si no hay search, filters, newItem ni extraActions", () => {
        const { container } = renderWithTheme(<DataTableToolbar />);

        expect(container).toBeEmptyDOMElement();
    });

    it("agrega data-tutorial-target al botón de newItem cuando se pasa targetId", () => {
        renderWithTheme(
            <DataTableToolbar newItem={{ label: "Nuevo proveedor", href: "/provider-create", targetId: "providers-create" }} />
        );

        const button = screen.getByText("Nuevo proveedor").closest("a");
        expect(button).toHaveAttribute("data-tutorial-target", "providers-create");
    });

    it("no agrega data-tutorial-target si no se pasa targetId", () => {
        renderWithTheme(<DataTableToolbar newItem={{ label: "Nuevo proveedor", href: "/provider-create" }} />);

        const button = screen.getByText("Nuevo proveedor").closest("a");
        expect(button).not.toHaveAttribute("data-tutorial-target");
    });
});
