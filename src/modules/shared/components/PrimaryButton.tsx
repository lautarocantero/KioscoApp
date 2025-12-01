import { Button, type Theme } from "@mui/material";
import type { PrimaryButtonProps } from "../../../typings/ui/uiModules";

const PrimaryButton = ({
  buttonText,
  buttonOnClick,
  buttonWidth = "280px",
  buttonType = "button",
  buttonColor = "default",
  dataTestId = 'default',
}: PrimaryButtonProps): React.ReactNode => {
  return (
    <Button
      sx={{
        backgroundColor: (theme: Theme) =>
          buttonColor === "default"
            ? theme?.palette?.primary?.main
            : theme?.palette?.error?.main,
        color: (theme: Theme) => theme?.custom?.white,
        mt: "1.5em",
        width: buttonWidth,
        borderRadius: 35,
        padding: 1,
        textTransform: "none",
        fontSize: (theme: Theme) => theme?.typography?.body1?.fontSize,
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
