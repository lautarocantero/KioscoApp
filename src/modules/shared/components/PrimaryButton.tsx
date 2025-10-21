import { Button } from "@mui/material";

interface PrimaryButtonProps {
  buttonText: string;
  buttonOnClick: () => void;
  buttonWidth?: string;
  buttonType?: 'button' | 'reset' | 'submit';
  buttonColor?: 'default' | 'error';
}

const PrimaryButton = ({
  buttonText, 
  buttonOnClick, 
  buttonWidth = '280px', 
  buttonType = 'button',
  buttonColor = 'default'} : PrimaryButtonProps) => {
  return (
    <Button
      sx={{
        backgroundColor: theme => buttonColor === 'default' ? theme?.palette?.primary?.main : theme?.palette?.error?.main ,
        color: theme => theme?.custom?.white,
        mt: '1.5em',
        width: buttonWidth,
        borderRadius: 35,
        padding: 1,
        textTransform: 'none',
        fontSize: theme => theme?.typography?.body1?.fontSize,
      }}
      onClick={buttonOnClick}
      type={buttonType}
    >
      {buttonText}
    </Button>
  );
};

export default PrimaryButton;
