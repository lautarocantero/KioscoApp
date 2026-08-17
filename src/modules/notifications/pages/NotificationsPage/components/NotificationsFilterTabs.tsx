import { Box, Chip, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { NotificationsFilterTabsProps } from "@typings/notifications/notificationComponentTypes";
import { NOTIFICATION_FILTER_LABEL_KEYS, NOTIFICATION_FILTER_OPTIONS } from "../../../helpers/notificationFilterOptions";

const NotificationsFilterTabs = ({ filter, counts, onChange }: NotificationsFilterTabsProps): React.ReactNode => {
    const { t } = useTranslation();

    return (
        <Box role="tablist" aria-label={t("notifications.title")} sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {NOTIFICATION_FILTER_OPTIONS.map((option) => {
                const isActive = filter === option;

                return (
                    <Chip
                        key={option}
                        role="tab"
                        aria-selected={isActive}
                        clickable
                        onClick={() => onChange(option)}
                        label={`${t(NOTIFICATION_FILTER_LABEL_KEYS[option])} (${counts[option]})`}
                        color={isActive ? "primary" : "default"}
                        variant={isActive ? "filled" : "outlined"}
                        sx={(theme: Theme) => ({
                            borderColor: theme.custom.darkGray,
                            color: isActive ? undefined : theme.custom.fontColor,
                        })}
                    />
                );
            })}
        </Box>
    );
};

export default NotificationsFilterTabs;
