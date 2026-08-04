import PasswordField from "../../../../shared/components/PasswordField/PasswordField";
import type { ResetPasswordInputsInterface } from "@typings/auth/authComponentTypes";

const ResetPasswordInputs = ({ values, setFieldValue, errors }: ResetPasswordInputsInterface) => {
    return (
        <>
            <PasswordField
                name="newPassword"
                placeholder="Nueva contraseña"
                value={values?.newPassword}
                onChange={(value) => setFieldValue("newPassword", value)}
                error={!!errors.newPassword}
                helperText={errors?.newPassword?.toString()}
                ariaLabel="Nueva contraseña"
            />

            <PasswordField
                name="repeatNewPassword"
                placeholder="Repetí la nueva contraseña"
                value={values?.repeatNewPassword}
                onChange={(value) => setFieldValue("repeatNewPassword", value)}
                error={!!errors.repeatNewPassword}
                helperText={errors?.repeatNewPassword?.toString()}
                ariaLabel="Repetir nueva contraseña"
            />
        </>
    );
};

export default ResetPasswordInputs;