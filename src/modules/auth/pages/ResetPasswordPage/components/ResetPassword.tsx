import { ResetPasswordStatusEnum } from "@typings/auth/authEnums";
import { useResetPasswordForm } from "../../../../../hooks/auth/useAuthForm";
import AskForLink from "./AskForLink";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetPasswordSuccess from "./ResetPasswordSuccess";

const ResetPassword = () => {
    const { formik, status, errorMessage, isSubmitting, hasToken, handleGoToLogin, handleGoToForgotPassword } = useResetPasswordForm();
    const { handleSubmit: formikSubmit, values, setFieldValue, errors } = formik;

    if (!hasToken) {
        return (
            <AskForLink
                hasToken={hasToken}
                errorMessage={errorMessage}
                handleGoToForgotPassword={handleGoToForgotPassword}
            />
        );
    }

    if (status === ResetPasswordStatusEnum.Success) {
        return (
            <ResetPasswordSuccess status={status} handleGoToLogin={handleGoToLogin} />
        );
    }

    return (
        <ResetPasswordForm
            handleSubmit={formikSubmit}
            values={values}
            setFieldValue={setFieldValue}
            errors={errors}
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
            status={status}
        />
    );
};

export default ResetPassword;