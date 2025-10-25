import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import AuthTitle from "./AuthTitle";

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

const LoginFormInputs = ({
  values,
  setFieldValue,
  errors,
}: LoginFormInputsProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Grid
      container
      display={"flex"}
      direction={"column"}
      spacing={3}
      alignItems={"center"}
    >
      <AuthTitle />
      <Grid component={"div"} spacing={{ xs: 12, sm: 12 }}>
        <TextField
          fullWidth
          name="email"
          onChange={({ target }) => {
            setFieldValue("email", target.value);
          }}
          placeholder="jhondoe@gmail.com"
          type="email"
          value={values?.email}
          label="E-mail"
          error={!!errors.email}
          helperText={errors?.email?.toString()}
          slotProps={{
            formHelperText: {
              sx: {
                textAlign: "right",
              },
            },
          }}
          variant="standard"
          sx={(theme) => ({
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
      <Grid component={"div"} spacing={{ xs: 12, sm: 12 }}>
        <TextField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          fullWidth
          name="password"
          value={values?.password}
          onChange={({ target }) => {
            setFieldValue("password", target.value);
          }}
          error={!!errors.password}
          helperText={errors?.password?.toString()}
          slotProps={{
            formHelperText: {
              sx: {
                textAlign: "right",
              },
            },
          }}
          variant="standard"
          sx={(theme) => ({
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
                        color: (theme) =>
                          errors.password
                            ? theme?.palette?.error?.main
                            : theme?.custom?.fontColor,
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        color: (theme) =>
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
        />
      </Grid>
    </Grid>
  );
};

export default LoginFormInputs;
