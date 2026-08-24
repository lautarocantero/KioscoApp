import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useLandingNavigation } from "../useLandingNavigation";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: vi.fn() };
});

const mockedUseNavigate = vi.mocked(useNavigate);

describe("useLandingNavigation", () => {
  const navigate = vi.fn();

  beforeEach(() => {
    navigate.mockClear();
    mockedUseNavigate.mockReturnValue(navigate);
  });

  it("navega a /login", () => {
    const { result } = renderHook(() => useLandingNavigation());
    result.current.goToLogin();
    expect(navigate).toHaveBeenCalledWith("/login");
  });

  it("navega a /register", () => {
    const { result } = renderHook(() => useLandingNavigation());
    result.current.goToRegister();
    expect(navigate).toHaveBeenCalledWith("/register");
  });

  it("navega a /join-kiosco", () => {
    const { result } = renderHook(() => useLandingNavigation());
    result.current.goToJoinKiosco();
    expect(navigate).toHaveBeenCalledWith("/join-kiosco");
  });
});
