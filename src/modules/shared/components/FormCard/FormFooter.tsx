import type { FormCardFooterProps } from "@typings/shared/reactComponents";
import ApiErrorComponent from "./ApiError";
import FormNavButtons from "../Buttons/FormNavButtons";

const FormFooter = ({
    stepErrors,
    submitError,
    showButtons,
    readOnly,
    submitText,
    defaultBack,
}: FormCardFooterProps): React.ReactNode => {

    return (
        <>
            <ApiErrorComponent submitError={submitError} stepErrors={stepErrors} />

            {showButtons && <FormNavButtons SubmitText={submitText ?? ""} defaultBack={defaultBack} />}
            {readOnly && (
                <FormNavButtons
                    readOnly
                    defaultBack={defaultBack}
                />
            )}
        </>
    );
};

export default FormFooter;