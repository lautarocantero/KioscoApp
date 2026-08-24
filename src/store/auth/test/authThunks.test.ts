import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import authReducer, { login } from "../authSlice";
import kioscoReducer, { setActiveKioscoId, setMyKioscos } from "../../kiosco/kioscoSlice";
import { AuthStatus } from "@typings/auth/authEnums";
import { ACTIVE_KIOSCO_STORAGE_KEY } from "../../../config/constants";
import { authLogoutRequest } from "../../../modules/auth/api/authApi";
import { startLogout } from "../authThunks";

vi.mock("../../../modules/auth/api/authApi", () => ({
  authLogoutRequest: vi.fn(),
}));

const mockedAuthLogoutRequest = vi.mocked(authLogoutRequest);

const buildStore = () => configureStore({ reducer: { auth: authReducer, kiosco: kioscoReducer } });

const seedLoggedInState = (store: ReturnType<typeof buildStore>) => {
  store.dispatch(login({ email: "a@a.com", name: "A", profilePhoto: "", isVerified: true, _id: "1" }));
  store.dispatch(setMyKioscos({ kioscos: [{ _id: "k1" } as never] }));
  store.dispatch(setActiveKioscoId({ kioscoId: "k1" }));
  localStorage.setItem(ACTIVE_KIOSCO_STORAGE_KEY, "k1");
};

describe("startLogout", () => {
  beforeEach(() => {
    mockedAuthLogoutRequest.mockReset();
    localStorage.clear();
  });

  it("limpia sesión y kiosco activo, y devuelve true cuando el server responde bien", async () => {
    mockedAuthLogoutRequest.mockResolvedValueOnce({} as never);
    const store = buildStore();
    seedLoggedInState(store);

    const succeeded = await store.dispatch(startLogout() as never);

    expect(succeeded).toBe(true);
    expect(store.getState().auth.status).toBe(AuthStatus.NotAuthenticated);
    expect(store.getState().kiosco.activeKioscoId).toBeNull();
    expect(localStorage.getItem(ACTIVE_KIOSCO_STORAGE_KEY)).toBeNull();
  });

  it("igual limpia sesión y kiosco activo, pero devuelve false, cuando el logout falla en el server", async () => {
    mockedAuthLogoutRequest.mockRejectedValueOnce(new Error("network error"));
    const store = buildStore();
    seedLoggedInState(store);

    const succeeded = await store.dispatch(startLogout() as never);

    expect(succeeded).toBe(false);
    expect(store.getState().auth.status).toBe(AuthStatus.NotAuthenticated);
    expect(store.getState().kiosco.activeKioscoId).toBeNull();
    expect(localStorage.getItem(ACTIVE_KIOSCO_STORAGE_KEY)).toBeNull();
  });
});
