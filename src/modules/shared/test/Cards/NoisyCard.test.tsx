import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { NoisyCardProps } from "@typings/ui/noisyCard.types";
import NoisyCard from "../../components/Cards/NoisyCard";

const testTheme = createTheme({
    custom: {
        white: "rgb(255, 255, 255)",
        black: "rgb(0, 0, 0)",
    },
} as any);

const renderWithTheme = (props: Partial<NoisyCardProps> = {}) =>
    render(
        <ThemeProvider theme={testTheme}>
            <NoisyCard {...props}>
                <span>Contenido</span>
            </NoisyCard>
        </ThemeProvider>
    );

describe("NoisyCard", () => {
    it("renderiza sus children", () => {
        const { getByText } = renderWithTheme();

        expect(getByText("Contenido")).toBeInTheDocument();
    });

    it("aplica maxWidth cuando se pasa la prop", () => {
        const { container } = renderWithTheme({ maxWidth: "400px" });

        expect(container.firstChild).toHaveStyle({ maxWidth: "400px" });
    });

    it("aplica el borderRadius por defecto", () => {
        const { container } = renderWithTheme();

        expect(container.firstChild).toHaveStyle({ borderRadius: "16px" });
    });

    it("aplica un borderRadius custom cuando se pasa", () => {
        const { container } = renderWithTheme({ borderRadius: "8px" });

        expect(container.firstChild).toHaveStyle({ borderRadius: "8px" });
    });
});