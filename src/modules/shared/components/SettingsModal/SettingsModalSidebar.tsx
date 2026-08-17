import { Box, type Theme } from "@mui/material";
import SettingsModalSidebarCategory from "./SettingsModalSidebarCategory";
import type { SettingsModalSidebarProps } from "@typings/settings/settingsComponentTypes";

const SettingsModalSidebar = ({ categories, activeSection, onSelectSection }: SettingsModalSidebarProps): React.ReactNode => (
  <Box
    component="nav"
    aria-label="Categorías de ajustes"
    sx={(theme: Theme) => ({
      width: { xs: "100%", sm: 220 },
      flexShrink: 0,
      py: 2,
      overflowY: "auto",
      borderRight: { sm: `1px solid ${theme.custom.darkGray}` },
      borderBottom: { xs: `1px solid ${theme.custom.darkGray}`, sm: "none" },
    })}
  >
    {categories.map((category) => (
      <SettingsModalSidebarCategory
        key={category.id}
        category={category}
        activeSection={activeSection}
        onSelectSection={onSelectSection}
      />
    ))}
  </Box>
);

export default SettingsModalSidebar;
