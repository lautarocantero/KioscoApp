import { Box, Typography, type Theme } from "@mui/material";
import { alpha, keyframes } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useTutorialContext } from "@hooks/tutorial/useTutorialContext";
import { useViewportHeight } from "@hooks/ui/useViewportHeight";
import { getTutorialDockLayout } from "../../helpers/getTutorialDockLayout";
import { getPublicAssetUrl } from "../../helpers/getPublicAssetUrl";

const tutorialFadeIn = keyframes`from { opacity: 0 } to { opacity: 1 }`;
const tutorialRise = keyframes`from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) }`;

const TITLE_ID = "tutorial-overlay-title";
const BODY_ID = "tutorial-overlay-body";

// Overlay del tutorial: scrim + spotlight sobre el target del paso activo
// + dock (mascota + globo de texto) abajo a la derecha. Puro presentacional
// — todo el estado viene de useTutorialContext(). Replica el patrón visual
// del mock de referencia ("Tutorial Select Kiosco.dc.html"), 100% con
// tokens del theme (sin colores inventados, regla 4 de CLAUDE.md).
const TutorialOverlay = (): React.ReactNode => {
    const { t } = useTranslation();
    const { steps, stepIndex, running, rect, next, prev, skip } = useTutorialContext();
    const viewportHeight = useViewportHeight();

    if (!running) return null;

    const currentStep = steps[stepIndex];
    if (!currentStep) return null;

    const hasTarget = Boolean(rect);
    const isLastStep = stepIndex >= steps.length - 1;
    const { bubbleWidth, mascotSize } = getTutorialDockLayout(viewportHeight);

    return (
        <Box
            role="dialog"
            aria-modal="true"
            aria-labelledby={TITLE_ID}
            aria-describedby={BODY_ID}
            sx={{ position: "fixed", inset: 0, zIndex: 1200, animation: `${tutorialFadeIn} 0.3s ease both` }}
        >
            {!hasTarget && (
                <Box
                    aria-hidden="true"
                    sx={(theme: Theme) => ({
                        position: "absolute",
                        inset: 0,
                        backgroundColor: alpha(theme.custom.black, 0.74),
                    })}
                />
            )}

            {hasTarget && rect && (
                <Box
                    aria-hidden="true"
                    sx={(theme: Theme) => {
                        const restShadow = `0 0 0 9999px ${alpha(theme.custom.black, 0.74)}, 0 0 0 2px ${theme.palette.primary.main}, 0 0 26px 6px ${alpha(theme.palette.primary.main, 0.35)}`;
                        const peakShadow = `0 0 0 9999px ${alpha(theme.custom.black, 0.74)}, 0 0 0 2px ${theme.palette.primary.main}, 0 0 34px 12px ${alpha(theme.palette.primary.main, 0.55)}`;
                        const tutorialPulse = keyframes`
                            0%, 100% { box-shadow: ${restShadow}; }
                            50% { box-shadow: ${peakShadow}; }
                        `;
                        return {
                            position: "absolute",
                            top: rect.top,
                            left: rect.left,
                            width: rect.width,
                            height: rect.height,
                            borderRadius: `${currentStep.radius ?? 8}px`,
                            pointerEvents: "none",
                            animation: `${tutorialPulse} 2s ease-in-out infinite`,
                            boxShadow: restShadow,
                        };
                    }}
                />
            )}

            <Box
                component="button"
                type="button"
                onClick={skip}
                sx={(theme: Theme) => ({
                    position: "absolute",
                    top: 24,
                    right: 24,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "36px",
                    padding: "0 14px",
                    border: "1px solid",
                    borderColor: alpha(theme.custom.white, 0.22),
                    borderRadius: "0.4em",
                    backgroundColor: alpha(theme.custom.white, 0.06),
                    color: theme.custom.white,
                    fontFamily: "inherit",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    backdropFilter: "blur(4px)",
                })}
            >
                {t("tutorial.skipButton")}
                <Box
                    component="span"
                    sx={(theme: Theme) => ({
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        backgroundColor: alpha(theme.custom.white, 0.12),
                        color: alpha(theme.custom.white, 0.75),
                    })}
                >
                    Esc
                </Box>
            </Box>

            <Box
                sx={{
                    position: "absolute",
                    right: "32px",
                    bottom: "24px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    animation: `${tutorialRise} 0.35s ease both`,
                }}
            >
                <Box
                    component="section"
                    sx={(theme: Theme) => ({
                        width: bubbleWidth,
                        padding: mascotSize < 150 ? "18px 20px" : "22px 24px",
                        borderRadius: "16px",
                        border: "0.5px solid",
                        borderColor: alpha(theme.custom.white, 0.1),
                        backgroundColor: theme.custom.lightBackground,
                        boxShadow: `0 18px 48px ${alpha(theme.custom.black, 0.55)}`,
                        marginBottom: `${Math.round(mascotSize * 0.3)}px`,
                        marginRight: "-18px",
                    })}
                >
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", mb: "10px" }}>
                        <Typography
                            component="span"
                            sx={(theme: Theme) => ({
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                color: theme.palette.primary.main,
                            })}
                        >
                            {t("tutorial.stepCounter", { current: stepIndex + 1, total: steps.length })}
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "row", gap: "5px" }} aria-hidden="true">
                            {steps.map((step, index) => (
                                <Box
                                    key={step.id}
                                    sx={(theme: Theme) => ({
                                        width: index === stepIndex ? "18px" : "6px",
                                        height: "6px",
                                        borderRadius: "999px",
                                        backgroundColor:
                                            index === stepIndex ? theme.palette.primary.main : alpha(theme.custom.white, 0.22),
                                        transition: "width 0.25s ease, background-color 0.25s ease",
                                    })}
                                />
                            ))}
                        </Box>
                    </Box>

                    <Typography
                        id={TITLE_ID}
                        component="h3"
                        sx={(theme: Theme) => ({ fontSize: "1.15rem", fontWeight: 700, m: "0 0 8px", color: theme.custom.fontColor })}
                    >
                        {t(currentStep.titleKey)}
                    </Typography>
                    <Typography
                        id={BODY_ID}
                        component="p"
                        sx={(theme: Theme) => ({
                            fontSize: "0.9rem",
                            lineHeight: 1.55,
                            m: "0 0 18px",
                            color: theme.custom.darkWhite,
                        })}
                    >
                        {t(currentStep.bodyKey, currentStep.bodyOptions)}
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                        <Box
                            component="button"
                            type="button"
                            onClick={prev}
                            sx={(theme: Theme) => ({
                                height: "36px",
                                padding: "0 14px",
                                border: "1px solid",
                                borderColor: theme.custom.darkGray,
                                borderRadius: "0.4em",
                                backgroundColor: "transparent",
                                color: theme.custom.darkWhite,
                                fontFamily: "inherit",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                cursor: "pointer",
                                visibility: stepIndex === 0 ? "hidden" : "visible",
                            })}
                        >
                            {t("tutorial.prevLabel")}
                        </Box>
                        <Box
                            component="button"
                            type="button"
                            onClick={next}
                            sx={(theme: Theme) => ({
                                height: "36px",
                                padding: "0 20px",
                                border: "none",
                                borderRadius: "0.4em",
                                backgroundColor: theme.palette.primary.main,
                                color: theme.custom.white,
                                fontFamily: "inherit",
                                fontSize: "0.8rem",
                                fontWeight: 600,
                                cursor: "pointer",
                            })}
                        >
                            {t(isLastStep ? "tutorial.finishLabel" : "tutorial.nextLabel")}
                        </Box>
                    </Box>
                </Box>

                <Box
                    component="img"
                    src={getPublicAssetUrl("images/stocko_images/stocko-mascot.png")}
                    alt=""
                    draggable={false}
                    sx={(theme: Theme) => ({
                        width: mascotSize,
                        height: mascotSize,
                        objectFit: "contain",
                        filter: `drop-shadow(0 12px 28px ${alpha(theme.custom.black, 0.5)})`,
                        pointerEvents: "none",
                        userSelect: "none",
                    })}
                />
            </Box>
        </Box>
    );
};

export default TutorialOverlay;
