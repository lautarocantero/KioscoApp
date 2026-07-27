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
    backText,
}: FormCardFooterProps): React.ReactNode => {

    if (readOnly) {
        return (
            <>
                <ApiErrorComponent submitError={submitError} stepErrors={stepErrors} />
                <FormNavButtons readOnly defaultBack={defaultBack} backText={backText} />
            </>
        );
    }

    if (showButtons) {
        return (
            <>
                <ApiErrorComponent submitError={submitError} stepErrors={stepErrors} />
                <FormNavButtons SubmitText={submitText ?? ""} defaultBack={defaultBack} backText={backText} />
            </>
        );
    }

    return <ApiErrorComponent submitError={submitError} stepErrors={stepErrors} />;
};

export default FormFooter;