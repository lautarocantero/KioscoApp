import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Grid } from "@mui/system";
import { useState } from "react";

interface RegisterFormInputsProps {
  values: {
    user: string;
    email: string;
    password: string;
    repeatPassword: string;
  };
  setFieldValue: (field: string, value: string) => void;
  errors: {
    user?: string;
    email?: string;
    password?: string;
    repeatPassword?: string;
  };
}

const RegisterFormInputs = ({
  values,
  errors,
  setFieldValue,
}: RegisterFormInputsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <Grid container display="flex" flexDirection={"column"} gap={2}>
      <Grid container display={"flex"} flexDirection={"row"} gap={2}>
        <Grid spacing={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            name="user"
            onChange={({ target }) => setFieldValue("user", target?.value)}
            placeholder="Jhon"
            type="text"
            value={values?.user}
            label="Usuario"
            error={!!errors.user}
            helperText={errors?.user?.toString()}
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

        <Grid spacing={{ xs: 12, sm: 6 }}>
          <TextField
            label="E-mail"
            value={values?.email}
            onChange={({ target }) => setFieldValue("email", target?.value)}
            type="email"
            placeholder="JhonDoe@gmail.com"
            variant="standard"
            slotProps={{
              formHelperText: {
                sx: {
                  textAlign: "right",
                },
              },
            }}
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
          type={!showPassword ? "text" : "password"}
          variant="standard"
          slotProps={{
            formHelperText: {
              sx: {
                textAlign: "right",
              },
            },
          }}
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
                  onClick={() => setShowRepeatPassword((prev) => !prev)}
                  edge="end"
                >
                  {showRepeatPassword ? (
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
          error={!!errors.repeatPassword}
          helperText={errors?.repeatPassword?.toString()}
          fullWidth
        />
      </Grid>
    </Grid>
  );
};

export default RegisterFormInputs;
