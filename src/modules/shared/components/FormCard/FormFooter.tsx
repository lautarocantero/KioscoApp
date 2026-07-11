import type { FormCardFooterProps } from "@typings/shared/reactComponents";
import NavButtons from "../Buttons/NavButtons";
import ApiErrorComponent from "./ApiError";

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

            {showButtons && <NavButtons SubmitText={submitText ?? ""} backPath={backPath} />}
            {readOnly    && <NavButtons readOnly backPath={backPath} />}
        </>
    );
};

export default FormFooter;