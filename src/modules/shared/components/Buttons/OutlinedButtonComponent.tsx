import { Button, type Theme } from "@mui/material";
import type { OutlinedButtonComponentProps } from "@typings/ui/buttons.types";

const OutlinedButtonComponent = ({
  buttonText,
  buttonOnClick,
  buttonWidth = "280px",
  buttonType = "button",
  dataTestId = "default",
  icon = null,
  disabled = false,
  padding = 1,
  fontSize = "body2",
}: OutlinedButtonComponentProps): React.ReactNode => {
  return (
    <Button
      sx={{
        backgroundColor: "transparent",
        color: (theme: Theme) => theme?.custom?.white,
        borderColor: (theme: Theme) => theme?.custom?.darkGray,
        borderWidth: "1.5px",
        borderStyle: "solid",
        width: buttonWidth,
        borderRadius: "0.4em",
        padding: padding,
        textTransform: "none",
        gap: "0.5em",
        fontSize: (theme: Theme) => theme?.typography?.[fontSize]?.fontSize,
        "&:hover": {
          borderColor: (theme: Theme) => theme?.palette?.primary?.main,
          backgroundColor: (theme: Theme) => theme?.custom?.lightGray,
        },
      }}
      onClick={buttonOnClick}
      type={buttonType}
      role="button"
      data-testid={dataTestId}
      disabled={disabled}
    >
      {icon}
      {buttonText}
    </Button>
  );
};

export default OutlinedButtonComponent;
