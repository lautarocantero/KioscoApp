import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import type { ShopDailyHeroCardProps } from "@typings/shop/shopComponentTypes";
import ShopDailyHeroCard from "../../components/ShopDailyHeroCard";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildProps = (overrides: Partial<ShopDailyHeroCardProps> = {}): ShopDailyHeroCardProps => ({
    kpis: {
        sales: { value: 184500, previousValue: 164800, variationPct: 12, trend: "up" },
        ticketsCount: { value: 63, previousValue: 56, variationPct: 12.5, trend: "up" },
        averageTicket: { value: 2929, previousValue: 2942, variationPct: -0.4, trend: "down" },
        ticketsPerDay: 63,
        productsPerTicket: 1.8,
    },
    partialsAlert: { count: 3, totalAmount: 7900, oldestDebtDays: 2 },
    hourly: [{ hour: 10, label: "10", total: 5000 }],
    peakHour: { startHour: 12, endHour: 14, ticketSharePct: 25 },
    hasSellsToday: true,
    isLoading: false,
    error: null,
    ...overrides,
});

describe("ShopDailyHeroCard", () => {
    it("muestra el total de ventas de hoy", () => {
        renderWithTheme(<ShopDailyHeroCard {...buildProps()} />);
        expect(screen.getByText(/184.500|184500/)).toBeInTheDocument();
    });

    it("sin ventas hoy: muestra el estado vacío en vez de un total inventado", () => {
        renderWithTheme(
            <ShopDailyHeroCard
                {...buildProps({
                    hasSellsToday: false,
                    kpis: {
                        sales: { value: 0, previousValue: 0, variationPct: 0, trend: "flat" },
                        ticketsCount: { value: 0, previousValue: 0, variationPct: 0, trend: "flat" },
                        averageTicket: { value: 0, previousValue: 0, variationPct: 0, trend: "flat" },
                        ticketsPerDay: 0,
                        productsPerTicket: 0,
                    },
                })}
            />
        );
        expect(screen.getAllByText("—").length).toBeGreaterThan(0);
    });

    it("mientras carga muestra skeletons, no datos parciales", () => {
        renderWithTheme(<ShopDailyHeroCard {...buildProps({ isLoading: true })} />);
        expect(screen.queryByText(/184.500|184500/)).not.toBeInTheDocument();
    });

    it("si hay error, lo muestra con role alert", () => {
        renderWithTheme(<ShopDailyHeroCard {...buildProps({ error: "No se pudo cargar" })} />);
        expect(screen.getByRole("alert")).toHaveTextContent("No se pudo cargar");
    });
});
