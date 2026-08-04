import type { Theme } from "@mui/material";

/*══════════════════════════════════════════════╗
║ 🎨 linkCardSx                                  ║
╠══════════════════════════════════════════════╣
║ 📥 Entrada: theme, isDisabled                  ║
║ ⚙️ Proceso: arma el sx compartido entre el      ║
║    Link (card habilitada) y el Box (card        ║
║    deshabilitada), variando cursor/opacity/      ║
║    hover según isDisabled                        ║
║ 📤 Salida: SxProps                                ║
╚══════════════════════════════════════════════╝*/
export const linkCardSx = (theme: Theme, isDisabled: boolean) => ({
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    mb: 1.5,
    minHeight: "100px",
    borderRadius: "16px",
    overflow: "hidden",
    textDecoration: "none",
    backgroundColor: theme.custom.darkGray,
    border: `1px solid ${theme.custom.darkGray}44`,
    backdropFilter: "blur(8px)",
    ...(isDisabled
        ? {
            cursor: "not-allowed",
            opacity: 0.5,
            filter: "grayscale(0.4)",
        }
        : {
            cursor: "pointer",
            transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s ease, background-color 0.15s",
            "&:hover": {
                backgroundColor: theme.custom.darkMain,
                border: `1px solid ${theme.palette.primary.main}66`,
                transform: "translateY(-3px)",
                boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
            },
            "&:focus-visible": {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: "2px",
            },
            "&:hover .link-card-icon-box": {
                backgroundColor: theme.custom.white,
                color: theme.palette.primary.main,
            },
            "&:hover .link-card-description": {
                color: theme.custom.white,
            },
            "&:hover .link-card-value, &:hover .link-card-subtitle": {
                color: theme.custom.white,
            },
        }),
});

/*══════════════════════════════════════════════╗
║ 🎨 linkCardBadgeSx                             ║
╠══════════════════════════════════════════════╣
║ 📥 Entrada: theme                              ║
║ ⚙️ Proceso: posiciona el badge "Disponible      ║
║    pronto" en la esquina superior derecha de     ║
║    la card deshabilitada                          ║
║ 📤 Salida: SxProps                                 ║
╚══════════════════════════════════════════════╝*/
export const linkCardBadgeSx = (theme: Theme) => ({
    position: "absolute",
    top: "10px",
    right: "10px",
    px: "8px",
    py: "2px",
    borderRadius: "6px",
    fontSize: "0.62rem",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
    color: theme.custom.white,
    backgroundColor: `${theme.custom.darkMain}`,
    border: `1px solid ${theme.palette.primary.main}55`,
    lineHeight: 1.4,
    zIndex: 1,
});