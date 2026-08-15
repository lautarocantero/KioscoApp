import { describe, it, expect } from "vitest";
import { SellerStatus } from "@typings/seller/sellerEnums";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import SellerStatusIndicator from "../../components/SellersList/SellerStatusIndicator";

describe("SellerStatusIndicator", () => {
    it("muestra 'En línea' cuando el estado es online", () => {
        const { getByText } = renderWithTheme(<SellerStatusIndicator status={SellerStatus.Online} />);

        expect(getByText("En línea")).toBeInTheDocument();
    });

    it("muestra 'Desconectado' cuando el estado es offline", () => {
        const { getByText } = renderWithTheme(<SellerStatusIndicator status={SellerStatus.Offline} />);

        expect(getByText("Desconectado")).toBeInTheDocument();
    });
});
