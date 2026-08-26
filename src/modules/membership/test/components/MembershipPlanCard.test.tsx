import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import type { MembershipPlanWithFeatures } from "@typings/membership/membershipTypes";
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

describe("MembershipPlanCard", () => {
    it("muestra el nombre del plan, sus features y el badge de 'Más elegido' cuando es popular", () => {
        renderWithTheme(
            <MembershipPlanCard plan={buildPlan()} isCurrent={false} isSubmitting={false} onSelect={vi.fn()} />
        );

        expect(screen.getByText("Stocko Deluxe")).toBeInTheDocument();
        expect(screen.getByText("Más elegido")).toBeInTheDocument();
        expect(screen.getByText("Vendedores ilimitados")).toBeInTheDocument();
    });

    it("no muestra el badge cuando el plan no es popular", () => {
        renderWithTheme(
            <MembershipPlanCard plan={buildPlan({ isPopular: false })} isCurrent={false} isSubmitting={false} onSelect={vi.fn()} />
        );

        expect(screen.queryByText("Más elegido")).not.toBeInTheDocument();
    });

    it("llama a onSelect con el id del plan al hacer click", () => {
        const onSelect = vi.fn();
        renderWithTheme(
            <MembershipPlanCard plan={buildPlan()} isCurrent={false} isSubmitting={false} onSelect={onSelect} />
        );

        fireEvent.click(screen.getByTestId("membership-select-deluxe"));

        expect(onSelect).toHaveBeenCalledWith(KioscoPlanEnum.Deluxe);
    });

    it("deshabilita el botón y muestra 'Plan actual' cuando isCurrent es true", () => {
        renderWithTheme(
            <MembershipPlanCard plan={buildPlan()} isCurrent isSubmitting={false} onSelect={vi.fn()} />
        );

        const button = screen.getByTestId("membership-select-deluxe");
        expect(button).toBeDisabled();
        expect(screen.getByText("Plan actual")).toBeInTheDocument();
    });
});
