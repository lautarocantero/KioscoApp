import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { useSidebarKioscoCard } from "../useSidebarKioscoCard";
import { selectKioscoThunk } from "../../../../../../../store/kiosco/kioscoThunks";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

vi.mock("../../../../../../../store/kiosco/kioscoThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../../../../../store/kiosco/kioscoThunks")>();
    return {
        ...actual,
        fetchMyKioscosThunk: vi.fn(actual.fetchMyKioscosThunk),
        selectKioscoThunk: vi.fn(actual.selectKioscoThunk),
    };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedSelectKioscoThunk = vi.mocked(selectKioscoThunk);

const buildKiosco = (overrides: Partial<KioscoWithStats> = {}): KioscoWithStats => ({
    _id: "kiosco-1",
    name: "Kiosco Centro",
    address: "Av. Corrientes 1234",
    owner_id: "owner-1",
    invite_code: "ABC123",
    currency: "ARS",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    role: AuthRoleEnum.Admin,
    sellers_count: 1,
    sells_today_total: 0,
    last_accessed_at: null,
    ...overrides,
});

describe("useSidebarKioscoCard", () => {
    const dispatch = vi.fn();
    const navigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        dispatch.mockResolvedValue(undefined);
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseNavigate.mockReturnValue(navigate);
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({
                kiosco: { myKioscos: [buildKiosco()], activeKioscoId: "kiosco-1", loading: false, errorMessage: null },
            })
        );
    });

    it("expone el kiosco activo y la lista completa", () => {
        const { result } = renderHook(() => useSidebarKioscoCard());

        expect(result.current.activeKiosco?._id).toBe("kiosco-1");
        expect(result.current.kioscos).toHaveLength(1);
        expect(result.current.error).toBeNull();
    });

    it("expone el error del slice cuando el fetch de kioscos falla", () => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({
                kiosco: { myKioscos: [], activeKioscoId: null, loading: false, errorMessage: "No se pudo cargar tus tiendas" },
            })
        );

        const { result } = renderHook(() => useSidebarKioscoCard());

        expect(result.current.error).toBe("No se pudo cargar tus tiendas");
    });

    it("arranca con la lista colapsada", () => {
        const { result } = renderHook(() => useSidebarKioscoCard());
        expect(result.current.isListOpen).toBe(false);
    });

    it("toggleList alterna isListOpen", () => {
        const { result } = renderHook(() => useSidebarKioscoCard());

        act(() => result.current.toggleList());
        expect(result.current.isListOpen).toBe(true);

        act(() => result.current.toggleList());
        expect(result.current.isListOpen).toBe(false);
    });

    it("handleSelect selecciona el kiosco elegido", async () => {
        const kiosco = buildKiosco({ _id: "kiosco-2", name: "Kiosco Norte" });
        const { result } = renderHook(() => useSidebarKioscoCard());

        await act(async () => {
            result.current.handleSelect(kiosco);
        });

        expect(mockedSelectKioscoThunk).toHaveBeenCalledWith("kiosco-2");
    });
});
