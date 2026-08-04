import { Typography, type Theme } from "@mui/material";
import type { ResetPasswordErrorInterface } from "@typings/auth/authComponentTypes";
import { ResetPasswordStatusEnum } from "@typings/auth/authEnums";


const ResetPasswordError = ({ status, errorMessage }: ResetPasswordErrorInterface) => {

    if(status == ResetPasswordStatusEnum.Success) return null;
    if(status == ResetPasswordStatusEnum.Idle) return null;


    return (
        <Typography
            sx={{
                color: (theme: Theme) => theme?.palette?.error?.main,
                fontSize: (theme: Theme) => theme?.typography?.caption?.fontSize,
            }}
        >
            {errorMessage}
        </Typography>
    );
};

export default ResetPasswordError;