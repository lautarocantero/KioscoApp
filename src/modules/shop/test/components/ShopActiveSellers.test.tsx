import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { SellerStatus } from "@typings/seller/sellerEnums";
import type { ShopActiveSellersProps } from "@typings/shop/shopComponentTypes";
import ShopActiveSellers from "../../components/ShopActiveSellers";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

const buildProps = (overrides: Partial<ShopActiveSellersProps> = {}): ShopActiveSellersProps => ({
    activeSellers: [],
    isLoading: false,
    error: null,
    ...overrides,
});

describe("ShopActiveSellers", () => {
    it("sin vendedores online: muestra el estado vacío", () => {
        renderWithTheme(<ShopActiveSellers {...buildProps()} />);
        expect(screen.getByText(/Nadie está conectado/i)).toBeInTheDocument();
    });

    it("lista al vendedor online con su venta de hoy", () => {
        renderWithTheme(
            <ShopActiveSellers
                {...buildProps({
                    activeSellers: [
                        { sellerId: "s1", sellerName: "Marina Duarte", status: SellerStatus.Online, totalAmount: 71300, ordersCount: 28 },
                    ],
                })}
            />
        );

        expect(screen.getByText("Marina Duarte")).toBeInTheDocument();
        expect(screen.getByText(/71.300|71300/)).toBeInTheDocument();
    });
});
