import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { KioscoPlanEnum, KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import type { MembershipStatus, MembershipPlanDefinition } from "@typings/membership/membershipTypes";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { formatDate } from "../../../../utils/formatter/formatDate";
import MembershipCurrentPlanHero from "../../components/MembershipCurrentPlanHero";

const buildStatus = (overrides: Partial<MembershipStatus> = {}): MembershipStatus => ({
    plan: KioscoPlanEnum.Standard,
    plan_status: KioscoPlanStatusEnum.Active,
    next_payment_date: "2026-10-12",
    ...overrides,
});

const buildPlanDefinition = (overrides: Partial<MembershipPlanDefinition> = {}): MembershipPlanDefinition => ({
    id: KioscoPlanEnum.Standard,
    name: "Stocko Standard",
    price: 9999,
    currency_id: "ARS",
    ...overrides,
});

describe("MembershipCurrentPlanHero", () => {
    it("muestra el nombre del plan, el estado y la fecha de próximo pago", () => {
        renderWithTheme(
            <MembershipCurrentPlanHero status={buildStatus()} currentPlanDefinition={buildPlanDefinition()} />
        );

        expect(screen.getByText("Stocko Standard")).toBeInTheDocument();
        expect(screen.getByText("Activo")).toBeInTheDocument();
        expect(screen.getByText(formatDate("2026-10-12"))).toBeInTheDocument();
    });

    it("muestra el importe mensual derivado del plan actual", () => {
        renderWithTheme(
            <MembershipCurrentPlanHero status={buildStatus()} currentPlanDefinition={buildPlanDefinition({ price: 15000 })} />
        );

        expect(screen.getByText("$ 15.000,00")).toBeInTheDocument();
    });

    it("no muestra el bloque de próximo pago cuando next_payment_date es null", () => {
        renderWithTheme(
            <MembershipCurrentPlanHero
                status={buildStatus({ next_payment_date: null })}
                currentPlanDefinition={buildPlanDefinition()}
            />
        );

        expect(screen.queryByText("Próximo pago")).not.toBeInTheDocument();
    });

    it("no muestra el importe mensual cuando no hay plan actual resuelto", () => {
        renderWithTheme(<MembershipCurrentPlanHero status={buildStatus()} currentPlanDefinition={null} />);

        expect(screen.queryByText("Importe mensual")).not.toBeInTheDocument();
    });
});
