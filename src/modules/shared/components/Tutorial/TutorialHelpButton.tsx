import { IconButton, type Theme } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useTranslation } from "react-i18next";
import type { TutorialHelpButtonProps } from "@typings/tutorial/props";
import { useTutorialContext } from "@hooks/tutorial/useTutorialContext";
import { useCurrentRouteTutorial } from "@hooks/tutorial/useCurrentRouteTutorial";

// Ícono para volver a ver un tutorial. Se puede usar de dos formas:
// - Con `tutorialId`/`steps` explícitos (embebido, ej. header de
//   /select-kiosco, que no vive dentro de AppShell).
// - Sin props (uso genérico en AppShell): se autorresuelve por ruta activa
//   vía useCurrentRouteTutorial y no renderiza nada si la ruta no tiene
//   tutorial registrado.
const TutorialHelpButton = ({ tutorialId, steps }: TutorialHelpButtonProps): React.ReactNode => {
    const { t } = useTranslation();
    const { start } = useTutorialContext();
    const currentRouteTutorial = useCurrentRouteTutorial();

    const resolvedTutorialId = tutorialId ?? currentRouteTutorial?.tutorialId;
    const resolvedSteps = steps ?? currentRouteTutorial?.steps;

    if (!resolvedTutorialId || !resolvedSteps || resolvedSteps.length === 0) return null;

    return (
        <IconButton
            onClick={() => start(resolvedTutorialId, resolvedSteps)}
            aria-label={t("tutorial.helpButtonLabel")}
            sx={(theme: Theme) => ({
                bgcolor: theme.custom.background,
                border: "0.5px solid",
                borderColor: theme.custom.darkGray,
            })}
        >
            <HelpOutlineOutlinedIcon sx={(theme: Theme) => ({ color: theme.custom.fontColor })} />
        </IconButton>
    );
};

export default TutorialHelpButton;
