import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSidebar } from "../useAppSidebar";
import { SIDEBAR_STORAGE_KEY } from "../../../../../../../config/constants";

let mockPathname = "/shop";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return { ...actual, useDispatch: vi.fn() };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: vi.fn(), useLocation: () => ({ pathname: mockPathname }) };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseNavigate = vi.mocked(useNavigate);

describe("useAppSidebar", () => {
  const dispatch = vi.fn();
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockPathname = "/shop";
    mockedUseDispatch.mockReturnValue(dispatch);
    mockedUseNavigate.mockReturnValue(navigate);
  });

  describe("handleLogout", () => {
    it("navega a '/' después de despachar el logout, cuando el server responde bien", async () => {
      dispatch.mockResolvedValueOnce(true);
      const { result } = renderHook(() => useAppSidebar());

      await act(async () => {
        await result.current.handleLogout();
      });

      expect(dispatch).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith("/");
    });

    it("igual navega a '/' aunque el logout en el server haya fallado", async () => {
      dispatch.mockResolvedValueOnce(false);
      const { result } = renderHook(() => useAppSidebar());

      await act(async () => {
        await result.current.handleLogout();
      });

      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  describe("isPanelOpen / togglePanel / closePanel", () => {
    it("arranca cerrado si no hay nada en localStorage", () => {
      const { result } = renderHook(() => useAppSidebar());
      expect(result.current.isPanelOpen).toBe(false);
    });

    it("arranca abierto si localStorage tiene 'true'", () => {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, "true");
      const { result } = renderHook(() => useAppSidebar());
      expect(result.current.isPanelOpen).toBe(true);
    });

    it("togglePanel invierte el estado y lo persiste", () => {
      const { result } = renderHook(() => useAppSidebar());

      act(() => result.current.togglePanel());
      expect(result.current.isPanelOpen).toBe(true);
      expect(localStorage.getItem(SIDEBAR_STORAGE_KEY)).toBe("true");

      act(() => result.current.togglePanel());
      expect(result.current.isPanelOpen).toBe(false);
      expect(localStorage.getItem(SIDEBAR_STORAGE_KEY)).toBe("false");
    });

    it("closePanel siempre deja isPanelOpen en false", () => {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, "true");
      const { result } = renderHook(() => useAppSidebar());

      act(() => result.current.closePanel());

      expect(result.current.isPanelOpen).toBe(false);
      expect(localStorage.getItem(SIDEBAR_STORAGE_KEY)).toBe("false");
    });
  });

  describe("handleNavClick", () => {
    it("navega al url del link", () => {
      const { result } = renderHook(() => useAppSidebar());

      act(() => result.current.handleNavClick(result.current.navLinks[0]));

      expect(navigate).toHaveBeenCalledWith(result.current.navLinks[0].url);
    });

    it("abre el panel si estaba cerrado", () => {
      const { result } = renderHook(() => useAppSidebar());
      expect(result.current.isPanelOpen).toBe(false);

      act(() => result.current.handleNavClick(result.current.navLinks[0]));

      expect(result.current.isPanelOpen).toBe(true);
    });

    it("deja el panel abierto (no lo cierra) si ya estaba abierto", () => {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, "true");
      const { result } = renderHook(() => useAppSidebar());

      act(() => result.current.handleNavClick(result.current.navLinks[0]));

      expect(result.current.isPanelOpen).toBe(true);
    });
  });

  describe("handleSellClick", () => {
    it("navega a /new-sell", () => {
      const { result } = renderHook(() => useAppSidebar());

      act(() => result.current.handleSellClick());

      expect(navigate).toHaveBeenCalledWith("/new-sell");
    });
  });

  describe("activeLink / destinations / isLinkActive / isSellActive", () => {
    it("resuelve activeLink comparando location.pathname con cada navLink.url", () => {
      mockPathname = "/shop";
      const { result } = renderHook(() => useAppSidebar());

      expect(result.current.activeLink?.url).toBe("/shop");
    });

    it("activeLink queda undefined en rutas sin un navLink correspondiente (ej. /new-sell)", () => {
      mockPathname = "/new-sell";
      const { result } = renderHook(() => useAppSidebar());

      expect(result.current.activeLink).toBeUndefined();
    });

    it("destinations refleja NAV_DESTINATIONS de la sección activa", () => {
      mockPathname = "/shop";
      const { result } = renderHook(() => useAppSidebar());

      expect(result.current.destinations).toEqual([{ label: "Reporte mensual", url: "/shop/stadistics" }]);
    });

    it("destinations es un array vacío para secciones sin destinos registrados", () => {
      mockPathname = "/sells";
      const { result } = renderHook(() => useAppSidebar());

      expect(result.current.destinations).toEqual([]);
    });

    it("isLinkActive es true solo para el link de la sección activa", () => {
      mockPathname = "/shop";
      const { result } = renderHook(() => useAppSidebar());

      const shopLink = result.current.navLinks.find((link) => link.url === "/shop")!;
      const sellsLink = result.current.navLinks.find((link) => link.url === "/sells")!;

      expect(result.current.isLinkActive(shopLink)).toBe(true);
      expect(result.current.isLinkActive(sellsLink)).toBe(false);
    });

    it("isSellActive es true en /new-sell", () => {
      mockPathname = "/new-sell";
      const { result } = renderHook(() => useAppSidebar());

      expect(result.current.isSellActive).toBe(true);
    });

    it("isSellActive es false fuera de /new-sell", () => {
      mockPathname = "/shop";
      const { result } = renderHook(() => useAppSidebar());

      expect(result.current.isSellActive).toBe(false);
    });
  });
});
