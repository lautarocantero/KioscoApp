import { Button } from "@mui/material";

const PrimaryButton = () => {
  return (
    <Button
      sx={{
        backgroundColor: "#0386EE",
        color: "#FFFFFF",
        width: 300,
        borderRadius: 35,
        padding: 1.5,
        fontSize: 16,
      }}
    >
      iniciar sesión
    </Button>
  );
};

export default PrimaryButton;
