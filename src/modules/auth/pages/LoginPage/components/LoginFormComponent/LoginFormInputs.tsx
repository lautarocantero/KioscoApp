import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, TextField, type Theme } from "@mui/material";
import { useState } from "react";
import type { LoginFormInputsInterface } from "../../../../../../typings/auth/authComponentTypes";
import { sharedSx } from "../../../../../shared/components/sharedSx/sharedSx";

const LoginFormInputs = ({
  values,
  setFieldValue,
  errors,
}: LoginFormInputsInterface): React.ReactNode => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Grid
      container
      display={"flex"}
      direction={"column"}
      spacing={{ xs: 2, md: 2 }}
      alignItems={"center"}
      width={{ xs: "100%", sm: "70%", md: "90%", lg: "25em" }}
    >
      <Grid component={"div"} width={"100%"}>
        <TextField
          fullWidth
          name="email"
          onChange={({ target }) => setFieldValue("email", target.value)}
          placeholder="E-mail"
          type="email"
          value={values?.email}
          error={!!errors.email}
          helperText={errors?.email?.toString()}
          variant="outlined"
          sx={sharedSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: (theme: Theme) => theme?.palette?.primary?.main }} />
                </InputAdornment>
              ),
            },
            formHelperText: {
              sx: { textAlign: "right" },
            },
          }}
        />
      </Grid>

      <Grid component={"div"} width={"100%"}>
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          name="password"
          value={values?.password}
          onChange={({ target }) => setFieldValue("password", target.value)}
          error={!!errors.password}
          helperText={errors?.password?.toString()}
          variant="outlined"
          sx={sharedSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock
                    sx={{
                      color: (theme: Theme) =>
                        errors.password ? theme?.palette?.error?.main : theme?.custom?.darkWhite,
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                    {showPassword ? (
                      <VisibilityOff
                        sx={{
                          color: (theme: Theme) =>
                            errors.password ? theme?.palette?.error?.main : theme?.custom?.darkWhite,
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          color: (theme: Theme) =>
                            errors.password ? theme?.palette?.error?.main : theme?.custom?.darkWhite,
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
            formHelperText: {
              sx: { textAlign: "right" },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default LoginFormInputs;