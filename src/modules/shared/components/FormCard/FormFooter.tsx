import type { FormCardFooterProps } from "@typings/shared/reactComponents";
import ApiErrorComponent from "./ApiError";
import FormNavButtons from "../Buttons/FormNavButtons";

const FormFooter = ({
    stepErrors,
    submitError,
    showButtons,
    readOnly,
    submitText,
    backPath,
}: FormCardFooterProps): React.ReactNode => {

    return (
        <>
            <ApiErrorComponent submitError={submitError} stepErrors={stepErrors} />

            {showButtons && <FormNavButtons SubmitText={submitText ?? ""} backPath={backPath} />}
            {readOnly    && <FormNavButtons readOnly backPath={backPath} />}
        </>
    );
};

export default FormFooter;