import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../useLogout";
import { startLogout } from "../../../store/auth/authThunks";

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return { ...actual, useDispatch: vi.fn() };
});

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: vi.fn() };
});

vi.mock("../../../store/auth/authThunks", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../../../store/auth/authThunks")>();
    return { ...actual, startLogout: vi.fn(actual.startLogout) };
});

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseNavigate = vi.mocked(useNavigate);
const mockedStartLogout = vi.mocked(startLogout);

describe("useLogout", () => {
    const dispatch = vi.fn();
    const navigate = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        dispatch.mockResolvedValue(true);
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseNavigate.mockReturnValue(navigate);
    });

    it("despacha startLogout y navega a '/'", async () => {
        const { result } = renderHook(() => useLogout());

        await act(async () => {
            await result.current.handleLogout();
        });

        expect(mockedStartLogout).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalled();
        expect(navigate).toHaveBeenCalledWith("/");
    });
});
