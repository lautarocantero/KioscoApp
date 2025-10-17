import { Button, Grid } from "@mui/material";
import PrimaryButton from "./PrimaryButton";

const LoginSideForm = () => {
  return (
    <Grid sx={{}} display={"flex"} flexDirection={"column"} gap={3}>
      <PrimaryButton />
      <Button>Registrarse</Button>
    </Grid>
  );
};

export default LoginSideForm;
