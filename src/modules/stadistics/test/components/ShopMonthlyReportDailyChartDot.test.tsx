import { describe, it, expect } from "vitest";
import type { DotItemDotProps } from "recharts";
import ShopMonthlyReportDailyChartDot from "../../components/ShopMonthlyReportDailyChartDot";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildProps = (isBest: boolean): DotItemDotProps =>
    ({ cx: 10, cy: 20, payload: { isoDate: "2026-08-21", label: "21", amount: 100, isBest } }) as unknown as DotItemDotProps;

const buildPropsWithoutCoordinates = (): DotItemDotProps =>
    ({ payload: { isoDate: "2026-08-21", label: "21", amount: 100, isBest: false } }) as unknown as DotItemDotProps;

describe("ShopMonthlyReportDailyChartDot", () => {
    it("dibuja un punto más grande en el mejor día", () => {
        const { container } = renderWithTheme(<svg><ShopMonthlyReportDailyChartDot {...buildProps(true)} /></svg>);
        expect(container.querySelector("circle")).toHaveAttribute("r", "4.5");
    });

    it("dibuja un punto chico en un día regular", () => {
        const { container } = renderWithTheme(<svg><ShopMonthlyReportDailyChartDot {...buildProps(false)} /></svg>);
        expect(container.querySelector("circle")).toHaveAttribute("r", "2.5");
    });

    it("no renderiza nada si faltan coordenadas", () => {
        const { container } = renderWithTheme(<svg><ShopMonthlyReportDailyChartDot {...buildPropsWithoutCoordinates()} /></svg>);
        expect(container.querySelector("circle")).not.toBeInTheDocument();
    });
});
