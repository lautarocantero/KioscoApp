import { Button } from "@mui/material";

interface EmptyButtonProps {
  buttonText: string;
  buttonOnClick: () => void;
  buttonWidth?: string;
}

const EmptyButton = ({
  buttonText,
  buttonOnClick,
  buttonWidth = "280px",
}: EmptyButtonProps) => {
  return (
    <Button
      sx={{
        backgroundColor: "transparent",
        color: (theme) => theme?.custom?.fontColorTransparent,
        width: buttonWidth,
        borderRadius: 35,
        padding: 1,
        textTransform: "none",
        fontSize: (theme) => theme?.typography?.body1?.fontSize,
      }}
      onClick={buttonOnClick}
      role="button"
    >
      {buttonText}
    </Button>
  );
};

export default EmptyButton;
