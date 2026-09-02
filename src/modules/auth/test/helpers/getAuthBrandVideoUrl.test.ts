import { describe, expect, it } from "vitest";
import { getAuthBrandVideoUrl } from "../../helpers/getAuthBrandVideoUrl";

describe("getAuthBrandVideoUrl", () => {
    it("devuelve la URL pública del video de intro del panel de marca", () => {
        expect(getAuthBrandVideoUrl()).toContain("files/video/auth-brand-intro.mp4");
    });
});
