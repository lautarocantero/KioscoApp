import { Box, Chip, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { KioscoPlanStatusEnum } from "@typings/membership/membershipEnums";
import type { MembershipCurrentPlanSummaryProps } from "@typings/membership/membershipComponentTypes";
import { formatDate } from "../../../utils/formatter/formatDate";

const STATUS_COLOR: Record<KioscoPlanStatusEnum, "success" | "warning" | "default"> = {
    [KioscoPlanStatusEnum.Active]: "success",
    [KioscoPlanStatusEnum.PendingPayment]: "warning",
    [KioscoPlanStatusEnum.Cancelled]: "default",
};

const MembershipCurrentPlanSummary = ({ status }: MembershipCurrentPlanSummaryProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box
            sx={(theme: Theme) => ({
                display: "flex",
                flexWrap: "wrap",
                gap: 3,
                border: "1px solid",
                borderColor: theme.custom.darkGray,
                borderRadius: "12px",
                padding: 2,
                marginBottom: 3,
            })}
        >
            <Box>
                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                    {t("membership.currentPlan.planLabel")}
                </Typography>
                <Typography sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 600 })}>
                    {t(`membership.plans.names.${status.plan}`)}
                </Typography>
            </Box>

            <Box>
                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                    {t("membership.currentPlan.statusLabel")}
                </Typography>
                <Box>
                    <Chip
                        size="small"
                        color={STATUS_COLOR[status.plan_status]}
                        label={t(`membership.currentPlan.status.${status.plan_status}`)}
                    />
                </Box>
            </Box>

            {status.next_payment_date && (
                <Box>
                    <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                        {t("membership.currentPlan.nextPaymentLabel")}
                    </Typography>
                    <Typography sx={(theme: Theme) => ({ color: theme.custom.fontColor })}>
                        {formatDate(status.next_payment_date)}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default MembershipCurrentPlanSummary;
