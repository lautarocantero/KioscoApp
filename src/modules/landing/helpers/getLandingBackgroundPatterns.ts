import type { Theme } from "@mui/material";
import { getPublicAssetUrl } from "../../shared/helpers/getPublicAssetUrl";

const HERO_BACKGROUND_IMAGE_SRC = getPublicAssetUrl("images/backgroundImages/background-landing.png");

// El hero muestra la imagen de marca (violeta); el resto de las secciones
// pasan a fondo blanco del theme para marcar la transición de color pedida.
export const getHeroBackgroundImageSx = (theme: Theme) => ({
  backgroundColor: theme.palette.primary.dark,
  backgroundImage: `url(${HERO_BACKGROUND_IMAGE_SRC})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

export const getWhiteSectionBackgroundSx = (theme: Theme) => ({
  backgroundColor: theme.palette.common.white,
});
