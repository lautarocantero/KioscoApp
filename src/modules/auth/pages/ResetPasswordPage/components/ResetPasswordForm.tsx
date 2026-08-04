import { Box } from "@mui/material";
import type { ResetPasswordFormInterface } from "@typings/auth/authComponentTypes";
import ResetPasswordInputs from "./ResetPasswordInputs";
import ResetPasswordError from "./ResetPasswordError";
import ResetPasswordButtons from "./ResetPasswordButtons";


const ResetPasswordForm = ({ 
    handleSubmit, 
    values, 
    setFieldValue, 
    errors, 
    isSubmitting, 
    errorMessage, 
    status 
}: ResetPasswordFormInterface) => {


    return (
        <Box
            component="form"
            role="form"
            onSubmit={handleSubmit}
            sx={{
                width: { xs: "90%" },
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                gap: 2,
            }}
        >
            <ResetPasswordInputs values={values} setFieldValue={setFieldValue} errors={errors} />
            
            <ResetPasswordError status={status} errorMessage={errorMessage} />

            <ResetPasswordButtons errors={errors} isSubmitting={isSubmitting} />
        </Box>
    );
};

export default ResetPasswordForm;