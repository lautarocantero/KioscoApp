
// # Componente: RegisterFormInputs  

// ## Descripción 📦
// Campos de entrada para el formulario de registro.  
// Renderiza inputs de usuario, email, contraseña y repetición de contraseña con validación y estilos personalizados.  

// ## Funciones 🔧
// - `RegisterFormInputs`: componente principal que muestra los campos del registro.  
//   - Recibe `values`, `errors` y `setFieldValue` desde `RegisterFormInputsInterface`.  
//   - `TextField username`: campo de texto para el nombre de usuario.  
//   - `TextField email`: campo de texto para el correo electrónico.  
//   - `TextField password`: campo de contraseña con ícono para alternar visibilidad (`Visibility` / `VisibilityOff`).  
//   - `TextField repeatPassword`: campo para repetir contraseña con ícono de alternancia.  
//   - Aplica estilos dinámicos con `Theme` para colores y subrayados.  

// ## Notas técnicas 💽
// - Usa `useState` para manejar visibilidad de contraseñas.  
// - Los errores se muestran con `helperText` y color de error en los íconos.  
// - Diseño responsivo con `Grid` y disposición en columnas/filas.  
//-----------------------------------------------------------------------------// 

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, type Theme } from "@mui/material";
import { Grid } from "@mui/system";
import { useState } from "react";
import type { RegisterFormInputsInterface } from "../../../../../typings/auth/authComponentTypes";

const RegisterFormInputs = (
  {
    values,
    errors,
    setFieldValue,
  }: RegisterFormInputsInterface): React.ReactNode  => {
    
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  return (
    <Grid container display="flex" flexDirection={"column"} gap={2}>
      <Grid container display={"flex"} flexDirection={"row"} gap={2}>
        <Grid spacing={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            name="username"
            onChange={({ target }) => setFieldValue("username", target?.value)}
            placeholder="Jhon"
            type="text"
            value={values?.username}
            label="Usuario"
            error={!!errors.username}
            helperText={errors?.username?.toString()}
            slotProps={{
              formHelperText: {
                sx: {
                  textAlign: "right",
                },
              },
            }}
            variant="standard"
            sx={(theme: Theme ) => ({
              input: { color: theme?.custom?.fontColor },
              label: { color: theme?.custom?.fontColor },
              "& .MuiFormHelperText-root": {
                color: theme?.custom?.fontColor,
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: theme?.custom?.fontColor,
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "white",
              },
            })}
          />
        </Grid>

        <Grid spacing={{ xs: 12, sm: 6 }}>
          <TextField
            label="E-mail"
            value={values?.email}
            onChange={({ target }) => setFieldValue("email", target?.value)}
            type="email"
            name="email"
            placeholder="JhonDoe@gmail.com"
            variant="standard"
            slotProps={{
              formHelperText: {
                sx: {
                  textAlign: "right",
                },
              },
            }}
            sx={(theme: Theme ) => ({
              input: { color: theme?.custom?.fontColor },
              label: { color: theme?.custom?.fontColor },
              "& .MuiFormHelperText-root": {
                color: theme?.custom?.fontColor,
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: theme?.custom?.fontColor,
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "white",
              },
            })}
            error={!!errors.email}
            helperText={errors?.email?.toString()}
            fullWidth
          />
        </Grid>
      </Grid>

      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        gap={2}
        spacing={{ xs: 12 }}
      >
        <TextField
          label="Contraseña"
          value={values?.password}
          onChange={({ target }) => setFieldValue("password", target?.value)}
          placeholder="Contraseña"
          name="password"
          type={!showPassword ? "text" : "password"}
          variant="standard"
          slotProps={{
            formHelperText: {
              sx: {
                textAlign: "right",
              },
            },
          }}
          sx={(theme: Theme ) => ({
            input: { color: theme?.custom?.fontColor },
            label: { color: theme?.custom?.fontColor },
            "& .MuiFormHelperText-root": {
              color: theme?.custom?.fontColor,
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: theme?.custom?.fontColor,
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "white",
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff
                      sx={{
                        color: (theme: Theme ) =>
                          errors.password
                            ? theme?.palette?.error?.main
                            : theme?.custom?.fontColor,
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        color: (theme: Theme ) =>
                          errors.password
                            ? theme?.palette?.error?.main
                            : theme?.custom?.fontColor,
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.password}
          helperText={errors?.password?.toString()}
          fullWidth
        />
      </Grid>

      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        gap={2}
        spacing={{ xs: 12 }}
      >
        <TextField
          label="Repite la Contraseña"
          value={values?.repeatPassword}
          placeholder="Repite la Contraseña"
          name="repeatPassword"
          onChange={({ target }) =>
            setFieldValue("repeatPassword", target?.value)
          }
          type={!showRepeatPassword ? "text" : "password"}
          variant="standard"
          slotProps={{
            formHelperText: {
              sx: {
                textAlign: "right",
              },
            },
          }}
          sx={(theme: Theme ) => ({
            input: { color: theme?.custom?.fontColor },
            label: { color: theme?.custom?.fontColor },
            "& .MuiFormHelperText-root": {
              color: theme?.custom?.fontColor,
            },
            "& .MuiInput-underline:before": {
              borderBottomColor: theme?.custom?.fontColor,
            },
            "& .MuiInput-underline:hover:before": {
              borderBottomColor: "white",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "white",
            },
          })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowRepeatPassword((prev) => !prev)}
                  edge="end"
                >
                  {showRepeatPassword ? (
                    <VisibilityOff
                      sx={{
                        color: (theme: Theme ) =>
                          errors.password
                            ? theme?.palette?.error?.main
                            : theme?.custom?.fontColor,
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        color: (theme: Theme ) =>
                          errors.password
                            ? theme?.palette?.error?.main
                            : theme?.custom?.fontColor,
                      }}
                    />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          error={!!errors.repeatPassword}
          helperText={errors?.repeatPassword?.toString()}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default RegisterFormInputs;
