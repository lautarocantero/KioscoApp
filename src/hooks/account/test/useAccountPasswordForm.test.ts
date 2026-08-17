import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useAccountPasswordForm } from "../useAccountPasswordForm";
import { authLoginRequest } from "../../../modules/auth/api/authApi";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return { ...actual, useDispatch: vi.fn(), useSelector: vi.fn() };
});

vi.mock("../../../modules/auth/api/authApi", () => ({
  authLoginRequest: vi.fn(),
}));

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedAuthLoginRequest = vi.mocked(authLoginRequest);

describe("useAccountPasswordForm", () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseDispatch.mockReturnValue(mockDispatch as unknown as ReturnType<typeof useDispatch>);
    mockedUseSelector.mockImplementation((selectorFn: (state: unknown) => unknown) =>
      selectorFn({ auth: { email: "user@example.com" } })
    );
  });

  const fillValidValues = async (formik: ReturnType<typeof useAccountPasswordForm>["formik"]) => {
    await act(async () => {
      await formik.setValues({ currentPassword: "oldpass1", newPassword: "secret1", repeatNewPassword: "secret1" });
    });
  };

  it("verifica la contraseña actual (POST /auth/login), pide el token de reset y aplica la nueva contraseña", async () => {
    mockedAuthLoginRequest.mockResolvedValueOnce({ user: {} });
    mockDispatch
      .mockResolvedValueOnce({ success: true, errorMessage: null, token: "tok-123" })
      .mockResolvedValueOnce({ success: true, errorMessage: null });

    const { result } = renderHook(() => useAccountPasswordForm());
    await fillValidValues(result.current.formik);

    await act(async () => {
      await result.current.formik.handleSubmit();
    });

    expect(mockedAuthLoginRequest).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "oldpass1",
      rememberMe: true,
    });
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(result.current.errorMessage).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isDialogOpen).toBe(false);
  });

  it("expone un error y no llega a pedir el token si la contraseña actual es incorrecta", async () => {
    mockedAuthLoginRequest.mockRejectedValueOnce(new Error("Contraseña incorrecta"));

    const { result } = renderHook(() => useAccountPasswordForm());
    act(() => result.current.openDialog());
    await fillValidValues(result.current.formik);

    await act(async () => {
      await result.current.formik.handleSubmit();
    });

    expect(mockDispatch).not.toHaveBeenCalled();
    expect(result.current.errorMessage).toBe("Contraseña incorrecta");
    expect(result.current.isDialogOpen).toBe(true);
  });

  it("expone un error si falla el pedido de token luego de verificar la contraseña actual", async () => {
    mockedAuthLoginRequest.mockResolvedValueOnce({ user: {} });
    mockDispatch.mockResolvedValueOnce({ success: false, errorMessage: "Error de red", token: null });

    const { result } = renderHook(() => useAccountPasswordForm());
    await fillValidValues(result.current.formik);

    await act(async () => {
      await result.current.formik.handleSubmit();
    });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(result.current.errorMessage).toBe("Error de red");
  });

  it("expone el error del backend si el reset con token falla", async () => {
    mockedAuthLoginRequest.mockResolvedValueOnce({ user: {} });
    mockDispatch
      .mockResolvedValueOnce({ success: true, errorMessage: null, token: "tok-123" })
      .mockResolvedValueOnce({ success: false, errorMessage: "El link para restablecer la contraseña expiró" });

    const { result } = renderHook(() => useAccountPasswordForm());
    await fillValidValues(result.current.formik);

    await act(async () => {
      await result.current.formik.handleSubmit();
    });

    expect(result.current.errorMessage).toBe("El link para restablecer la contraseña expiró");
  });

  it("openDialog/closeDialog controlan isDialogOpen", () => {
    const { result } = renderHook(() => useAccountPasswordForm());

    expect(result.current.isDialogOpen).toBe(false);

    act(() => result.current.openDialog());
    expect(result.current.isDialogOpen).toBe(true);

    act(() => result.current.closeDialog());
    expect(result.current.isDialogOpen).toBe(false);
  });
});
