import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import RolesPermissionsDialog from "../components/RolesPermissionsDialog/RolesPermissionsDialog";
import { renderWithTheme } from "./utils/setupTests";

describe("RolesPermissionsDialog", () => {
    it("no renderiza contenido si está cerrado", () => {
        renderWithTheme(<RolesPermissionsDialog open={false} onClose={vi.fn()} />);

        expect(screen.queryByText("Roles y permisos")).not.toBeInTheDocument();
    });

    it("lista todos los dominios de la matriz con el badge correcto", () => {
        renderWithTheme(<RolesPermissionsDialog open={true} onClose={vi.fn()} />);

        expect(screen.getByText("Roles y permisos")).toBeInTheDocument();
        expect(screen.getByText("Productos")).toBeInTheDocument();
        expect(screen.getByText("Ventas / Caja")).toBeInTheDocument();
        expect(screen.getByText("Membresía / Suscripción")).toBeInTheDocument();

        // Acción abierta a ambos roles
        const editProduct = screen.getByText("Editar producto");
        expect(editProduct.closest("div")?.parentElement).toHaveTextContent("Ambos");

        // Acción exclusiva de admin
        const deleteProduct = screen.getByText("Eliminar producto");
        expect(deleteProduct.closest("div")?.parentElement).toHaveTextContent("Admin");
    });

    it("llama a onClose al hacer click en el botón de cerrar", () => {
        const onClose = vi.fn();
        renderWithTheme(<RolesPermissionsDialog open={true} onClose={onClose} />);

        fireEvent.click(screen.getByLabelText("Cerrar"));

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
