import { Grid } from "@mui/material"
import LoginAppBarLinks from "./LoginAppBarLinks"
import LightMode from "../../../../../shared/components/LightMode"

const LoginAppBarContent = () => {
  return (
    <Grid 
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
        <LoginAppBarLinks />
        <LightMode />
    </Grid>
  )
}

export default LoginAppBarContent
