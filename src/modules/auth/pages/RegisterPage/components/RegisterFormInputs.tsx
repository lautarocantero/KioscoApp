import { Person, Email } from "@mui/icons-material";
import { Box, InputAdornment, TextField, type Theme } from "@mui/material";
import type { RegisterFormInputsInterface } from "../../../../../typings/auth/authComponentTypes";
import { sharedSx } from "../../../../shared/components/sharedSx/sharedSx";
import PasswordField from "../../../../shared/components/PasswordField/PasswordField";


const RegisterFormInputs = ({
  values,
  errors,
  setFieldValue,
}: RegisterFormInputsInterface): React.ReactNode => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <TextField
          fullWidth
          name="name"
          onChange={({ target }) => setFieldValue("name", target?.value)}
          label="Nombre completo"
          placeholder="Nombre y apellido"
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
            inputLabel: { shrink: true, sx: { fontWeight: 600 } },
            formHelperText: { sx: { textAlign: "right" } },
          }}
        />
      </Box>

      <Box sx={{ width: "100%" }}>
        <TextField
          fullWidth
          value={values?.email}
          onChange={({ target }) => setFieldValue("email", target?.value)}
          type="email"
          name="email"
          label="E-mail"
          placeholder="stocko@gmail.com"
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
            inputLabel: { shrink: true, sx: { fontWeight: 600 } },
            formHelperText: { sx: { textAlign: "right" } },
          }}
          error={!!errors.email}
          helperText={errors?.email?.toString()}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          width: "100%",
        }}
      >
        <Box sx={{ flex: 1, width: "100%" }}>
          <PasswordField
            name="password"
            label="Contraseña"
            placeholder="Mínimo 6 caracteres"
            value={values?.password}
            onChange={(value) => setFieldValue("password", value)}
            error={!!errors.password}
            helperText={errors?.password?.toString()}
            ariaLabel="Contraseña"
          />
        </Box>

        <Box sx={{ flex: 1, width: "100%" }}>
          <PasswordField
            name="repeatPassword"
            label="Repetir contraseña"
            placeholder="Repetí la contraseña"
            value={values?.repeatPassword}
            onChange={(value) => setFieldValue("repeatPassword", value)}
            error={!!errors.repeatPassword}
            helperText={errors?.repeatPassword?.toString()}
            ariaLabel="Repetir contraseña"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterFormInputs;
