import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useProviders } from "../useProviders";
import useProvidersListData from "../useProviderListData";
import { buildColumnsForProviders } from "../../../modules/providers/pages/ProvidersList/components/providerColumns";
import { useIsActiveKioscoAdmin } from "../../kiosco/useIsActiveKioscoAdmin";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

vi.mock("../useProviderListData");
vi.mock("../../../modules/providers/pages/ProvidersList/components/providerColumns");
vi.mock("../../kiosco/useIsActiveKioscoAdmin");

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseProvidersListData = vi.mocked(useProvidersListData);
const mockedBuildColumns = vi.mocked(buildColumnsForProviders);
const mockedUseIsActiveKioscoAdmin = vi.mocked(useIsActiveKioscoAdmin);

describe("useProviders", () => {
    const dispatch = vi.fn();
    const navigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseNavigate.mockReturnValue(navigate);
        mockedUseProvidersListData.mockReturnValue({
            providers: [],
            loading: false,
            error: null,
            searchTerm: "",
            setSearchTerm: vi.fn(),
        });
        mockedBuildColumns.mockReturnValue([]);
        mockedUseIsActiveKioscoAdmin.mockReturnValue(true);
    });

    it("el diálogo de borrado arranca cerrado", () => {
        const { result } = renderHook(() => useProviders());

        expect(result.current.deleteDialog.open).toBe(false);
    });

    it("handleDeleteRequest abre el diálogo con el id y nombre indicados", () => {
        const { result } = renderHook(() => useProviders());

        act(() => {
            result.current.handleDeleteRequest("provider-1", "Distribuidora QA");
        });

        expect(result.current.deleteDialog).toEqual({ open: true, id: "provider-1", name: "Distribuidora QA" });
    });

    it("handleDeleteCancel cierra el diálogo sin despachar nada", () => {
        const { result } = renderHook(() => useProviders());

        act(() => {
            result.current.handleDeleteRequest("provider-1", "Distribuidora QA");
        });
        act(() => {
            result.current.handleDeleteCancel();
        });

        expect(result.current.deleteDialog.open).toBe(false);
        expect(dispatch).not.toHaveBeenCalled();
    });

    it("handleDeleteConfirm despacha el borrado y cierra el diálogo", async () => {
        dispatch.mockResolvedValueOnce(true);
        const { result } = renderHook(() => useProviders());

        act(() => {
            result.current.handleDeleteRequest("provider-1", "Distribuidora QA");
        });

        await act(async () => {
            await result.current.handleDeleteConfirm();
        });

        expect(dispatch).toHaveBeenCalledWith(expect.any(Function));
        expect(result.current.deleteDialog.open).toBe(false);
    });

    it("arma las columnas pasando onDeleteRequest, navigate e isAdmin", () => {
        renderHook(() => useProviders());

        expect(mockedBuildColumns).toHaveBeenCalledWith({
            onDeleteRequest: expect.any(Function),
            navigate,
            isAdmin: true,
        });
    });

    it("propaga isAdmin=false cuando el usuario no es admin del kiosco activo", () => {
        mockedUseIsActiveKioscoAdmin.mockReturnValue(false);
        renderHook(() => useProviders());

        expect(mockedBuildColumns).toHaveBeenCalledWith(
            expect.objectContaining({ isAdmin: false })
        );
    });
});
