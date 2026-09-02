import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import AddKioscoCard from "../../components/AddKioscoCard/AddKioscoCard";

describe("AddKioscoCard", () => {
    it("muestra el título de la tarjeta y las dos filas de acción", () => {
        renderWithTheme(<AddKioscoCard onCreate={vi.fn()} onJoin={vi.fn()} />);

        expect(screen.getByText("Sumar un kiosco")).toBeInTheDocument();
        expect(screen.getByText("Crear un nuevo kiosco")).toBeInTheDocument();
        expect(screen.getByText("Unirme a un kiosco existente")).toBeInTheDocument();
    });

    it("llama a onCreate al hacer click en la fila de crear", () => {
        const onCreate = vi.fn();
        renderWithTheme(<AddKioscoCard onCreate={onCreate} onJoin={vi.fn()} />);

        fireEvent.click(screen.getByText("Crear un nuevo kiosco"));

        expect(onCreate).toHaveBeenCalledTimes(1);
    });

    it("llama a onJoin al hacer click en la fila de unirse", () => {
        const onJoin = vi.fn();
        renderWithTheme(<AddKioscoCard onCreate={vi.fn()} onJoin={onJoin} />);

        fireEvent.click(screen.getByText("Unirme a un kiosco existente"));

        expect(onJoin).toHaveBeenCalledTimes(1);
    });
});
