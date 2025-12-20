import { Grid, Typography, type Theme } from "@mui/material";

interface ModeButtonComponentInterface {
    functionAction: () => void,
    text: string,
    icon: React.ReactNode,
}

const ModeButtonComponent = ({functionAction, text, icon}: ModeButtonComponentInterface):React.ReactNode => {

    return (
        <Grid
            container
            onClick={() => functionAction()}
            sx={(theme: Theme) => ({
                display: 'flex',
                flexDirection: 'column',
                color: theme?.custom?.fontColor,
            })}
        >
            {icon}
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: theme?.typography?.body2?.fontSize,
                    textAlign: 'center',
                })}
            >
                {text}
            </Typography>
        </Grid>
    )
}

export default ModeButtonComponent;