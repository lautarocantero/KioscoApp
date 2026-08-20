import type { ReactNode } from "react";
import { Box, Chip, List, ListItem, ListItemIcon, ListItemText, Typography, type Theme } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useTranslation } from "react-i18next";
import { KioscoPlanEnum } from "@typings/membership/membershipEnums";
import type { MembershipPlanCardProps } from "@typings/membership/membershipComponentTypes";
import PrimaryButtonComponent from "../../shared/components/Buttons/PrimaryButtonComponent";
import { formatMembershipPrice } from "../helpers/formatMembershipPrice";

const PLAN_ICONS: Record<KioscoPlanEnum, ReactNode> = {
    [KioscoPlanEnum.Stocko]: <Inventory2OutlinedIcon fontSize="small" />,
    [KioscoPlanEnum.SuperStocko]: <DiamondOutlinedIcon fontSize="small" />,
    [KioscoPlanEnum.MaxiStocko]: <WorkspacePremiumIcon fontSize="small" />,
};

const MembershipPlanCard = ({ plan, isCurrent, isSubmitting, onSelect }: MembershipPlanCardProps): React.ReactNode => {
    const { t } = useTranslation();
    const planName = t(`membership.plans.names.${plan.id}`);

    return (
        <Box
            component="article"
            aria-labelledby={`membership-plan-${plan.id}-heading`}
            sx={(theme: Theme) => ({
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                flex: 1,
                minWidth: 220,
                border: "1px solid",
                borderColor: plan.isPopular ? theme.custom.darkMain : theme.custom.darkGray,
                borderRadius: "12px",
                padding: 2.5,
                backgroundColor: theme.custom.lightBackground,
                boxShadow: plan.isPopular ? `0 0 0 1px ${theme.custom.darkMain}` : "none",
            })}
        >
            {plan.isPopular && (
                <Chip
                    label={t("membership.plans.popularBadge")}
                    size="small"
                    sx={(theme: Theme) => ({
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: theme.custom.darkMain,
                        color: theme.custom.white,
                        fontWeight: 600,
                    })}
                />
            )}

            <Box sx={(theme: Theme) => ({ color: theme.custom.darkMain })}>{PLAN_ICONS[plan.id]}</Box>

            <Typography id={`membership-plan-${plan.id}-heading`} component="h4" variant="h6" sx={(theme: Theme) => ({ color: theme.custom.fontColor })}>
                {planName}
            </Typography>

            <Typography component="p" sx={(theme: Theme) => ({ color: theme.custom.fontColor })}>
                <Typography component="span" variant="h4" sx={{ fontWeight: 700 }}>
                    {formatMembershipPrice(plan.price, plan.currency_id)}
                </Typography>
                <Typography component="span" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor })}>
                    {t("membership.plans.perMonth")}
                </Typography>
            </Typography>

            <List dense disablePadding sx={{ flex: 1 }}>
                {plan.featureKeys.map((featureKey) => (
                    <ListItem key={featureKey} disableGutters sx={{ alignItems: "flex-start", py: 0.5 }}>
                        <ListItemIcon sx={(theme: Theme) => ({ minWidth: 28, color: theme.custom.darkSecondary, mt: "2px" })}>
                            <CheckCircleOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={t(featureKey)}
                            slotProps={{ primary: { sx: (theme: Theme) => ({ color: theme.custom.fontColor, fontSize: "0.9rem" }) } }}
                        />
                    </ListItem>
                ))}
            </List>

            <PrimaryButtonComponent
                buttonText={isCurrent ? t("membership.plans.currentPlanButton") : t("membership.plans.selectButton", { planName })}
                buttonOnClick={() => onSelect(plan.id)}
                buttonWidth="100%"
                disabled={isCurrent || isSubmitting}
                dataTestId={`membership-select-${plan.id}`}
            />
        </Box>
    );
};

export default MembershipPlanCard;
