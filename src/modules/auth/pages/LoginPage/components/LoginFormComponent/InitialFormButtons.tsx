import { Grid } from "@mui/material";
import PrimaryButton from "../../../../../shared/components/PrimaryButton";
import EmptyButton from "../../../../../shared/components/EmptyButton";
import { useNavigate } from "react-router-dom";
import type { FormToggleButtonInterface } from "../../../../../../typings/auth/authComponentTypes";


const InitialFormButtons = ({ setShowForm }: FormToggleButtonInterface): React.ReactNode => {
  const handleNavigate = useNavigate();
  
  return (
    <Grid component={"div"} display={"flex"} flexDirection={"column"} gap={3}>
      <PrimaryButton
        buttonText={"Iniciar sesión"}
        buttonOnClick={() => {
          setShowForm?.(true);
        }}
        dataTestId='introduction-login-button'
      />
      <EmptyButton
        buttonText={"Registrarse"}
        buttonOnClick={() => {
          handleNavigate("/register");
        }}
      />
    </Grid>
  );
};

export default InitialFormButtons;
