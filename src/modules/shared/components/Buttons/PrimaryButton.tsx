import { Button, type Theme } from "@mui/material";
import type { PrimaryButtonProps } from "../../../../typings/ui/uiModules";

const PrimaryButton = ({
  buttonText,
  buttonOnClick,
  buttonWidth = "280px",
  buttonType = "button",
  buttonColor = "default",
  dataTestId = 'default',
  padding = 1,
}: PrimaryButtonProps): React.ReactNode => {
  return (
    <Button
      sx={{
        backgroundColor: (theme: Theme) =>
          buttonColor === "default"
            ? theme?.palette?.primary?.main
            : theme?.palette?.error?.main,
        color: (theme: Theme) => theme?.custom?.white,
        mt: {xs:"1.5em", md: '0'},
        width: buttonWidth,
        borderRadius: 35,
        padding: padding,
        textTransform: "none",
        fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
      }}
      onClick={buttonOnClick}
      type={buttonType}
      role="button"
      data-testid={dataTestId}
    >
      {buttonText}
    </Button>
  );
};

export default PrimaryButton;
