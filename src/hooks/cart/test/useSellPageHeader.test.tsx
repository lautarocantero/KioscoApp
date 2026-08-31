import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSellPageHeader } from "../useSellPageHeader";

const mockUseSelector = vi.fn();
vi.mock("react-redux", () => ({
  useSelector: (selector: (state: unknown) => unknown) => mockUseSelector(selector),
}));

const mockUseActiveKiosco = vi.fn();
vi.mock("../../kiosco/useActiveKiosco", () => ({
  useActiveKiosco: () => mockUseActiveKiosco(),
}));

describe("useSellPageHeader", () => {
  it("expone el nombre del kiosco activo, del vendedor logueado y la fecha formateada", () => {
    mockUseActiveKiosco.mockReturnValue({ activeKiosco: { name: "Kiosco Belgrano 1420" } });
    mockUseSelector.mockImplementation((selector) => selector({ auth: { name: "Lautaro C." } }));

    const { result } = renderHook(() => useSellPageHeader());

    expect(result.current.kioscoName).toBe("Kiosco Belgrano 1420");
    expect(result.current.sellerName).toBe("Lautaro C.");
    expect(result.current.dateLabel).toEqual(expect.any(String));
  });

  it("devuelve strings vacíos cuando no hay kiosco activo ni nombre de vendedor", () => {
    mockUseActiveKiosco.mockReturnValue({ activeKiosco: null });
    mockUseSelector.mockImplementation((selector) => selector({ auth: { name: "" } }));

    const { result } = renderHook(() => useSellPageHeader());

    expect(result.current.kioscoName).toBe("");
    expect(result.current.sellerName).toBe("");
  });
});
