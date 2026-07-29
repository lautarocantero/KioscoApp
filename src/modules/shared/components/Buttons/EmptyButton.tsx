import { Button, type Theme } from "@mui/material";
import type { EmptyButtonProps } from "@typings/ui/buttons.types";
import type { ReactNode } from "react";


const EmptyButton = ({
  buttonText,
  buttonOnClick,
  buttonWidth = "280px",
  color = "default",
}: EmptyButtonProps): ReactNode => {
  return (
    <Button
      sx={{
        backgroundColor: "transparent",
        color: (theme: Theme) =>
          color === "main"
            ? theme?.palette?.primary?.main
            : theme?.custom?.translucidFontColor,
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