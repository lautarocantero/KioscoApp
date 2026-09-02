import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthPageModeEnum } from "@typings/auth/authEnums";
import { useAuthPageMode } from "../useAuthPageMode";

const renderAt = (initialEntry: string) =>
    renderHook(() => useAuthPageMode(), {
        wrapper: ({ children }) => <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>,
    });

describe("useAuthPageMode", () => {
    it("resuelve Login por defecto, sin query param", () => {
        const { result } = renderAt("/login");

        expect(result.current.mode).toBe(AuthPageModeEnum.Login);
    });

    it("resuelve Register con ?mode=register", () => {
        const { result } = renderAt("/login?mode=register");

        expect(result.current.mode).toBe(AuthPageModeEnum.Register);
    });

    it("resuelve Login ante cualquier otro valor de mode", () => {
        const { result } = renderAt("/login?mode=whatever");

        expect(result.current.mode).toBe(AuthPageModeEnum.Login);
    });
});
