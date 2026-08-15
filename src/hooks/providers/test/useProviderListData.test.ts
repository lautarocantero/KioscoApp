import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import useProvidersListData from "../useProviderListData";
import { fetchProvidersThunk, searchProvidersByNameThunk } from "../../../store/provider/providerThunks";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("../../../store/provider/providerThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/provider/providerThunks")>();
    return {
        ...actual,
        fetchProvidersThunk: vi.fn(actual.fetchProvidersThunk),
        searchProvidersByNameThunk: vi.fn(actual.searchProvidersByNameThunk),
    };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedFetchProvidersThunk = vi.mocked(fetchProvidersThunk);
const mockedSearchProvidersByNameThunk = vi.mocked(searchProvidersByNameThunk);

describe("useProvidersListData", () => {
    const dispatch = vi.fn();

    const mockProviderState = (providers: unknown[] = []) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ provider: { providers, isLoading: false, errorMessage: null } })
        );
    };

    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockProviderState();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("dispara fetchProvidersThunk al montar, sin término de búsqueda", () => {
        renderHook(() => useProvidersListData());

        expect(mockedFetchProvidersThunk).toHaveBeenCalled();
    });

    it("no dispara la búsqueda inmediatamente al escribir, solo tras el debounce", () => {
        const { result, rerender } = renderHook(() => useProvidersListData());
        dispatch.mockClear();

        act(() => {
            result.current.setSearchTerm("Distri");
        });
        rerender();

        expect(mockedSearchProvidersByNameThunk).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(350);
        });

        expect(mockedSearchProvidersByNameThunk).toHaveBeenCalledWith("Distri");
    });

    it("vuelve a traer todos los proveedores si el término de búsqueda se vacía", () => {
        const { result, rerender } = renderHook(() => useProvidersListData());
        dispatch.mockClear();

        act(() => {
            result.current.setSearchTerm("");
        });
        rerender();

        expect(mockedFetchProvidersThunk).toHaveBeenCalled();
    });

    it("devuelve los providers tal cual vienen del store", () => {
        mockProviderState([{ _id: "1" }, { _id: "2" }]);
        const { result } = renderHook(() => useProvidersListData());

        expect(result.current.providers).toHaveLength(2);
    });
});
