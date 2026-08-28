import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSidebarLogoutConfirm } from "../useSidebarLogoutConfirm";

describe("useSidebarLogoutConfirm", () => {
  it("arranca cerrado", () => {
    const { result } = renderHook(() => useSidebarLogoutConfirm(vi.fn()));
    expect(result.current.isOpen).toBe(false);
  });

  it("requestLogout abre el diálogo sin llamar a onLogout", () => {
    const onLogout = vi.fn();
    const { result } = renderHook(() => useSidebarLogoutConfirm(onLogout));

    act(() => result.current.requestLogout());

    expect(result.current.isOpen).toBe(true);
    expect(onLogout).not.toHaveBeenCalled();
  });

  it("confirmLogout llama a onLogout y cierra", () => {
    const onLogout = vi.fn();
    const { result } = renderHook(() => useSidebarLogoutConfirm(onLogout));

    act(() => result.current.requestLogout());
    act(() => result.current.confirmLogout());

    expect(onLogout).toHaveBeenCalledTimes(1);
    expect(result.current.isOpen).toBe(false);
  });

  it("cancelLogout cierra sin llamar a onLogout", () => {
    const onLogout = vi.fn();
    const { result } = renderHook(() => useSidebarLogoutConfirm(onLogout));

    act(() => result.current.requestLogout());
    act(() => result.current.cancelLogout());

    expect(onLogout).not.toHaveBeenCalled();
    expect(result.current.isOpen).toBe(false);
  });
});
