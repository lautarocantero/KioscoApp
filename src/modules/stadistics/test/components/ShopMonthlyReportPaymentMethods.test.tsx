import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import ShopMonthlyReportPaymentMethods from "../../components/ShopMonthlyReportPaymentMethods";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

describe("ShopMonthlyReportPaymentMethods", () => {
    it("traduce el medio de pago y muestra su porcentaje", () => {
        renderWithTheme(
            <ShopMonthlyReportPaymentMethods
                paymentMethods={[{ method: "cash", amount: 2512640, percentage: 52 }]}
                isLoading={false}
                error={null}
            />
        );

        expect(screen.getByText("Efectivo")).toBeInTheDocument();
        expect(screen.getByText("52%")).toBeInTheDocument();
    });

    it("muestra un método desconocido tal cual, sin romper", () => {
        renderWithTheme(
            <ShopMonthlyReportPaymentMethods
                paymentMethods={[{ method: "crypto", amount: 100, percentage: 1 }]}
                isLoading={false}
                error={null}
            />
        );

        expect(screen.getByText("crypto")).toBeInTheDocument();
    });

    it("sin ventas: muestra el mensaje vacío", () => {
        renderWithTheme(<ShopMonthlyReportPaymentMethods paymentMethods={[]} isLoading={false} error={null} />);
        expect(screen.getByText("Todavía no hay ventas registradas este mes.")).toBeInTheDocument();
    });

    it("muestra el mensaje de error si falla", () => {
        renderWithTheme(<ShopMonthlyReportPaymentMethods paymentMethods={[]} isLoading={false} error="boom" />);
        expect(screen.getByRole("alert")).toHaveTextContent("boom");
    });
});
