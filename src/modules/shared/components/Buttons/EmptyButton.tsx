import { Button, type Theme } from "@mui/material";
import type { EmptyButtonProps } from "../../../typings/ui/uiModules";


const EmptyButton = ({
  buttonText,
  buttonOnClick,
  buttonWidth = "280px",
}: EmptyButtonProps): React.ReactNode => {
  return (
    <Button
      sx={{
        backgroundColor: "transparent",
        color: (theme: Theme) => theme?.custom?.fontColorTransparent,
        width: buttonWidth,
        borderRadius: 35,
        padding: 1,
        textTransform: "none",
        fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
      }}
      onClick={buttonOnClick}
      role="button"
    >
      {buttonText}
    </Button>
  );
};

export default EmptyButton;
