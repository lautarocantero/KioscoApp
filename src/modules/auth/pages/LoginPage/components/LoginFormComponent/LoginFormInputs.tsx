import { Email } from "@mui/icons-material";
import { Grid, InputAdornment, TextField, type Theme } from "@mui/material";
import type { LoginFormInputsInterface } from "../../../../../../typings/auth/authComponentTypes";
import { sharedSx } from "../../../../../shared/components/sharedSx/sharedSx";
import PasswordField from "../../../../../shared/components/PasswordField/PasswordField";

const LoginFormInputs = ({
  values,
  setFieldValue,
  errors,
}: LoginFormInputsInterface): React.ReactNode => {
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
            htmlInput: {
              "aria-label": "E-mail",
            },
            formHelperText: {
              sx: { textAlign: "right" },
            },
          }}
        />
      </Grid>

      <Grid component={"div"} width={"100%"}>
        <PasswordField
          name="password"
          placeholder="Contraseña"
          value={values?.password}
          onChange={(value) => setFieldValue("password", value)}
          error={!!errors.password}
          helperText={errors?.password?.toString()}
          ariaLabel="Contraseña"
        />
      </Grid>
    </Grid>
  );
};

export default LoginFormInputs;