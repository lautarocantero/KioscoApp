import { Box, List, ListItemButton, ListItemText, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { SettingsModalSidebarCategoryProps } from "@typings/settings/settingsComponentTypes";

const SettingsModalSidebarCategory = ({
  category,
  activeSection,
  onSelectSection,
}: SettingsModalSidebarCategoryProps): React.ReactNode => {
  const { t } = useTranslation();
  const headingId = `settings-category-${category.id}`;

  return (
    <Box component="section" aria-labelledby={headingId} sx={{ px: 1.5, mb: 2 }}>
      <Typography
        id={headingId}
        component="h3"
        variant="caption"
        sx={(theme: Theme) => ({
          display: "flex",
          alignItems: "center",
          gap: 1,
          color: theme.custom.translucidFontColor,
          fontWeight: 700,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          px: 1,
          mb: 0.5,
        })}
      >
        {category.icon}
        {t(category.label)}
      </Typography>

      <List component="ul" dense disablePadding aria-labelledby={headingId}>
        {category.sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <ListItemButton
              key={section.id}
              component="li"
              selected={isActive}
              aria-current={isActive ? "true" : undefined}
              onClick={() => onSelectSection(section.id)}
              sx={(theme: Theme) => ({
                borderRadius: "8px",
                mb: 0.25,
                color: isActive ? theme.custom.fontColor : theme.custom.translucidFontColor,
                "&.Mui-selected": {
                  backgroundColor: theme.custom.blackTranslucid,
                  "&:hover": { backgroundColor: theme.custom.blackTranslucid },
                },
              })}
            >
              <ListItemText
                primary={t(section.label)}
                slotProps={{ primary: { sx: { fontSize: "0.85rem", fontWeight: isActive ? 600 : 500 } } }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
};

export default SettingsModalSidebarCategory;
