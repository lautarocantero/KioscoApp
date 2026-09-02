import { Box } from "@mui/material";
import type { AuthBrandVideoProps } from "@typings/auth/authComponentTypes";
import { FADE_TRANSITION_MS } from "@hooks/auth/useAuthBrandVideo";
import { getAuthBrandVideoUrl } from "../../helpers/getAuthBrandVideoUrl";

const FADE_TRANSITION = `${FADE_TRANSITION_MS}ms ease`;

const AuthBrandVideo = ({ isFading, onEnded, onContextMenu }: AuthBrandVideoProps): React.ReactNode => {
  return (
    <Box
      component="video"
      src={getAuthBrandVideoUrl()}
      aria-hidden="true"
      autoPlay
      muted
      playsInline
      disablePictureInPicture
      tabIndex={-1}
      onEnded={onEnded}
      onContextMenu={onContextMenu}
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        pointerEvents: "none",
        userSelect: "none",
        opacity: isFading ? 0 : 1,
        transition: `opacity ${FADE_TRANSITION}`,
      }}
    />
  );
};

export default AuthBrandVideo;
