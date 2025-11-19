import { Grid, Typography, type Theme } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';


export const AppbarSearch = (): React.ReactNode => {
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
                <Typography sx={{ ml: '20px'}}>Coca cola...</Typography>
                <SearchIcon sx={{ fontSize: '1em', mr: '20px'}}/>
        </Grid>
    )
}