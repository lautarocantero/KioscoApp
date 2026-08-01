import { Grid } from "@mui/material";
import PrimaryButton from "../../../../../shared/components/Buttons/PrimaryButtonComponent";
import { useNavigate } from "react-router-dom";
import type { FormToggleButtonInterface } from "../../../../../../typings/auth/authComponentTypes";
import EmptyButton from "../../../../../shared/components/Buttons/EmptyButton";


const InitialFormButtons = ({ setShowForm }: FormToggleButtonInterface): React.ReactNode => {
  const handleNavigate = useNavigate();
  
  return (
    <Grid 
      component={"div"} 
      display={"flex"} 
      flexDirection={"column"} 
      alignItems={'center'}
      gap={3}
    >
      <PrimaryButton
        buttonText={"Iniciar sesión"}
        buttonOnClick={() => {
          setShowForm?.(true);
        }}
        buttonWidth={{xs: "15em", md: '10em'}}
        padding={0.3}
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
