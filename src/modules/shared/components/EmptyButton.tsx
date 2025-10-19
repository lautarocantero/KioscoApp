import { Button } from "@mui/material";

interface EmptyButtonProps {
  buttonText: string;
  buttonOnClick: () => void;
}

const EmptyButton = ({buttonText, buttonOnClick} : EmptyButtonProps) => {
  return (
    <Button
      sx={{
        backgroundColor: 'none',
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

export default EmptyButton;
