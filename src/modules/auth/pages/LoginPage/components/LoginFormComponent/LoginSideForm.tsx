import { Grid } from "@mui/material";
import PrimaryButton from "../../../../../shared/components/PrimaryButton";
import EmptyButton from "../../../../../shared/components/EmptyButton";

const LoginSideForm = () => {
  return (
    <Grid component={'div'} display={"flex"} flexDirection={"column"} gap={3}>
      <PrimaryButton 
        buttonText={'Iniciar sesión'}
        buttonOnClick={() => {}}
      />
      <EmptyButton 
        buttonText={'Registrarse'}
        buttonOnClick={() => {}}
      />
    </Grid>
  );
};

export default LoginSideForm;
