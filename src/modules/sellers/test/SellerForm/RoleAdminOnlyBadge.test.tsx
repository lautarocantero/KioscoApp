import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import RoleAdminOnlyBadge from "../../components/SellerForm/RoleAdminOnlyBadge";

describe("RoleAdminOnlyBadge", () => {
    it("muestra el texto que explica que el rol es exclusivo de admin", () => {
        const { getByText } = renderWithTheme(<RoleAdminOnlyBadge />);

        expect(getByText("Solo administradores pueden editar el rol.")).toBeInTheDocument();
    });
});
