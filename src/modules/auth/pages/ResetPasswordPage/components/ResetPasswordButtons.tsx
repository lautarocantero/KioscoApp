import { Grid } from "@mui/material";
import PrimaryButtonComponent from "../../../../shared/components/Buttons/PrimaryButtonComponent";
import type { ResetPasswordButtonsInterface } from "@typings/auth/authComponentTypes";


const ResetPasswordButtons = ({ errors, isSubmitting }: ResetPasswordButtonsInterface ) => {


    return (
        <Grid
            container
            display={"flex"}
            flexDirection={"column"}
            spacing={2}
            alignItems={"center"}
            sx={{ margin: "1.5em 0em 0em", width: "90%" }}
        >
            <PrimaryButtonComponent
                buttonText="Restablecer contraseña"
                buttonOnClick={() => {}}
                buttonWidth={{ xs: "100%", md: "100%" }}
                buttonType="submit"
                buttonColor={Object.keys(errors).length === 0 ? "default" : "error"}
                padding={1}
                disabled={isSubmitting}
            />
        </Grid>
    );
};

export default ResetPasswordButtons;