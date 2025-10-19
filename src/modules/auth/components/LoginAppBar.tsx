import { AppBar, Toolbar, Typography } from "@mui/material"
import { Grid } from "@mui/system"
import LightMode from "../../shared/components/LightMode"

const LoginAppBar = () => {
  return (
    <AppBar position='fixed' color='transparent' elevation={0} sx={{ width: '50%'}}>
        <Toolbar>
          <Grid blackTranslucid
            container 
            display={'flex'}
            flexDirection={'row'}
            
            alignItems={'center'}
            width={'100%'} 
            sx={(theme) => ({ 
                    color: theme.custom?.white,
                    justifyContent: { xs: 'flex-end', md: 'space-between' }
            })}
          >
            <Grid 
                display={{ xs: 'none', md: 'flex' }} 
                flexDirection={'row'} 
                gap={2}
            >
                <Typography 
                    sx={{ 
                        fontSize: theme => theme?.typography?.caption?.fontSize,
                        textDecoration: 'underline',
                    }}>
                        Inicio de sesión
                </Typography>
                <Typography sx={{ fontSize: theme => theme?.typography?.caption?.fontSize}}>Registro</Typography>
            </Grid>
            <LightMode />
          </Grid>
        </Toolbar>
      </AppBar>
  )
}

export default LoginAppBar
