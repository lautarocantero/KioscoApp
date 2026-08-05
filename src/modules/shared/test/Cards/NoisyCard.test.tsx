import { describe, it, expect } from "vitest";
import { alpha } from "@mui/material/styles";
import { testTheme, renderWithTheme } from "../utils/setupTests"; // 👈 ajustá el path
import NoisyCard from "../../components/Cards/NoisyCard";

describe("NoisyCard", () => {
    it("renderiza sus children", () => {
        const { getByText } = renderWithTheme(
            <NoisyCard>
                <span>Contenido</span>
            </NoisyCard>
        );

        expect(getByText("Contenido")).toBeInTheDocument();
    });

    it("aplica maxWidth cuando se pasa la prop", () => {
        const { container } = renderWithTheme(
            <NoisyCard maxWidth="400px">
                <span>Contenido</span>
            </NoisyCard>
        );

        expect(container.firstChild).toHaveStyle({ maxWidth: "400px" });
    });

    it("aplica el borderRadius por defecto", () => {
        const { container } = renderWithTheme(
            <NoisyCard>
                <span>Contenido</span>
            </NoisyCard>
        );

        expect(container.firstChild).toHaveStyle({ borderRadius: "16px" });
    });

    it("aplica un borderRadius custom cuando se pasa", () => {
        const { container } = renderWithTheme(
            <NoisyCard borderRadius="8px">
                <span>Contenido</span>
            </NoisyCard>
        );

        expect(container.firstChild).toHaveStyle({ borderRadius: "8px" });
    });

    it("aplica el borderColor usando theme.custom.white con alpha 0.08", () => {
        const { container } = renderWithTheme(
            <NoisyCard>
                <span>Contenido</span>
            </NoisyCard>
        );

        expect(container.firstChild).toHaveStyle({
            borderColor: alpha(testTheme.custom.white, 0.08),
        });
    });
});