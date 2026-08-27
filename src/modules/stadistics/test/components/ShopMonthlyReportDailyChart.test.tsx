import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import ShopMonthlyReportDailyChart from "../../components/ShopMonthlyReportDailyChart";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

describe("ShopMonthlyReportDailyChart", () => {
    it("muestra el mejor día, el día más flojo y la mejor semana", () => {
        renderWithTheme(
            <ShopMonthlyReportDailyChart
                dailySales={[{ isoDate: "2026-08-28", label: "28", amount: 238000, isBest: true }]}
                dailySalesSummary={{
                    avgPerDay: 155871,
                    closedDays: 0,
                    bestDay: { isoDate: "2026-08-28", label: "28", amount: 238000, isBest: true },
                    worstDay: { isoDate: "2026-08-10", label: "10", amount: 104000, isBest: false },
                    bestWeek: { label: "22–28", amount: 1239000 },
                }}
                isLoading={false}
                error={null}
            />
        );

        expect(screen.getByText("Mejor día")).toBeInTheDocument();
        expect(screen.getByText("Día más flojo")).toBeInTheDocument();
        expect(screen.getByText("Mejor semana")).toBeInTheDocument();
        expect(screen.getByText(/sin días cerrados/)).toBeInTheDocument();
    });

    it("muestra la cantidad de días cerrados cuando hay alguno", () => {
        renderWithTheme(
            <ShopMonthlyReportDailyChart
                dailySales={[]}
                dailySalesSummary={{ avgPerDay: 0, closedDays: 2, bestDay: null, worstDay: null, bestWeek: null }}
                isLoading={false}
                error={null}
            />
        );

        expect(screen.getByText(/2 días cerrados/)).toBeInTheDocument();
    });

    it("muestra el mensaje de error si falla", () => {
        renderWithTheme(<ShopMonthlyReportDailyChart dailySales={[]} dailySalesSummary={null} isLoading={false} error="boom" />);
        expect(screen.getByRole("alert")).toHaveTextContent("boom");
    });
});
