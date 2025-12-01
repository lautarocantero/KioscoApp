import { Grid } from "@mui/material";
import type { RegisterFormButtonsInterface } from "../../../../../typings/auth/authComponentTypes";
import PrimaryButton from "../../../../shared/components/Buttons/PrimaryButton";

const RegisterFormButtons = ({ errors }: RegisterFormButtonsInterface): React.ReactNode => {
  return (
    <Grid
      sx={{
        mt: '1em',
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <PrimaryButton
        buttonText="Registrarse"
        buttonType="submit"
        buttonOnClick={() => {}}
        buttonWidth={{ xs: "100%", sm: "50%", md: "40%" }}
        buttonColor={Object.keys(errors).length === 0 ? "default" : "error"}
        padding={0.1}
      />
    </Grid>
  );
};

export default RegisterFormButtons;
