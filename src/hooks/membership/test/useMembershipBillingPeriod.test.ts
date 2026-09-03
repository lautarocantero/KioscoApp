import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { MembershipBillingPeriodEnum } from "@typings/membership/membershipEnums";
import { useMembershipBillingPeriod } from "../useMembershipBillingPeriod";

describe("useMembershipBillingPeriod", () => {
    it("arranca en Monthly", () => {
        const { result } = renderHook(() => useMembershipBillingPeriod());

        expect(result.current.billingPeriod).toBe(MembershipBillingPeriodEnum.Monthly);
    });

    it("setBillingPeriod cambia el período expuesto", () => {
        const { result } = renderHook(() => useMembershipBillingPeriod());

        act(() => result.current.setBillingPeriod(MembershipBillingPeriodEnum.Semiannual));

        expect(result.current.billingPeriod).toBe(MembershipBillingPeriodEnum.Semiannual);
    });
});
