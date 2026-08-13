import { Person, Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Grid, IconButton, InputAdornment, TextField, type Theme } from "@mui/material";
import { useState } from "react";
import type { RegisterFormInputsInterface } from "../../../../../typings/auth/authComponentTypes";
import { sharedSx } from "../../../../shared/components/sharedSx/sharedSx";


const RegisterFormInputs = ({
  values,
  errors,
  setFieldValue,
}: RegisterFormInputsInterface): React.ReactNode => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  return (
    <Grid container display="flex" flexDirection={"column"} gap={2}>
      <Grid
        container
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
      >
        <Grid component={"div"} sx={{ flex: 1, width: "100%" }}>
          <TextField
            fullWidth
            name="name"
            onChange={({ target }) => setFieldValue("name", target?.value)}
            placeholder="Usuario"
            type="text"
            value={values?.name}
            error={!!errors.name}
            helperText={errors?.name?.toString()}
            variant="outlined"
            sx={sharedSx}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: (theme: Theme) => theme?.palette?.primary?.main }} />
                  </InputAdornment>
                ),
              },
              formHelperText: { sx: { textAlign: "right" } },
            }}
          />
        </Grid>

        <Grid component={"div"} sx={{ flex: 1, width: "100%" }}>
          <TextField
            fullWidth
            value={values?.email}
            onChange={({ target }) => setFieldValue("email", target?.value)}
            type="email"
            name="email"
            placeholder="E-mail"
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
              formHelperText: { sx: { textAlign: "right" } },
            }}
            error={!!errors.email}
            helperText={errors?.email?.toString()}
          />
        </Grid>
      </Grid>

      <Grid component={"div"} width={"100%"}>
        <TextField
          fullWidth
          value={values?.password}
          onChange={({ target }) => setFieldValue("password", target?.value)}
          placeholder="Contraseña"
          aria-label="Contraseña"
          name="password"
          type={showPassword ? "text" : "password"}
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
            formHelperText: { sx: { textAlign: "right" } },
          }}
          error={!!errors.password}
          helperText={errors?.password?.toString()}
        />
      </Grid>

      <Grid component={"div"} width={"100%"}>
        <TextField
          fullWidth
          value={values?.repeatPassword}
          placeholder="Repite la Contraseña"
          name="repeatPassword"
          onChange={({ target }) => setFieldValue("repeatPassword", target?.value)}
          type={showRepeatPassword ? "text" : "password"}
          variant="outlined"
          sx={sharedSx}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock
                    sx={{
                      color: (theme: Theme) =>
                        errors.repeatPassword ? theme?.palette?.error?.main : theme?.custom?.darkWhite,
                    }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowRepeatPassword((prev) => !prev)} edge="end">
                    {showRepeatPassword ? (
                      <VisibilityOff
                        sx={{
                          color: (theme: Theme) =>
                            errors.repeatPassword ? theme?.palette?.error?.main : theme?.custom?.darkWhite,
                        }}
                      />
                    ) : (
                      <Visibility
                        sx={{
                          color: (theme: Theme) =>
                            errors.repeatPassword ? theme?.palette?.error?.main : theme?.custom?.darkWhite,
                        }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
            formHelperText: { sx: { textAlign: "right" } },
          }}
          error={!!errors.repeatPassword}
          helperText={errors?.repeatPassword?.toString()}
        />
      </Grid>
    </Grid>
  );
};

export default RegisterFormInputs;