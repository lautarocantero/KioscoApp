import { Button, type Theme } from "@mui/material";
import type { PrimaryButtonComponentProps } from "@typings/ui/buttons.types";

const PrimaryButtonComponent = ({
  buttonText,
  buttonOnClick,
  buttonWidth = "280px",
  buttonType = "button",
  buttonColor = "default",
  dataTestId = 'default',
  padding = 1,
  marginTop = '1.5em',
  icon = null,
  disabled = false,
  fontSize = "body2",
  id,
}: PrimaryButtonComponentProps): React.ReactNode => {
  return (
    <Button
      id={id}
      sx={{
        backgroundColor: (theme: Theme) =>
          buttonColor === "default"
            ? theme?.palette?.primary?.main
            : theme?.palette?.error?.main,
        color: (theme: Theme) => theme?.custom?.white,
        mt: {xs:marginTop, md: '0'},
        width: buttonWidth,
        borderRadius: "0.4em",
        padding: padding,
        textTransform: "none",
        fontSize: (theme: Theme) => theme?.typography?.[fontSize]?.fontSize,
      }}
      onClick={buttonOnClick}
      type={buttonType}
      role="button"
      data-testid={dataTestId}
      disabled={disabled}
    >
      {icon}{buttonText}
    </Button>
  );
};

export default PrimaryButtonComponent;