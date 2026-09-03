import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import type { ShopTopProductsTodayProps } from "@typings/shop/shopComponentTypes";
import ShopTopProductsToday from "../../components/ShopTopProductsToday";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildProps = (overrides: Partial<ShopTopProductsTodayProps> = {}): ShopTopProductsTodayProps => ({
    topProducts: [],
    isLoading: false,
    error: null,
    ...overrides,
});

describe("ShopTopProductsToday", () => {
    it("sin ventas hoy: muestra el estado vacío", () => {
        renderWithTheme(<ShopTopProductsToday {...buildProps()} />);
        expect(screen.getByText(/Todavía no hay ventas hoy/)).toBeInTheDocument();
    });

    it("lista los productos más vendidos con nombre y monto", () => {
        renderWithTheme(
            <ShopTopProductsToday
                {...buildProps({
                    topProducts: [{ productId: "p1", name: "Marlboro Box 20", quantity: 18, amount: 54000 }],
                })}
            />
        );

        expect(screen.getByText("Marlboro Box 20")).toBeInTheDocument();
        expect(screen.getByText(/54.000|54000/)).toBeInTheDocument();
    });

    it("mientras carga no muestra el estado vacío", () => {
        renderWithTheme(<ShopTopProductsToday {...buildProps({ isLoading: true })} />);
        expect(screen.queryByText(/Todavía no hay ventas hoy/)).not.toBeInTheDocument();
    });
});
