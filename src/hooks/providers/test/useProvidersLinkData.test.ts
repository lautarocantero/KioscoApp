import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useProvidersLinkData } from "../useProvidersLinkData";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);

describe("useProvidersLinkData", () => {
    const dispatch = vi.fn();

    const mockProviderState = (
        stats: { totalProviders: number } | null = null,
        isLoadingStats = false,
        statsError: string | null = null,
    ) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
            selectorFn({ provider: { stats, isLoadingStats, statsError } })
        );
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockProviderState();
    });

    it("expone totalProviders como value cuando hay stats en el store", () => {
        mockProviderState({ totalProviders: 7 });
        const { result } = renderHook(() => useProvidersLinkData());

        expect(result.current.value).toBe(7);
    });

    it("value es null mientras no hay stats en el store", () => {
        const { result } = renderHook(() => useProvidersLinkData());

        expect(result.current.value).toBeNull();
    });

    it("propaga isLoading y error del store de providers", () => {
        mockProviderState(null, true, "boom");
        const { result } = renderHook(() => useProvidersLinkData());

        expect(result.current.isLoading).toBe(true);
        expect(result.current.error).toBe("boom");
    });

    it("dispara la carga de stats al montar si todavía no hay stats", () => {
        renderHook(() => useProvidersLinkData());

        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
    });

    it("no vuelve a disparar la carga si ya hay stats en el store", () => {
        mockProviderState({ totalProviders: 3 });
        renderHook(() => useProvidersLinkData());

        expect(dispatch).not.toHaveBeenCalled();
    });
});
