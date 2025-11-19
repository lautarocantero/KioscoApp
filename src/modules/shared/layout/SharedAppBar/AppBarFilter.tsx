import { Grid, Typography, type Theme } from "@mui/material"
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';


export const AppbarFilter = (): React.ReactNode => {
    return (
        <Grid
            sx={(theme: Theme) => ({
                alignItems: 'center',
                backgroundColor: theme?.custom?.backgroundDark,
                borderRadius: '1em',
                color: theme?.custom?.fontColor,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                maxHeight: '3em',
                width: '100%',
            })}>
                <ArrowDropDownCircleIcon sx={{ fontSize: '1em', ml: '15px' }}/>
                <Typography sx={{ mr: '20px', fontSize: '1em'}}>Tipo</Typography>
        </Grid>
    )
}

