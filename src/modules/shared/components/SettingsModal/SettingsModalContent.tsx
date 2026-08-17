import { Box } from "@mui/material";
import { SETTINGS_SECTION_COMPONENTS } from "../../../../config/SettingsCategories";
import type { SettingsModalContentProps } from "@typings/settings/settingsComponentTypes";

const SettingsModalContent = ({ activeSection }: SettingsModalContentProps): React.ReactNode => {
  const ActiveSection = SETTINGS_SECTION_COMPONENTS[activeSection];

  return (
    <Box sx={{ flex: 1, minWidth: 0, overflowY: "auto", p: { xs: 2.5, sm: 4 } }}>
      <ActiveSection />
    </Box>
  );
};

export default SettingsModalContent;
