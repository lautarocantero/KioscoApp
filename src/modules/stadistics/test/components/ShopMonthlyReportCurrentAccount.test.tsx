import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import ShopMonthlyReportCurrentAccount from "../../components/ShopMonthlyReportCurrentAccount";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const LocationDisplay = (): React.ReactNode => {
    const location = useLocation();
    return <div data-testid="location">{location.pathname + location.search}</div>;
};

describe("ShopMonthlyReportCurrentAccount", () => {
    it("muestra la deuda y las cobranzas del mes", () => {
        renderWithTheme(
            <MemoryRouter>
                <ShopMonthlyReportCurrentAccount
                    currentAccount={{ debtorsCount: 14, totalDebt: 342800, collectedThisMonth: 268500, newDebtThisMonth: 96400, paymentsCount: 23 }}
                    isLoading={false}
                    error={null}
                />
            </MemoryRouter>
        );

        expect(screen.getByText("14")).toBeInTheDocument();
        expect(screen.getByText(/23 pagos registrados este mes/)).toBeInTheDocument();
    });

    it("sin pagos registrados: usa la variante singular/cero de la nota", () => {
        renderWithTheme(
            <MemoryRouter>
                <ShopMonthlyReportCurrentAccount
                    currentAccount={{ debtorsCount: 0, totalDebt: 0, collectedThisMonth: 0, newDebtThisMonth: 0, paymentsCount: 0 }}
                    isLoading={false}
                    error={null}
                />
            </MemoryRouter>
        );

        expect(screen.getByText("Sin pagos registrados este mes.")).toBeInTheDocument();
    });

    it("muestra el mensaje de error si falla", () => {
        renderWithTheme(
            <MemoryRouter>
                <ShopMonthlyReportCurrentAccount currentAccount={null} isLoading={false} error="boom" />
            </MemoryRouter>
        );
        expect(screen.getByRole("alert")).toHaveTextContent("boom");
    });

    it("'Ver morosos' navega a /sells con el filtro de ventas parciales activado", () => {
        renderWithTheme(
            <MemoryRouter initialEntries={["/shop/stadistics"]}>
                <Routes>
                    <Route
                        path="*"
                        element={
                            <>
                                <LocationDisplay />
                                <ShopMonthlyReportCurrentAccount
                                    currentAccount={{ debtorsCount: 14, totalDebt: 342800, collectedThisMonth: 268500, newDebtThisMonth: 96400, paymentsCount: 23 }}
                                    isLoading={false}
                                    error={null}
                                />
                            </>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: /Ver morosos/i }));
        expect(screen.getByTestId("location")).toHaveTextContent("/sells?filter=parcial");
    });
});
