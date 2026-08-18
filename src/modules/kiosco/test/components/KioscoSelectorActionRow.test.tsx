import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import AddIcon from "@mui/icons-material/Add";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import KioscoSelectorActionRow from "../../components/KioscoSelectorActionRow/KioscoSelectorActionRow";

describe("KioscoSelectorActionRow", () => {
    it("muestra el título y subtítulo recibidos", () => {
        renderWithTheme(
            <KioscoSelectorActionRow
                icon={<AddIcon />}
                endIcon={<ArrowForwardIcon />}
                title="Crear un nuevo kiosco"
                subtitle="Empezá de cero con tu propia tienda"
                accent="lightMain"
                onClick={vi.fn()}
            />
        );

        expect(screen.getByText("Crear un nuevo kiosco")).toBeInTheDocument();
        expect(screen.getByText("Empezá de cero con tu propia tienda")).toBeInTheDocument();
    });

    it("llama a onClick al hacer click en la fila", () => {
        const onClick = vi.fn();
        renderWithTheme(
            <KioscoSelectorActionRow
                icon={<AddIcon />}
                endIcon={<ArrowForwardIcon />}
                title="Crear un nuevo kiosco"
                subtitle="Empezá de cero con tu propia tienda"
                accent="lightMain"
                onClick={onClick}
            />
        );

        fireEvent.click(screen.getByRole("button"));

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
