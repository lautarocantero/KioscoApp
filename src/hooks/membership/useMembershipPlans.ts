import { useEffect, useState } from "react";
import type { MembershipPlanWithFeatures, UseMembershipPlansReturn } from "@typings/membership/membershipTypes";
import { getMembershipPlansRequest } from "../../modules/membership/api/membershipApi";
import { buildMembershipPlansWithFeatures } from "../../modules/membership/helpers/buildMembershipPlansWithFeatures";
import { useErrorParser } from "../shared/useErrorParser";

// Trae precio/moneda de los 3 tiers y les suma el copy de marketing local.
export const useMembershipPlans = (): UseMembershipPlansReturn => {
    const [plans, setPlans] = useState<MembershipPlanWithFeatures[]>([]);
    const [loading, setLoading] = useState(true);
    const { message: error, parseError, clearError } = useErrorParser();

    useEffect(() => {
        setLoading(true);
        clearError();

        getMembershipPlansRequest()
            .then((rawPlans) => setPlans(buildMembershipPlansWithFeatures(rawPlans)))
            .catch((err: unknown) => parseError(err, "No se pudieron cargar los planes de membresía"))
            .finally(() => setLoading(false));
    }, [parseError, clearError]);

    return { plans, loading, error };
};

export default useMembershipPlans;
