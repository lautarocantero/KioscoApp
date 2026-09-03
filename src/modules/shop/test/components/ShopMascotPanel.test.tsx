import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import type { ShopMascotPanelProps } from "@typings/shop/shopComponentTypes";
import ShopMascotPanel from "../../components/ShopMascotPanel";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildProps = (overrides: Partial<ShopMascotPanelProps> = {}): ShopMascotPanelProps => ({
    kioscoName: "Kiosco Belgrano",
    isAdmin: true,
    kpis: {
        sales: { value: 184500, previousValue: 164800, variationPct: 12, trend: "up" },
        ticketsCount: { value: 63, previousValue: 56, variationPct: 12.5, trend: "up" },
        averageTicket: { value: 2929, previousValue: 2942, variationPct: -0.4, trend: "down" },
        ticketsPerDay: 63,
        productsPerTicket: 1.8,
    },
    hasSellsToday: true,
    criticalStockCount: 0,
    partialsAlert: { count: 0, totalAmount: 0, oldestDebtDays: null },
    onNewSale: vi.fn(),
    onEnterStock: vi.fn(),
    onViewStatistics: vi.fn(),
    ...overrides,
});

describe("ShopMascotPanel", () => {
    it("dispara onNewSale al hacer click en 'Nueva venta'", () => {
        const onNewSale = vi.fn();
        renderWithTheme(<ShopMascotPanel {...buildProps({ onNewSale })} />);

        fireEvent.click(screen.getByText(/Nueva venta/i));
        expect(onNewSale).toHaveBeenCalled();
    });

    it("admin: muestra el botón de estadísticas", () => {
        renderWithTheme(<ShopMascotPanel {...buildProps({ isAdmin: true })} />);
        expect(screen.getByText(/Ver estadísticas/i)).toBeInTheDocument();
    });

    it("vendedor: no muestra el botón de estadísticas", () => {
        renderWithTheme(<ShopMascotPanel {...buildProps({ isAdmin: false })} />);
        expect(screen.queryByText(/Ver estadísticas/i)).not.toBeInTheDocument();
    });

    it("con stock crítico o fiados pendientes, la bajada menciona la atención pendiente", () => {
        renderWithTheme(
            <ShopMascotPanel
                {...buildProps({
                    criticalStockCount: 4,
                    partialsAlert: { count: 3, totalAmount: 7900, oldestDebtDays: 2 },
                })}
            />
        );
        expect(screen.getByText(/Quedan 4 productos con stock crítico/)).toBeInTheDocument();
    });

    it("sin ventas hoy: el headline es el texto fijo, sin saludo con nombre", () => {
        renderWithTheme(<ShopMascotPanel {...buildProps({ hasSellsToday: false })} />);
        expect(screen.getByText("Todavía no hay ventas hoy.")).toBeInTheDocument();
    });

    it("con ventas hoy: usa la imagen de Stocko contento", () => {
        renderWithTheme(<ShopMascotPanel {...buildProps({ hasSellsToday: true })} />);
        expect(screen.getByRole("img").getAttribute("src")).toContain("Stocko-mascotCircle-happy");
    });

    it("sin ventas hoy: usa la imagen de Stocko triste", () => {
        renderWithTheme(<ShopMascotPanel {...buildProps({ hasSellsToday: false })} />);
        expect(screen.getByRole("img").getAttribute("src")).toContain("Stocko-mascotCircle-sad");
    });
});
