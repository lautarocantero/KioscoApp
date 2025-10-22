import { Grid } from "@mui/system"
import PrimaryButton from "../../../../../shared/components/PrimaryButton"
import EmptyButton from "../../../../../shared/components/EmptyButton"
import { Button, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"

interface LoginFormButtonsProps {
  errors: {
        email?: string;
        password?: string;
    };
}

const LoginFormButtons = ({errors}: LoginFormButtonsProps ) => {
  return (
    <Grid container direction="column" spacing={2} sx={{ mt: 2 }} alignItems={'center'}>
        <Grid component={'div'} width={'100%'}>
            <PrimaryButton 
                buttonText="Continuar" 
                buttonOnClick={() => {}}
                buttonWidth="100%"
                buttonType='submit'
                buttonColor={Object.keys(errors).length === 0 ? 'default' : 'error'}
            />
        </Grid>
        <Grid component={'div'}>
          <Typography
            sx={{
                color: theme => theme?.custom?.fontColor,
                fontSize: theme => theme?.typography?.body2?.fontSize,
                textAlign: 'center',
                margin:  2,
            }}
          >
            Conectar con
          </Typography>
        </Grid>
        <Grid container display={'flex'} flexDirection={'row'} justifyContent={'center'}>
            <Grid component={'div'}>
              <Button 
                  sx={{ 
                      backgroundColor: theme => theme?.palette?.error?.main,
                      borderRadius: '35px',
                      color: theme => theme?.custom?.white,
                      fontSize: theme => theme?.typography?.body2?.fontSize,
                      textTransform:'none',
                      fontWeight: 'bold',
                  }}
              >
                  <Google sx={{fontSize: theme => theme?.typography?.body1?.fontSize, mr: 1}}/>
                  Google
              </Button>
            </Grid>
        </Grid>
          <Grid component={'div'} width={'100%'}>
              <EmptyButton
                buttonText="Crear cuenta" 
                buttonOnClick={() => {}}
                buttonWidth="100%"
              />
          </Grid>
    </Grid>
  )
}

export default LoginFormButtons
