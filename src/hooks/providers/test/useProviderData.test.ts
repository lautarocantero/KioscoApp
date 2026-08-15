import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useProviderData } from "../useProviderData";
import { fetchProviderByIdThunk } from "../../../store/provider/providerThunks";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("../../../store/provider/providerThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/provider/providerThunks")>();
    return { ...actual, fetchProviderByIdThunk: vi.fn(actual.fetchProviderByIdThunk) };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedFetchProviderByIdThunk = vi.mocked(fetchProviderByIdThunk);

const PROVIDER = { _id: "provider-1", name: "Distribuidora QA", valoration: 4, contact_phone: "123", contact_email: "a@a.com" };

describe("useProviderData", () => {
    const dispatch = vi.fn();

    const mockProviderState = (currentProvider: unknown = null, isLoadingCurrent = false, currentProviderError: string | null = null) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ provider: { currentProvider, isLoadingCurrent, currentProviderError } })
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockProviderState();
    });

    it("no dispara nada si no hay providerId", () => {
        renderHook(() => useProviderData(undefined));

        expect(dispatch).not.toHaveBeenCalled();
    });

    it("no vuelve a pedir el proveedor si el store ya lo tiene cargado", () => {
        mockProviderState(PROVIDER);
        renderHook(() => useProviderData("provider-1"));

        expect(dispatch).not.toHaveBeenCalled();
    });

    it("pide el proveedor por id cuando no está en el store", async () => {
        dispatch.mockResolvedValueOnce([PROVIDER]);
        renderHook(() => useProviderData("provider-1"));

        await waitFor(() => {
            expect(mockedFetchProviderByIdThunk).toHaveBeenCalledWith("provider-1");
        });
    });

    it("devuelve providerData, isLoading y error del store", () => {
        mockProviderState(PROVIDER, true, "boom");
        const { result } = renderHook(() => useProviderData("provider-1"));

        expect(result.current.providerData).toEqual(PROVIDER);
        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBe("boom");
    });
});
