import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { KioscoPlanEnum, KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import { useKioscoSelector } from "../useKioscoSelector";
import { fetchMyKioscosThunk, selectKioscoThunk } from "../../../store/kiosco/kioscoThunks";
import { clearKioscoError } from "../../../store/kiosco/kioscoSlice";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

vi.mock("../../../store/kiosco/kioscoThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/kiosco/kioscoThunks")>();
    return {
        ...actual,
        fetchMyKioscosThunk: vi.fn(actual.fetchMyKioscosThunk),
        selectKioscoThunk: vi.fn(actual.selectKioscoThunk),
    };
});

vi.mock("../../../store/kiosco/kioscoSlice", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/kiosco/kioscoSlice")>();
    return { ...actual, clearKioscoError: vi.fn(actual.clearKioscoError) };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedFetchMyKioscosThunk = vi.mocked(fetchMyKioscosThunk);
const mockedSelectKioscoThunk = vi.mocked(selectKioscoThunk);
const mockedClearKioscoError = vi.mocked(clearKioscoError);

const buildKiosco = (overrides: Partial<KioscoWithStats> = {}): KioscoWithStats => ({
    _id: "kiosco-1",
    name: "Kiosco Centro",
    address: "Av. Corrientes 1234",
    owner_id: "owner-1",
    invite_code: "ABC123",
    currency: "ARS",
    plan: KioscoPlanEnum.Stocko,
    plan_status: KioscoPlanStatusEnum.Active,
    mp_preapproval_id: null,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    role: AuthRoleEnum.Admin,
    sellers_count: 1,
    sells_today_total: 0,
    last_accessed_at: null,
    ...overrides,
});

describe("useKioscoSelector", () => {
    const dispatch = vi.fn();
    const navigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        dispatch.mockResolvedValue(undefined);
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseNavigate.mockReturnValue(navigate);
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ kiosco: { myKioscos: [buildKiosco()], loading: false, errorMessage: null } })
        );
    });

    it("pide la lista de kioscos al montar", () => {
        renderHook(() => useKioscoSelector());
        expect(mockedFetchMyKioscosThunk).toHaveBeenCalled();
    });

    it("expone los kioscos, loading y error desde el slice", () => {
        const { result } = renderHook(() => useKioscoSelector());

        expect(result.current.kioscos).toHaveLength(1);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(result.current.entering).toBeNull();
    });

    it("clearError despacha clearKioscoError", () => {
        const { result } = renderHook(() => useKioscoSelector());
        result.current.clearError();
        expect(mockedClearKioscoError).toHaveBeenCalled();
    });

    it("handleEnterKiosco marca 'entering', selecciona el kiosco y navega a /shop", async () => {
        const kiosco = buildKiosco();
        const { result } = renderHook(() => useKioscoSelector());

        await act(async () => {
            await result.current.handleEnterKiosco(kiosco);
        });

        expect(mockedSelectKioscoThunk).toHaveBeenCalledWith(kiosco._id);
        expect(navigate).toHaveBeenCalledWith("/shop");
    });
});
