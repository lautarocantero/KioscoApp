import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import { KioscoPlanEnum, KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import KioscoCard from "../../components/KioscoCard/KioscoCard";

const buildKiosco = (overrides: Partial<KioscoWithStats> = {}): KioscoWithStats => ({
    _id: "kiosco-1",
    name: "Kiosco Centro",
    address: "Av. Corrientes 1234",
    owner_id: "owner-1",
    invite_code: "ABC123",
    currency: "ARS",
    plan: KioscoPlanEnum.Stocko,
    plan_status: KioscoPlanStatusEnum.Active,
    mp_preapproval_id: null,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    role: AuthRoleEnum.Admin,
    sellers_count: 3,
    sells_today_total: 1500,
    last_accessed_at: null,
    ...overrides,
});

describe("KioscoCard", () => {
    it("muestra el nombre, la dirección y la cantidad de vendedores del kiosco", () => {
        renderWithTheme(<KioscoCard kiosco={buildKiosco()} colorIndex={0} entering={false} onEnter={vi.fn()} />);

        expect(screen.getByText("Kiosco Centro")).toBeInTheDocument();
        expect(screen.getByText("Av. Corrientes 1234")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("no renderiza la fila de dirección si el kiosco no tiene una", () => {
        renderWithTheme(
            <KioscoCard kiosco={buildKiosco({ address: "" })} colorIndex={0} entering={false} onEnter={vi.fn()} />
        );

        expect(screen.queryByText("Av. Corrientes 1234")).not.toBeInTheDocument();
    });

    it("llama a onEnter al hacer click en el botón de ingresar", () => {
        const onEnter = vi.fn();
        renderWithTheme(<KioscoCard kiosco={buildKiosco()} colorIndex={0} entering={false} onEnter={onEnter} />);

        fireEvent.click(screen.getByRole("button"));

        expect(onEnter).toHaveBeenCalledTimes(1);
    });

    it("deshabilita el botón y muestra el estado 'entrando' cuando entering es true", () => {
        renderWithTheme(<KioscoCard kiosco={buildKiosco()} colorIndex={0} entering={true} onEnter={vi.fn()} />);

        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
    });
});
