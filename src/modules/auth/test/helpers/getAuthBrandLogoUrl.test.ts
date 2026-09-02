import { describe, expect, it } from "vitest";
import { getAuthBrandLogoUrl } from "../../helpers/getAuthBrandLogoUrl";

describe("getAuthBrandLogoUrl", () => {
    it("devuelve el logo afinado para fondo claro en modo light", () => {
        expect(getAuthBrandLogoUrl("light")).toContain("StockoLogoPrem-transparent.png");
    });

    it("devuelve el logo afinado para fondo oscuro en modo dark", () => {
        expect(getAuthBrandLogoUrl("dark")).toContain("StockoLogoPrem-transparent-2.png");
    });
});
