import { Button } from "@mui/material";

interface PrimaryButtonProps {
  buttonText: string;
  buttonOnClick: () => void;
}

const PrimaryButton = ({buttonText, buttonOnClick} : PrimaryButtonProps) => {
  return (
    <Button
      sx={{
        backgroundColor: theme => theme?.palette?.primary?.main,
        color: theme => theme?.custom?.white,
        width: '280px',
        borderRadius: 35,
        padding: 1,
        textTransform: 'none',
        fontSize: theme => theme?.typography?.body1?.fontSize,
      }}
      onClick={buttonOnClick}
    >
      {buttonText}
    </Button>
  );
};

export default PrimaryButton;
