import { Box, Typography, type Theme } from "@mui/material";
import type { SettingsInfoRowProps } from "@typings/settings/settingsComponentTypes";

const SettingsInfoRow = ({ label, value }: SettingsInfoRowProps): React.ReactNode => (
  <Box
    sx={(theme: Theme) => ({
      display: "flex",
      flexDirection: { xs: "column", sm: "row" },
      justifyContent: "space-between",
      gap: 0.5,
      py: 1.5,
      borderBottom: `1px solid ${theme.custom.darkGray}`,
    })}
  >
    <Typography component="span" sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, fontSize: "0.85rem" })}>
      {label}
    </Typography>
    <Typography component="span" sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 600, fontSize: "0.9rem" })}>
      {value}
    </Typography>
  </Box>
);

export default SettingsInfoRow;
