import { API_URL } from "../../../config/api";
import { createHttpClient } from "../../shared/api/httpClient";
import { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import type {
    CreateMembershipCheckoutResult,
    MembershipPlanDefinition,
    MembershipStatus,
} from "@typings/membership/membershipTypes";
import {
    CreateMembershipCheckoutResultSchema,
    MembershipPlanListSchema,
    MembershipStatusSchema,
} from "../schema/membershipApiSchema";

const baseUrl = createHttpClient(`${API_URL}/membership`);

/*══════════════════════════════════════════════════════════════════════════╗
║ 📥 GET                                                                    ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const getMembershipPlansRequest = async (): Promise<MembershipPlanDefinition[]> => {
    const response = await baseUrl.get("/plans");
    return MembershipPlanListSchema.parse(response.data);
};

export const getMembershipStatusRequest = async (): Promise<MembershipStatus> => {
    const response = await baseUrl.get("/status");
    return MembershipStatusSchema.parse(response.data);
};

/*══════════════════════════════════════════════════════════════════════════╗
║ 📤 POST                                                                   ║
╚══════════════════════════════════════════════════════════════════════════╝*/

export const createMembershipCheckoutRequest = async (plan: KioscoPlanEnum): Promise<CreateMembershipCheckoutResult> => {
    const response = await baseUrl.post("/checkout", { plan });
    return CreateMembershipCheckoutResultSchema.parse(response.data);
};
