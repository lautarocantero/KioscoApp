// src/hooks/sellers/test/useSellersForm.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import type { SellerWithRole } from "@typings/seller/sellerTypes";
import { useSellerEdit } from "../useSellersForm";
import { useSellerData } from "../useSellerData";
import { editSellerThunk } from "../../../store/seller/sellerThunks";
import { startEditAuthRole } from "../../../store/auth/authThunks";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return {
        ...actual,
        useDispatch: vi.fn(),
        useSelector: vi.fn(),
    };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: vi.fn(),
        useParams: vi.fn(),
    };
});

vi.mock("../useSellerData");

// Se mockean los thunk creators (no el store real) para poder aserter con
// qué args se llamaron, igual que useSellBar.test.tsx con cartThunks.
vi.mock("../../../store/seller/sellerThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/seller/sellerThunks")>();
    return { ...actual, editSellerThunk: vi.fn(actual.editSellerThunk) };
});

vi.mock("../../../store/auth/authThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/auth/authThunks")>();
    return { ...actual, startEditAuthRole: vi.fn(actual.startEditAuthRole) };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseParams = vi.mocked(useParams);
const mockedUseSellerData = vi.mocked(useSellerData);
const mockedEditSellerThunk = vi.mocked(editSellerThunk);
const mockedStartEditAuthRole = vi.mocked(startEditAuthRole);

const SELLER_ID = "seller-1";

const buildSeller = (overrides: Partial<SellerWithRole> = {}): SellerWithRole => ({
    _id: SELLER_ID,
    name: "Juan",
    profilePhoto: null,
    email: "juan@test.com",
    role: AuthRoleEnum.Seller,
    created_at: "2026-01-01T00:00:00.000Z",
    user_status: "offline" as SellerWithRole["user_status"],
    ...overrides,
});

describe("useSellerEdit", () => {
    const dispatch = vi.fn();
    const navigate = vi.fn();

    const mockRole = (role: AuthRoleEnum) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) => selectorFn({ auth: { role } }));
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseNavigate.mockReturnValue(navigate);
        mockedUseParams.mockReturnValue({ seller_id: SELLER_ID });
        mockedUseSellerData.mockReturnValue({
            sellerData: buildSeller(),
            isLoading: false,
            error: null,
        });
        mockRole(AuthRoleEnum.Seller);
    });

    it("solo edita el nombre y no toca el rol cuando quien edita no es admin", async () => {
        dispatch.mockResolvedValueOnce(true); // editSellerThunk
        const { result } = renderHook(() => useSellerEdit());

        await act(async () => {
            await result.current.handleEdit({ name: "Juan Nuevo", rol: AuthRoleEnum.Admin });
        });

        expect(mockedEditSellerThunk).toHaveBeenCalledWith({ _id: SELLER_ID, name: "Juan Nuevo" });
        expect(mockedStartEditAuthRole).not.toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith("/sellers");
    });

    it("además edita el rol vía startEditAuthRole cuando quien edita es admin y el rol cambió", async () => {
        mockRole(AuthRoleEnum.Admin);
        dispatch.mockResolvedValueOnce(true).mockResolvedValueOnce(true);
        const { result } = renderHook(() => useSellerEdit());

        await act(async () => {
            await result.current.handleEdit({ name: "Juan", rol: AuthRoleEnum.Admin });
        });

        expect(mockedStartEditAuthRole).toHaveBeenCalledWith({ _id: SELLER_ID, role: AuthRoleEnum.Admin });
        expect(navigate).toHaveBeenCalledWith("/sellers");
    });

    it("no llama a startEditAuthRole si el rol no cambió, aunque quien edita sea admin", async () => {
        mockRole(AuthRoleEnum.Admin);
        dispatch.mockResolvedValueOnce(true);
        const { result } = renderHook(() => useSellerEdit());

        await act(async () => {
            // buildSeller() ya trae role: Seller — mismo valor que se manda acá.
            await result.current.handleEdit({ name: "Juan", rol: AuthRoleEnum.Seller });
        });

        expect(mockedStartEditAuthRole).not.toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith("/sellers");
    });

    it("no navega y setea submitError si falla la edición del nombre", async () => {
        dispatch.mockResolvedValueOnce(false); // editSellerThunk falla
        const { result } = renderHook(() => useSellerEdit());

        await act(async () => {
            await result.current.handleEdit({ name: "Juan", rol: AuthRoleEnum.Seller });
        });

        expect(navigate).not.toHaveBeenCalled();
        expect(result.current.submitError).toBeTruthy();
    });

    it("no navega y setea submitError si falla la edición del rol", async () => {
        mockRole(AuthRoleEnum.Admin);
        dispatch.mockResolvedValueOnce(true).mockResolvedValueOnce(false); // editSellerThunk ok, role falla
        const { result } = renderHook(() => useSellerEdit());

        await act(async () => {
            await result.current.handleEdit({ name: "Juan", rol: AuthRoleEnum.Admin });
        });

        expect(navigate).not.toHaveBeenCalled();
        expect(result.current.submitError).toBeTruthy();
    });

    it("no hace nada si todavía no hay seller_id en la URL", async () => {
        mockedUseParams.mockReturnValue({ seller_id: undefined });
        const { result } = renderHook(() => useSellerEdit());

        await act(async () => {
            await result.current.handleEdit({ name: "Juan", rol: AuthRoleEnum.Seller });
        });

        expect(dispatch).not.toHaveBeenCalled();
        expect(navigate).not.toHaveBeenCalled();
    });
});
