import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import type { GridRenderCellParams } from "@mui/x-data-grid";
import type { Provider } from "@typings/provider/providerTypes";
import { buildColumnsForProviders } from "../../pages/ProvidersList/components/providerColumns";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildProvider = (overrides: Partial<Provider> = {}): Provider => ({
    _id: "provider-1",
    name: "Distribuidora QA",
    valoration: 4,
    contact_phone: "+54 11 4444-5555",
    contact_email: "contacto@distribuidoraqa.test",
    ...overrides,
});

const getColumn = (field: string, isAdmin = true) => {
    const onDeleteRequest = vi.fn();
    const navigate = vi.fn();
    const column = buildColumnsForProviders({ onDeleteRequest, navigate, isAdmin }).find((col) => col.field === field);
    if (!column) throw new Error(`Column "${field}" not found`);
    return { column, onDeleteRequest, navigate };
};

const buildCellParams = (provider: Provider): GridRenderCellParams<Provider> =>
    ({ row: provider } as GridRenderCellParams<Provider>);

describe("buildColumnsForProviders", () => {
    it("define las columnas básicas con sus headerName", () => {
        const columns = buildColumnsForProviders({ onDeleteRequest: vi.fn(), navigate: vi.fn(), isAdmin: true });

        expect(columns.map((c) => c.field)).toEqual(["name", "valoration", "contact_phone", "contact_email", "actions"]);
        expect(columns.find((c) => c.field === "name")?.headerName).toBe("Nombre");
        expect(columns.find((c) => c.field === "contact_phone")?.headerName).toBe("Teléfono");
        expect(columns.find((c) => c.field === "contact_email")?.headerName).toBe("Email");
    });

    describe("columna valoration", () => {
        it("renderiza un Rating de solo lectura con el valor del proveedor", () => {
            const { column } = getColumn("valoration");
            const provider = buildProvider({ valoration: 3 });

            renderWithTheme(column.renderCell!(buildCellParams(provider)));

            expect(screen.getByLabelText("Valoración: 3 de 5")).toBeInTheDocument();
        });
    });

    describe("columna actions", () => {
        it("llama a navigate hacia el detalle al presionar Ver detalle", () => {
            const { column, navigate } = getColumn("actions");
            const provider = buildProvider();

            renderWithTheme(column.renderCell!(buildCellParams(provider)));
            fireEvent.click(screen.getByLabelText("Ver detalle"));

            expect(navigate).toHaveBeenCalledWith("/provider/provider-1");
        });

        it("llama a navigate hacia la edición al presionar Editar", () => {
            const { column, navigate } = getColumn("actions");
            const provider = buildProvider();

            renderWithTheme(column.renderCell!(buildCellParams(provider)));
            fireEvent.click(screen.getByLabelText("Editar"));

            expect(navigate).toHaveBeenCalledWith("/provider/provider-1/provider-edit");
        });

        it("admin: llama a onDeleteRequest con id y nombre al presionar Eliminar", () => {
            const { column, onDeleteRequest } = getColumn("actions", true);
            const provider = buildProvider();

            renderWithTheme(column.renderCell!(buildCellParams(provider)));
            const deleteButton = screen.getByRole("button", { name: "Eliminar" });

            expect(deleteButton).not.toBeDisabled();
            fireEvent.click(deleteButton);

            expect(onDeleteRequest).toHaveBeenCalledWith("provider-1", "Distribuidora QA");
        });

        it("seller (no admin): el botón Eliminar aparece disabled con tooltip", async () => {
            const { column, onDeleteRequest } = getColumn("actions", false);
            const provider = buildProvider();

            renderWithTheme(column.renderCell!(buildCellParams(provider)));
            const deleteButton = screen.getByRole("button", { name: "Eliminar" });

            expect(deleteButton).toBeDisabled();
            fireEvent.click(deleteButton);
            expect(onDeleteRequest).not.toHaveBeenCalled();

            fireEvent.mouseOver(deleteButton);
            expect(await screen.findByText("Solo disponible para el administrador")).toBeInTheDocument();
        });
    });
});
