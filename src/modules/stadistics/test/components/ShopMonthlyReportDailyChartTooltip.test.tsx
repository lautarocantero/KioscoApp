import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import type { TooltipContentProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import ShopMonthlyReportDailyChartTooltip from "../../components/ShopMonthlyReportDailyChartTooltip";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildProps = (overrides: Partial<TooltipContentProps<ValueType, NameType>> = {}): TooltipContentProps<ValueType, NameType> =>
    ({
        active: true,
        payload: [{ payload: { isoDate: "2026-08-21", label: "21", amount: 238000, isBest: true } }],
        ...overrides,
    }) as unknown as TooltipContentProps<ValueType, NameType>;

describe("ShopMonthlyReportDailyChartTooltip", () => {
    it("muestra la fecha completa, no solo el número de día", () => {
        renderWithTheme(<ShopMonthlyReportDailyChartTooltip {...buildProps()} />);
        expect(screen.getByText("Viernes, 21 de agosto de 2026")).toBeInTheDocument();
    });

    it("muestra el monto del día", () => {
        renderWithTheme(<ShopMonthlyReportDailyChartTooltip {...buildProps()} />);
        expect(screen.getByText(/238/)).toBeInTheDocument();
    });

    it("no renderiza nada si el tooltip no está activo", () => {
        const { container } = renderWithTheme(<ShopMonthlyReportDailyChartTooltip {...buildProps({ active: false })} />);
        expect(container).toBeEmptyDOMElement();
    });
});
