import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSidebar } from "../useAppSidebar";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return { ...actual, useDispatch: vi.fn() };
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: vi.fn(), useLocation: () => ({ pathname: "/shop" }) };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseNavigate = vi.mocked(useNavigate);

describe("useAppSidebar > handleLogout", () => {
  const dispatch = vi.fn();
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseDispatch.mockReturnValue(dispatch);
    mockedUseNavigate.mockReturnValue(navigate);
  });

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
