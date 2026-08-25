import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSellEdit } from "../useSellsForm";
import { useSellData } from "../useSellData";
import { useIsActiveKioscoAdmin } from "../../kiosco/useIsActiveKioscoAdmin";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn(), useParams: vi.fn() };
});

vi.mock("../useSellData");
vi.mock("../../kiosco/useIsActiveKioscoAdmin");

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseParams = vi.mocked(useParams);
const mockedUseSellData = vi.mocked(useSellData);
const mockedUseIsActiveKioscoAdmin = vi.mocked(useIsActiveKioscoAdmin);

describe("useSellEdit — acceso admin-only", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(vi.fn());
        mockedUseNavigate.mockReturnValue(vi.fn());
        mockedUseParams.mockReturnValue({ sell_id: "sell-1" });
        mockedUseSellData.mockReturnValue({ sellData: null, isLoading: false, error: null });
    });

    it("expone isAdmin=true cuando el usuario es admin del kiosco activo", () => {
        mockedUseIsActiveKioscoAdmin.mockReturnValue(true);
        const { result } = renderHook(() => useSellEdit());

        expect(result.current.isAdmin).toBe(true);
    });

    it("expone isAdmin=false cuando el usuario es seller", () => {
        mockedUseIsActiveKioscoAdmin.mockReturnValue(false);
        const { result } = renderHook(() => useSellEdit());

        expect(result.current.isAdmin).toBe(false);
    });
});
