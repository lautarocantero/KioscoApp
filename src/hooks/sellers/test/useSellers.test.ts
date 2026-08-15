// src/hooks/sellers/test/useSellers.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { useSellers } from "../useSellers";
import useSellersListData from "../useSellerListData";
import { buildColumnsForSellers } from "../../../modules/sellers/pages/SellersList/components/SellerColumns";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

vi.mock("../useSellerListData");
vi.mock("../../../modules/sellers/pages/SellersList/components/SellerColumns");

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedUseSellersListData = vi.mocked(useSellersListData);
const mockedBuildColumns = vi.mocked(buildColumnsForSellers);

describe("useSellers — visibilidad del borrado según rol", () => {
    const dispatch = vi.fn();
    const navigate = vi.fn();

    const mockRole = (role: AuthRoleEnum) => {
        mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) => selectorFn({ auth: { role } }));
    };

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseNavigate.mockReturnValue(navigate);
        mockedUseSellersListData.mockReturnValue({
            sellers: [],
            loading: false,
            error: null,
            clearError: vi.fn(),
        });
        mockedBuildColumns.mockReturnValue([]);
    });

    it("no pasa onDeleteRequest a las columnas cuando el usuario no es admin", () => {
        mockRole(AuthRoleEnum.Seller);
        renderHook(() => useSellers());

        expect(mockedBuildColumns).toHaveBeenCalledWith(
            expect.objectContaining({ onDeleteRequest: undefined })
        );
    });

    it("pasa onDeleteRequest a las columnas cuando el usuario es admin", () => {
        mockRole(AuthRoleEnum.Admin);
        renderHook(() => useSellers());

        expect(mockedBuildColumns).toHaveBeenCalledWith(
            expect.objectContaining({ onDeleteRequest: expect.any(Function) })
        );
    });
});
