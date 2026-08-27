import { describe, it, expect } from "vitest";
import type { DotItemDotProps } from "recharts";
import ShopMonthlyReportHourlyDot from "../../components/ShopMonthlyReportHourlyDot";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildProps = (isPeak: boolean, isLow: boolean): DotItemDotProps =>
    ({ cx: 10, cy: 20, payload: { label: "18–20", amount: 100, isPeak, isLow } }) as unknown as DotItemDotProps;

describe("ShopMonthlyReportHourlyDot", () => {
    it("dibuja un punto grande en la franja pico", () => {
        const { container } = renderWithTheme(<svg><ShopMonthlyReportHourlyDot {...buildProps(true, false)} /></svg>);
        expect(container.querySelector("circle")).toHaveAttribute("r", "4.5");
    });

    it("dibuja un punto grande en la franja más floja", () => {
        const { container } = renderWithTheme(<svg><ShopMonthlyReportHourlyDot {...buildProps(false, true)} /></svg>);
        expect(container.querySelector("circle")).toHaveAttribute("r", "4.5");
    });

    it("dibuja un punto chico en una franja regular", () => {
        const { container } = renderWithTheme(<svg><ShopMonthlyReportHourlyDot {...buildProps(false, false)} /></svg>);
        expect(container.querySelector("circle")).toHaveAttribute("r", "2.5");
    });
});
