import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { CreateKioscoFormValues, Kiosco } from "@typings/kiosco/kioscoTypes";
import { useCreateKiosco } from "../useCreateKiosco";
import { createKioscoThunk } from "../../../store/kiosco/kioscoThunks";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

vi.mock("../../../store/kiosco/kioscoThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/kiosco/kioscoThunks")>();
    return { ...actual, createKioscoThunk: vi.fn(actual.createKioscoThunk) };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedCreateKioscoThunk = vi.mocked(createKioscoThunk);

const FORM_VALUES: CreateKioscoFormValues = { name: "Kiosco Centro", address: "Av. Corrientes 1234" };

const buildKiosco = (): Kiosco => ({
    _id: "kiosco-1",
    name: "Kiosco Centro",
    address: "Av. Corrientes 1234",
    owner_id: "owner-1",
    invite_code: "ABC123",
    currency: "ARS",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
});

describe("useCreateKiosco", () => {
    const dispatch = vi.fn();
    const navigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseNavigate.mockReturnValue(navigate);
    });

    it("crea el kiosco, lo selecciona y navega a /shop cuando el thunk devuelve un kiosco", async () => {
        const kiosco = buildKiosco();
        dispatch
            .mockResolvedValueOnce(kiosco) // createKioscoThunk
            .mockResolvedValueOnce(undefined) // fetchMyKioscosThunk
            .mockResolvedValueOnce(undefined); // selectKioscoThunk

        const { result } = renderHook(() => useCreateKiosco());

        await act(async () => {
            await result.current.handleSubmit(FORM_VALUES);
        });

        expect(mockedCreateKioscoThunk).toHaveBeenCalledWith(FORM_VALUES);
        expect(navigate).toHaveBeenCalledWith("/shop");
        expect(result.current.submitError).toBeNull();
        expect(result.current.isSubmitting).toBe(false);
    });

    it("no navega y setea submitError si el thunk no devuelve un kiosco", async () => {
        dispatch.mockResolvedValueOnce(undefined);
        const { result } = renderHook(() => useCreateKiosco());

        await act(async () => {
            await result.current.handleSubmit(FORM_VALUES);
        });

        expect(navigate).not.toHaveBeenCalled();
        expect(result.current.submitError).toBeTruthy();
        expect(result.current.isSubmitting).toBe(false);
    });
});
