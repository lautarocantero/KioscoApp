import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { Provider, ProviderFormValues } from "@typings/provider/providerTypes";
import { useProviderCreate, useProviderEdit } from "../useProvidersForm";
import { useProviderData } from "../useProviderData";
import { createProviderThunk, editProviderThunk } from "../../../store/provider/providerThunks";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn(), useParams: vi.fn() };
});

vi.mock("../useProviderData");

vi.mock("../../../store/provider/providerThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/provider/providerThunks")>();
    return {
        ...actual,
        createProviderThunk: vi.fn(actual.createProviderThunk),
        editProviderThunk: vi.fn(actual.editProviderThunk),
    };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseParams = vi.mocked(useParams);
const mockedUseProviderData = vi.mocked(useProviderData);
const mockedCreateProviderThunk = vi.mocked(createProviderThunk);
const mockedEditProviderThunk = vi.mocked(editProviderThunk);

const PROVIDER_ID = "provider-1";

const FORM_VALUES: ProviderFormValues = {
    name: "Distribuidora QA",
    valoration: 4,
    contact_phone: "+54 11 4444-5555",
    contact_email: "contacto@distribuidoraqa.test",
};

const buildProvider = (overrides: Partial<Provider> = {}): Provider => ({
    _id: PROVIDER_ID,
    name: "Distribuidora QA",
    valoration: 4,
    contact_phone: "+54 11 4444-5555",
    contact_email: "contacto@distribuidoraqa.test",
    ...overrides,
});

describe("useProviderCreate", () => {
    const dispatch = vi.fn();
    const navigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseNavigate.mockReturnValue(navigate);
    });

    it("crea el proveedor y navega a /providers si el thunk devuelve un _id", async () => {
        dispatch.mockResolvedValueOnce(PROVIDER_ID);
        const { result } = renderHook(() => useProviderCreate());

        await act(async () => {
            await result.current.handleSubmit(FORM_VALUES);
        });

        expect(mockedCreateProviderThunk).toHaveBeenCalledWith(FORM_VALUES);
        expect(navigate).toHaveBeenCalledWith("/providers");
        expect(result.current.submitError).toBeNull();
    });

    it("no navega y setea submitError si el thunk no devuelve _id", async () => {
        dispatch.mockResolvedValueOnce(undefined);
        const { result } = renderHook(() => useProviderCreate());

        await act(async () => {
            await result.current.handleSubmit(FORM_VALUES);
        });

        expect(navigate).not.toHaveBeenCalled();
        expect(result.current.submitError).toBeTruthy();
    });
});

describe("useProviderEdit", () => {
    const dispatch = vi.fn();
    const navigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseNavigate.mockReturnValue(navigate);
        mockedUseParams.mockReturnValue({ provider_id: PROVIDER_ID });
        mockedUseProviderData.mockReturnValue({
            providerData: buildProvider(),
            isLoading: false,
            error: null,
        });
    });

    it("edita el proveedor y navega a /providers si el thunk tiene éxito", async () => {
        dispatch.mockResolvedValueOnce(true);
        const { result } = renderHook(() => useProviderEdit());

        await act(async () => {
            await result.current.handleEdit(FORM_VALUES);
        });

        expect(mockedEditProviderThunk).toHaveBeenCalledWith({ _id: PROVIDER_ID, ...FORM_VALUES });
        expect(navigate).toHaveBeenCalledWith("/providers");
    });

    it("no navega y setea submitError si falla la edición", async () => {
        dispatch.mockResolvedValueOnce(false);
        const { result } = renderHook(() => useProviderEdit());

        await act(async () => {
            await result.current.handleEdit(FORM_VALUES);
        });

        expect(navigate).not.toHaveBeenCalled();
        expect(result.current.submitError).toBeTruthy();
    });

    it("no hace nada si todavía no hay provider_id en la URL", async () => {
        mockedUseParams.mockReturnValue({ provider_id: undefined });
        const { result } = renderHook(() => useProviderEdit());

        await act(async () => {
            await result.current.handleEdit(FORM_VALUES);
        });

        expect(dispatch).not.toHaveBeenCalled();
        expect(navigate).not.toHaveBeenCalled();
    });
});
