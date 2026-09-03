import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSellersTutorialSteps } from "../../tutorial/sellersTutorialSteps";
import { useIsActiveKioscoAdmin } from "@hooks/kiosco/useIsActiveKioscoAdmin";

vi.mock("@hooks/kiosco/useIsActiveKioscoAdmin");

const mockedUseIsActiveKioscoAdmin = vi.mocked(useIsActiveKioscoAdmin);

describe("useSellersTutorialSteps", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("admin: incluye el paso de invitar vendedor", () => {
        mockedUseIsActiveKioscoAdmin.mockReturnValue(true);

        const { result } = renderHook(() => useSellersTutorialSteps());

        expect(result.current.map((step) => step.id)).toEqual(["welcome", "invite"]);
    });

    it("no admin: no incluye el paso de invitar (el botón no existe en el DOM)", () => {
        mockedUseIsActiveKioscoAdmin.mockReturnValue(false);

        const { result } = renderHook(() => useSellersTutorialSteps());

        expect(result.current.map((step) => step.id)).toEqual(["welcome"]);
    });
});
