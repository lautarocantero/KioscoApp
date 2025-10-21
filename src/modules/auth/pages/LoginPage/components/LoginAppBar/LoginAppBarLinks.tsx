import { Typography } from '@mui/material'
import { Grid } from '@mui/system'

const LoginAppBarLinks = () => {
  return (
    <Grid 
        component={'div'}
        display={{ xs: 'none', md: 'flex' }} 
        flexDirection={'row'} 
        gap={2}
        sx={{
          color: theme => theme?.custom?.fontColor
        }}
    >
        <Typography 
          sx={{ 
              fontSize: theme => theme?.typography?.caption?.fontSize,
              textDecoration: 'underline',
          }}>
            Inicio de sesión
        </Typography>
        <Typography 
          sx={{ 
            fontSize: theme => theme?.typography?.caption?.fontSize
          }}>
            Registro
        </Typography>
    </Grid>
  )
}

export default LoginAppBarLinks
