import { Box, Dialog, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import SettingsModalHeader from "./SettingsModalHeader";
import SettingsModalSidebar from "./SettingsModalSidebar";
import SettingsModalContent from "./SettingsModalContent";
import { useSettingsNavigation } from "./hooks/useSettingsNavigation";
import { SETTINGS_CATEGORIES } from "../../../../config/SettingsCategories";
import { getNoisyBackgroundSx } from "../NoisyBackground/NoisyBackground";
import type { SettingsModalProps } from "@typings/settings/settingsComponentTypes";

const SettingsModal = ({ open, onClose }: SettingsModalProps): React.ReactNode => {
  const { activeSection, setActiveSection } = useSettingsNavigation();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      aria-labelledby="settings-modal-title"
      slotProps={{
        paper: {
          sx: (theme: Theme) => ({
            border: "0.5px solid",
            borderColor: theme.custom.darkGray,
            borderRadius: "16px",
            minHeight: { xs: "70vh", sm: 520 },
            maxHeight: "85vh",
            boxShadow: `
              0 1px 3px ${alpha(theme.custom.black, 0.06)},
              4px 8px 16px ${alpha(theme.custom.black, 0.1)},
              8px 16px 28px ${alpha(theme.custom.black, 0.08)}
            `,
          }),
        },
      }}
    >
      {/* Cubre el Paper de punta a punta con el mismo fondo que ConfirmDialog:
          si el color se aplicara directo en el Paper, el overlay de elevación
          por default de MUI (más claro) quedaría encima y lo desteñiría. */}
      <Box
        sx={(theme: Theme) => ({
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minHeight: 0,
          color: theme.custom.fontColor,
          ...getNoisyBackgroundSx({ theme }),
        })}
      >
        <SettingsModalHeader onClose={onClose} />

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, flex: 1, minHeight: 0 }}>
          <SettingsModalSidebar categories={SETTINGS_CATEGORIES} activeSection={activeSection} onSelectSection={setActiveSection} />
          <SettingsModalContent activeSection={activeSection} />
        </Box>
      </Box>
    </Dialog>
  );
};

export default SettingsModal;
