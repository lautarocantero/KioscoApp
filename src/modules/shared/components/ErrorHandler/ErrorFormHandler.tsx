import { Typography } from "@mui/material";
import type { FormErrorsHandlerInterface } from "../../../../typings/ui/uiErrors";


const FormErrorsHandler = ({errors} : {errors: FormErrorsHandlerInterface} ): React.ReactNode => {
    console.log('errors', errors);

    return (
        <>
            <Typography>FormErrorsHandler</Typography>
        </>
    )

}

export default FormErrorsHandler;