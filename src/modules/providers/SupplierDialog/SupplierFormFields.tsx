import { Box, TextField, type Theme } from "@mui/material";
import type { SupplierFormFieldsProps } from "@typings/providers/providerComponentTypes";


const textFieldSx = (theme: Theme) => ({
    "& .MuiInputLabel-root": { color: theme?.custom?.translucidWhite },
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: theme?.custom?.translucidWhite },
        "&:hover fieldset": { borderColor: theme?.custom?.translucidWhite },
        "&.Mui-focused fieldset": { borderColor: theme?.custom?.translucidWhite },
    },
});

const SupplierFormFields = ({
    supplierName, supplierEmail, supplierPhone,
    isLoading,
    onNameChange, onEmailChange, onPhoneChange,
}: SupplierFormFieldsProps): React.ReactNode => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
            autoFocus fullWidth
            label="Nombre del proveedor"
            placeholder="Ej: Distribuidora XYZ"
            value={supplierName}
            onChange={(e) => onNameChange(e.target.value)}
            disabled={isLoading}
            variant="outlined"
            sx={textFieldSx}
        />
        <TextField
            fullWidth
            label="Email (opcional)"
            placeholder="contacto@proveedor.com"
            type="email"
            value={supplierEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            disabled={isLoading}
            variant="outlined"
            sx={textFieldSx}
        />
        <TextField
            fullWidth
            label="Teléfono (opcional)"
            placeholder="+54 11 1234-5678"
            value={supplierPhone}
            onChange={(e) => onPhoneChange(e.target.value)}
            disabled={isLoading}
            variant="outlined"
            sx={textFieldSx}
        />
    </Box>
);

export default SupplierFormFields;