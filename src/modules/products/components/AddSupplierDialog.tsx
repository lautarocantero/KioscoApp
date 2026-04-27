import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    CircularProgress,
    Typography,
    type Theme,
} from "@mui/material";

interface Supplier {
    id: string;
    name: string;
}

interface AddSupplierDialogProps {
    open: boolean;
    onClose: () => void;
    onSupplierCreated: (supplier: Supplier) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const AddSupplierDialog = ({
    open,
    onClose,
    onSupplierCreated,
}: AddSupplierDialogProps): React.ReactNode => {
    const [supplierName, setSupplierName] = useState("");
    const [supplierEmail, setSupplierEmail] = useState("");
    const [supplierPhone, setSupplierPhone] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClose = () => {
        setSupplierName("");
        setSupplierEmail("");
        setSupplierPhone("");
        setError(null);
        onClose();
    };

    const handleSubmit = async () => {
        if (!supplierName.trim()) {
            setError("El nombre del proveedor es requerido");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const body = {
                name: supplierName.trim(),
                email: supplierEmail.trim() || undefined,
                phone: supplierPhone.trim() || undefined,
            };

            const response = await fetch(`${API_BASE_URL}/providers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.message ?? `Error ${response.status}`);
            }

            const data: { _id: string; name: string } = await response.json();

            // Llamar al callback con el nuevo proveedor
            onSupplierCreated({
                id: data._id,
                name: data.name,
            });

            handleClose();
        } catch (err) {
            console.error("❌ Error al crear proveedor:", err);
            setError(
                err instanceof Error
                    ? err.message
                    : "Error inesperado al crear el proveedor"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={(theme: Theme) => ({
                    borderBottom: `0.5px solid rgba(255,255,255,0.08)`,
                    pb: 2,
                })}
            >
                Agregar nuevo proveedor
            </DialogTitle>

            <DialogContent sx={{ pt: 2.5 }}>
                {error && (
                    <Box
                        sx={{
                            mb: 2,
                            p: 1.5,
                            backgroundColor: "rgba(244, 67, 54, 0.1)",
                            borderRadius: "8px",
                            border: "1px solid rgba(244, 67, 54, 0.3)",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{ color: "#F44336" }}
                        >
                            {error}
                        </Typography>
                    </Box>
                )}

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Nombre del proveedor"
                        placeholder="Ej: Distribuidora XYZ"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        disabled={isLoading}
                        variant="outlined"
                        sx={(theme: Theme) => ({
                            "& .MuiInputLabel-root": {
                                color: theme?.custom?.fontColorTransparent,
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: theme?.custom?.fontColorTransparent,
                                },
                                "&:hover fieldset": {
                                    borderColor: theme?.custom?.fontColorTransparent,
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: theme?.custom?.fontColorTransparent,
                                },
                            },
                        })}
                    />

                    <TextField
                        fullWidth
                        label="Email (opcional)"
                        placeholder="contacto@proveedor.com"
                        type="email"
                        value={supplierEmail}
                        onChange={(e) => setSupplierEmail(e.target.value)}
                        disabled={isLoading}
                        variant="outlined"
                        sx={(theme: Theme) => ({
                            "& .MuiInputLabel-root": {
                                color: theme?.custom?.fontColorTransparent,
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: theme?.custom?.fontColorTransparent,
                                },
                                "&:hover fieldset": {
                                    borderColor: theme?.custom?.fontColorTransparent,
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: theme?.custom?.fontColorTransparent,
                                },
                            },
                        })}
                    />

                    <TextField
                        fullWidth
                        label="Teléfono (opcional)"
                        placeholder="+54 11 1234-5678"
                        value={supplierPhone}
                        onChange={(e) => setSupplierPhone(e.target.value)}
                        disabled={isLoading}
                        variant="outlined"
                        sx={(theme: Theme) => ({
                            "& .MuiInputLabel-root": {
                                color: theme?.custom?.fontColorTransparent,
                            },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                    borderColor: theme?.custom?.fontColorTransparent,
                                },
                                "&:hover fieldset": {
                                    borderColor: theme?.custom?.fontColorTransparent,
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: theme?.custom?.fontColorTransparent,
                                },
                            },
                        })}
                    />
                </Box>
            </DialogContent>

            <DialogActions
                sx={(theme: Theme) => ({
                    borderTop: `0.5px solid rgba(255,255,255,0.08)`,
                    pt: 2,
                    pb: 2,
                    px: 3,
                })}
            >
                <Button
                    onClick={handleClose}
                    disabled={isLoading}
                    sx={(theme: Theme) => ({
                        textTransform: "none",
                        borderColor: theme?.custom?.fontColorTransparent,
                        color: theme?.custom?.fontColorTransparent,
                    })}
                >
                    Cancelar
                </Button>

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        backgroundColor: "#0386EE",
                        "&:disabled": {
                            backgroundColor: "rgba(3, 134, 238, 0.5)",
                        },
                    }}
                >
                    {isLoading ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <CircularProgress size={16} color="inherit" />
                            Creando...
                        </Box>
                    ) : (
                        "Crear proveedor"
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddSupplierDialog;
