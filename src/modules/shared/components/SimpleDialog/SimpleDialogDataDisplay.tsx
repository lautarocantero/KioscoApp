import { Grid, Typography, type Theme } from "@mui/material";


const SimpleDialogDataDisplay = ({data, label, icon}: {data: string, label: string, icon?: React.ReactNode}) => {
    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'row'}
        >
            <Grid>
                <Typography>{label}</Typography>
            </Grid>
            <Grid  
                display={'inline-block'}
                sx={(theme: Theme) => ({
                    alignItems: 'center',
                    backgroundColor: theme?.custom?.backgroundDark,
                    borderRadius: '1em',
                    display: 'flex',
                    justifyContent: 'center',
                    p:0.5,
                    margin: "0em 0.3em",
                    minWidth:'3em',
                    textAlign: 'center',
                })}
            > 
                <Typography
                  component="span"
                  sx={{ display: 'inline-flex', alignItems: 'center' }}
                >
                  {icon}
                  {data}
                </Typography>
             </Grid> 
        </Grid>
    )
}

export default SimpleDialogDataDisplay;
