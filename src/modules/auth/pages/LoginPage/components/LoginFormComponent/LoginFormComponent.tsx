import { Grid } from '@mui/material'
import LoginFormHandler from './LoginFormHandler';

const LoginFormComponent = () => {
  
  return (
    <Grid
      container
      rowSpacing={15}
      sx={(theme) => ({
        display: { xs: 'flex', md: 'flex' },
        flexDirection: { md: 'column' },
        alignItems: { xs: 'center', md: 'center' },
        width: { xs: '100%', sm: '90%', md: '80%' },
        justifyContent: 'center',
        margin: 'auto',
        padding: '3em 0',
        borderRadius: { xs: '0', md: '1em' },
        backgroundColor: {
          xs: 'transparent',
          md: theme.custom?.backgroundDark || 'rgba(0,0,0,0.6)', // Fallback opcional
        },
      })}
      >
        <LoginFormHandler />
      </Grid>
  )
}

export default LoginFormComponent
