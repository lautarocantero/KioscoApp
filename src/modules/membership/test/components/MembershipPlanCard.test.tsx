import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { KioscoPlanEnum, MembershipBillingPeriodEnum } from "@typings/membership/membershipEnums";
import type { MembershipPlanPricing, MembershipPlanWithFeatures } from "@typings/membership/membershipTypes";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import MembershipPlanCard from "../../components/MembershipPlanCard";

const buildPlan = (overrides: Partial<MembershipPlanWithFeatures> = {}): MembershipPlanWithFeatures => ({
    id: KioscoPlanEnum.Deluxe,
    name: "Stocko Deluxe",
    price: 15000,
    currency_id: "ARS",
    featureKeys: ["membership.features.deluxeSellers", "membership.features.deluxeKioscos"],
    isPopular: true,
    ...overrides,
});

const monthlyPricing = (overrides: Partial<MembershipPlanPricing> = {}): MembershipPlanPricing => ({
    period: MembershipBillingPeriodEnum.Monthly,
    monthlyEquivalent: 15000,
    totalForTerm: null,
    savingsForTerm: null,
    ...overrides,
});

describe("MembershipPlanCard", () => {
    it("muestra el nombre del plan, sus features y el badge de 'Más elegido' cuando es popular", () => {
        renderWithTheme(
            <MembershipPlanCard
                plan={buildPlan()}
                pricing={monthlyPricing()}
                billingPeriod={MembershipBillingPeriodEnum.Monthly}
                isCurrent={false}
                isSubmitting={false}
                onSelect={vi.fn()}
            />
        );

        expect(screen.getByText("Stocko Deluxe")).toBeInTheDocument();
        expect(screen.getByText("Más elegido")).toBeInTheDocument();
        expect(screen.getByText("Miembros ilimitados")).toBeInTheDocument();
    });

    it("no muestra el badge cuando el plan no es popular", () => {
        renderWithTheme(
            <MembershipPlanCard
                plan={buildPlan({ isPopular: false })}
                pricing={monthlyPricing()}
                billingPeriod={MembershipBillingPeriodEnum.Monthly}
                isCurrent={false}
                isSubmitting={false}
                onSelect={vi.fn()}
            />
        );

        expect(screen.queryByText("Más elegido")).not.toBeInTheDocument();
    });

    it("llama a onSelect con el id del plan al hacer click", () => {
        const onSelect = vi.fn();
        renderWithTheme(
            <MembershipPlanCard
                plan={buildPlan()}
                pricing={monthlyPricing()}
                billingPeriod={MembershipBillingPeriodEnum.Monthly}
                isCurrent={false}
                isSubmitting={false}
                onSelect={onSelect}
            />
        );

        fireEvent.click(screen.getByTestId("membership-select-deluxe"));

        expect(onSelect).toHaveBeenCalledWith(KioscoPlanEnum.Deluxe);
    });

    it("deshabilita el botón y muestra 'Plan actual' cuando isCurrent es true", () => {
        renderWithTheme(
            <MembershipPlanCard
                plan={buildPlan()}
                pricing={monthlyPricing()}
                billingPeriod={MembershipBillingPeriodEnum.Monthly}
                isCurrent
                isSubmitting={false}
                onSelect={vi.fn()}
            />
        );

        const button = screen.getByTestId("membership-select-deluxe");
        expect(button).toBeDisabled();
        expect(screen.getByText("Plan actual")).toBeInTheDocument();
    });

    it("no muestra el badge de término semestral cuando el período es Monthly", () => {
        renderWithTheme(
            <MembershipPlanCard
                plan={buildPlan()}
                pricing={monthlyPricing()}
                billingPeriod={MembershipBillingPeriodEnum.Monthly}
                isCurrent={false}
                isSubmitting={false}
                onSelect={vi.fn()}
            />
        );

        expect(screen.queryByText(/cada 6 meses/)).not.toBeInTheDocument();
    });

    it("muestra el precio semestral y el badge de ahorro cuando el período es Semiannual", () => {
        renderWithTheme(
            <MembershipPlanCard
                plan={buildPlan()}
                pricing={monthlyPricing({
                    period: MembershipBillingPeriodEnum.Semiannual,
                    monthlyEquivalent: 12750,
                    totalForTerm: 76500,
                    savingsForTerm: 13500,
                })}
                billingPeriod={MembershipBillingPeriodEnum.Semiannual}
                isCurrent={false}
                isSubmitting={false}
                onSelect={vi.fn()}
            />
        );

        expect(screen.getByText(/cada 6 meses/)).toBeInTheDocument();
    });
});
