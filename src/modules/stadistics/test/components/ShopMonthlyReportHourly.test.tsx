import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import type { HourlyBucket } from "@typings/stadistics/stadisticsTypes";
import ShopMonthlyReportHourly from "../../components/ShopMonthlyReportHourly";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const bucket = (overrides: Partial<HourlyBucket> = {}): HourlyBucket => ({
    label: "18–20",
    amount: 1199800,
    isPeak: false,
    isLow: false,
    ...overrides,
});

describe("ShopMonthlyReportHourly", () => {
    it("muestra las franjas horarias recibidas", () => {
        renderWithTheme(
            <ShopMonthlyReportHourly
                hourlyBuckets={[bucket(), bucket({ label: "22–24", isLow: true })]}
                hourlySummary={{ peakLabel: "18–20", lowLabel: "22–24" }}
                isLoading={false}
                error={null}
            />
        );

        expect(screen.getByText(/pico 18–20 h/)).toBeInTheDocument();
        expect(screen.getByText(/más floja 22–24 h/)).toBeInTheDocument();
    });

    it("sin franjas con ventas: no muestra chips de pico ni de franja floja", () => {
        renderWithTheme(
            <ShopMonthlyReportHourly hourlyBuckets={[]} hourlySummary={{ peakLabel: null, lowLabel: null }} isLoading={false} error={null} />
        );

        expect(screen.queryByText(/pico/)).not.toBeInTheDocument();
    });

    it("muestra el mensaje de error si falla", () => {
        renderWithTheme(<ShopMonthlyReportHourly hourlyBuckets={[]} hourlySummary={null} isLoading={false} error="boom" />);
        expect(screen.getByRole("alert")).toHaveTextContent("boom");
    });
});
