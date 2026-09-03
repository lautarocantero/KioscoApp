import { describe, it, expect, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { MembershipBillingPeriodEnum } from "@typings/membership/membershipEnums";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import BillingPeriodToggle from "../../components/BillingPeriodToggle";

describe("BillingPeriodToggle", () => {
    it("marca 'Mensual' como seleccionado cuando value es Monthly", () => {
        renderWithTheme(<BillingPeriodToggle value={MembershipBillingPeriodEnum.Monthly} onChange={vi.fn()} />);

        expect(screen.getByTestId("membership-billing-period-monthly")).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByTestId("membership-billing-period-semiannual")).toHaveAttribute("aria-pressed", "false");
    });

    it("llama a onChange con Semiannual al clickear '6 meses'", () => {
        const onChange = vi.fn();
        renderWithTheme(<BillingPeriodToggle value={MembershipBillingPeriodEnum.Monthly} onChange={onChange} />);

        fireEvent.click(screen.getByTestId("membership-billing-period-semiannual"));

        expect(onChange).toHaveBeenCalledWith(MembershipBillingPeriodEnum.Semiannual);
    });

    it("no llama a onChange al clickear el período ya seleccionado (exclusive)", () => {
        const onChange = vi.fn();
        renderWithTheme(<BillingPeriodToggle value={MembershipBillingPeriodEnum.Monthly} onChange={onChange} />);

        fireEvent.click(screen.getByTestId("membership-billing-period-monthly"));

        expect(onChange).not.toHaveBeenCalled();
    });
});
