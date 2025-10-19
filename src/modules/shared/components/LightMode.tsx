import { Brightness4, ModeNight } from "@mui/icons-material"
import { Grid } from "@mui/system"

const LightMode = () => {
  return (
    <Grid 
        container
        display={'flex'}
        alignItems={'center'}
        sx={{ 
            backgroundColor: theme => theme.custom?.blackTranslucid || 'rgba(0,0,0,0.6)',
            padding: '0.2em 0.5em',
            borderRadius: '1em',
            gap: 1,
            cursor: 'pointer',
        }} 
    >
        <Brightness4 sx={{ color: theme => theme?.custom?.blackTranslucid}}/>
        <ModeNight sx={{ color: theme => theme?.custom?.white}}/>
    </Grid>
  )
}

export default LightMode
