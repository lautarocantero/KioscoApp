import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface LoginFormInputsProps {
    values: {
        email: string;
        password: string;
    };
    setFieldValue: (field: string, value: string) => void;
    errors: {
        email?: string;
        password?: string;
    };
}


const LoginFormInputs = ({values,setFieldValue,errors}: LoginFormInputsProps) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Grid container display={'flex'} direction={'column'} spacing={3} alignItems={'center'}>
        <Typography 
          sx={{ 
            color: theme => theme?.custom?.white,
            fontSize: theme => theme?.typography?.h3.fontSize,
          }}
        >
          Iniciar sesión
        </Typography>
        <Grid component={'div'} spacing={{xs:12,sm:12}} >
          <TextField
            fullWidth
            name="email"
            onChange={({ target }) => {
              setFieldValue('email', target.value);
            }}
            placeholder="E-mail"
            type="email" 
            value={values?.email}
            label="E-mail" 
            error={!!errors.email}
            helperText={(errors?.email)?.toString()}
            slotProps={{
              formHelperText: {
                sx: {
                  textAlign: 'right'
                },
              }
            }}     
            variant="standard"
            sx={(theme) => ({
              input: { color: 'white' },               // texto input
              label: { color: 'white' },               // label
              '& .MuiFormHelperText-root': {           // helperText
                color: 'white',
              },
              '& .MuiInput-underline:before': {         // underline sin foco
                borderBottomColor: theme?.custom?.white,
              },
              '& .MuiInput-underline:hover:before': {   // underline hover
                borderBottomColor: 'white',
              },
              '& .MuiInput-underline:after': {          // underline con foco
                borderBottomColor: 'white',
              },
            })}
          />
        </Grid>
        <Grid component={'div'} spacing={{xs:12,sm:12}}>
          <TextField
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            fullWidth
            name="password"
            value={values?.password}
            onChange={({ target }) => {
              setFieldValue('password', target.value);
            }}
            error={!!errors.password}
            helperText={(errors?.password)?.toString()}
            variant="standard"
            sx={(theme) => ({
              input: { color: 'white' },
              label: { color: 'white' },
              '& .MuiFormHelperText-root': { color: 'white', textAlign: 'right' },
              '& .MuiInput-underline:before': { borderBottomColor: theme?.custom?.white },
              '& .MuiInput-underline:hover:before': { borderBottomColor: 'white' },
              '& .MuiInput-underline:after': { borderBottomColor: 'white' },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    
                  >
                    {showPassword ? 
                    <VisibilityOff sx={{ color: theme => errors.password ? theme?.palette?.error?.main : theme?.custom?.white }} /> : 
                    <Visibility sx={{ color: theme => errors.password ? theme?.palette?.error?.main : theme?.custom?.white }}/>}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
  )
}

export default LoginFormInputs
