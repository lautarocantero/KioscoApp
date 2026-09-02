import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import KioscoNoResults from "../../components/KioscoNoResults/KioscoNoResults";

describe("KioscoNoResults", () => {
    it("muestra el mensaje de sin resultados", () => {
        renderWithTheme(<KioscoNoResults />);

        expect(screen.getByText("Ningún kiosco coincide con tu búsqueda.")).toBeInTheDocument();
        expect(screen.getByRole("status")).toBeInTheDocument();
    });
});
