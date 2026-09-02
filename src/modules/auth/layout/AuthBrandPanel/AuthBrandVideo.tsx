import { Box } from "@mui/material";
import type { AuthBrandVideoProps } from "@typings/auth/authComponentTypes";
import { getAuthBrandVideoUrl } from "../../helpers/getAuthBrandVideoUrl";

const AuthBrandVideo = ({ onEnded, onContextMenu }: AuthBrandVideoProps): React.ReactNode => {
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
      }}
    />
  );
};

export default AuthBrandVideo;
