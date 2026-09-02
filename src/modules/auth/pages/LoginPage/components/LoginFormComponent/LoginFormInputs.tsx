import { Email } from "@mui/icons-material";
import { Box, InputAdornment, TextField, type Theme } from "@mui/material";
import type { LoginFormInputsInterface } from "../../../../../../typings/auth/authComponentTypes";
import { sharedSx } from "../../../../../shared/components/sharedSx/sharedSx";
import PasswordField from "../../../../../shared/components/PasswordField/PasswordField";

const LoginFormInputs = ({
  values,
  setFieldValue,
  errors,
}: LoginFormInputsInterface): React.ReactNode => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 2, md: 2 },
        alignItems: "center",
        width: { xs: "100%", sm: "70%", md: "90%", lg: "25em" },
      }}
    >
      <Box sx={{ width: "100%" }}>
        <TextField
          fullWidth
          name="email"
          onChange={({ target }) => setFieldValue("email", target.value)}
          label="E-mail"
          placeholder="stocko@gmail.com"
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
            inputLabel: {
              shrink: true,
              sx: { fontWeight: 600 },
            },
            htmlInput: {
              "aria-label": "E-mail",
            },
            formHelperText: {
              sx: { textAlign: "right" },
            },
          }}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        <PasswordField
          name="password"
          label="Contraseña"
          placeholder="Tu contraseña"
          value={values?.password}
          onChange={(value) => setFieldValue("password", value)}
          error={!!errors.password}
          helperText={errors?.password?.toString()}
          ariaLabel="Contraseña"
        />
      </Box>
    </Box>
  );
};

export default LoginFormInputs;
