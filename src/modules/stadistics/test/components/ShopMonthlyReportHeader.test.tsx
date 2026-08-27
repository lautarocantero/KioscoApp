import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import type { ShopMonthlyReportHeaderProps } from "@typings/stadistics/stadisticsComponentTypes";
import { ReportCompareWith } from "@typings/stadistics/stadisticsEnums";
import ShopMonthlyReportHeader from "../../components/ShopMonthlyReportHeader";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildProps = (overrides: Partial<ShopMonthlyReportHeaderProps> = {}): ShopMonthlyReportHeaderProps => ({
    kioscoName: "Kiosco Calle Fleming",
    monthLabel: "agosto de 2026",
    comparisonLabel: "julio de 2026",
    daysInMonth: 31,
    monthOptions: [{ value: "2026-08", label: "agosto de 2026" }],
    selectedMonth: "2026-08",
    onMonthChange: vi.fn(),
    canChangeMonth: true,
    compareWith: ReportCompareWith.PreviousMonth,
    onCompareChange: vi.fn(),
    canCompare: true,
    compareDisabledReason: null,
    onDownloadPdf: vi.fn(),
    isDownloadDisabled: false,
    isLoading: false,
    ...overrides,
});

describe("ShopMonthlyReportHeader", () => {
    it("muestra el título con el mes seleccionado y el kiosco activo", () => {
        renderWithTheme(<ShopMonthlyReportHeader {...buildProps()} />);

        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("agosto de 2026");
        expect(screen.getByText(/Kiosco Calle Fleming/)).toBeInTheDocument();
    });

    it("plan Standard (canChangeMonth=false): el selector de mes aparece disabled con el motivo de plan, nunca de admin", async () => {
        renderWithTheme(<ShopMonthlyReportHeader {...buildProps({ canChangeMonth: false })} />);

        const [monthSelect] = screen.getAllByRole("combobox");
        expect(monthSelect).toHaveAttribute("aria-disabled", "true");

        fireEvent.mouseOver(monthSelect);
        expect(await screen.findByText("Disponible en el plan Deluxe del dueño del kiosco")).toBeInTheDocument();
        expect(screen.queryByText("Solo disponible para el administrador")).not.toBeInTheDocument();
    });

    it("comparación bloqueada por el plan (aunque el usuario sea admin): el tooltip no culpa al rol", async () => {
        renderWithTheme(<ShopMonthlyReportHeader {...buildProps({ canCompare: false, compareDisabledReason: "plan" })} />);

        const [, compareSelect] = screen.getAllByRole("combobox");
        expect(compareSelect).toHaveAttribute("aria-disabled", "true");

        fireEvent.mouseOver(compareSelect);
        expect(await screen.findByText("Disponible en el plan Deluxe del dueño del kiosco")).toBeInTheDocument();
    });

    it("comparación bloqueada por el rol (seller en plan Deluxe): el tooltip menciona al administrador", async () => {
        renderWithTheme(<ShopMonthlyReportHeader {...buildProps({ canCompare: false, compareDisabledReason: "admin" })} />);

        const [, compareSelect] = screen.getAllByRole("combobox");
        fireEvent.mouseOver(compareSelect);
        expect(await screen.findByText("Solo disponible para el administrador")).toBeInTheDocument();
    });

    it("dispara onDownloadPdf al hacer click en Descargar PDF", () => {
        const onDownloadPdf = vi.fn();
        renderWithTheme(<ShopMonthlyReportHeader {...buildProps({ onDownloadPdf })} />);

        fireEvent.click(screen.getByRole("button", { name: /Descargar PDF/i }));
        expect(onDownloadPdf).toHaveBeenCalledTimes(1);
    });

    it("deshabilita el botón de descarga mientras carga", () => {
        renderWithTheme(<ShopMonthlyReportHeader {...buildProps({ isLoading: true })} />);
        expect(screen.getByRole("button", { name: /Descargar PDF/i })).toBeDisabled();
    });
});
