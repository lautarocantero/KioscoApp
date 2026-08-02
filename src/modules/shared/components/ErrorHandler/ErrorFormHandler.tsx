import { Grid, Typography, type Theme } from "@mui/material";
import type { FormErrorsHandlerInterface } from "../../../../typings/ui/uiErrors";


const ApiErrorsHandler = ({error} : FormErrorsHandlerInterface ): React.ReactNode => {

    if(!error) return (<></>);

    return (
        <Grid
            container
            sx={{
                width: "100%"
            }}
        >
            <Typography
                sx={(theme: Theme) => ({ 
                    color: theme?.palette.error.main,
                    fontSize: theme?.typography?.caption?.fontSize,
                    marginTop: '1em'
                })}
            >
                {error}
            </Typography>
        </Grid>
    )

}

export default ApiErrorsHandler;