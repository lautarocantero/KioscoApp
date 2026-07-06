import { Box, Button, Typography, type Theme } from "@mui/material";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import { useFormikContext } from "formik";
import { useState } from "react";

const ImageUpload = (): React.ReactNode => {
    const { values, errors, setFieldValue } = useFormikContext<PresentationFormValues>();
    const [imagePreview, setImagePreview] = useState<string>("");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target?.result as string);
        reader.readAsDataURL(file);

        setFieldValue("image_file", file);
    };

    return (
        <Box 
            sx={{ 
                display: "flex", 
                flexDirection: "column", 
                gap: 1.5 , 
                borderRadius: 2, 
                p: 3 
            }}
        >
            <Typography sx={(theme: Theme) => ({
                fontSize: "0.9rem", fontWeight: 500,
                color: theme?.custom?.whiteDark,
            })}>
                Imagen del envase{" "}
                <Box component="span" sx={{ color: "#0386EE" }}>*</Box>
            </Typography>

            {imagePreview || values.image_url ? (
                <Box sx={{
                    width: "100%", height: 200, borderRadius: "8px", overflow: "hidden",
                    backgroundColor: "rgba(0,0,0,0.3)",
                    border: "0.5px solid rgba(3,134,238,0.30)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                    <img
                        src={imagePreview || values.image_url}
                        alt="Preview"
                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                    />
                </Box>
            ) : (
                <Box sx={{
                    width: "100%", height: 200, borderRadius: "8px",
                    border: "1.5px dashed rgba(3,134,238,0.30)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    backgroundColor: "rgba(3,134,238,0.05)",
                }}>
                    <Typography sx={(theme: Theme) => ({
                        fontSize: "0.85rem",
                        color: theme?.custom?.whiteDark,
                        opacity: 0.6,
                    })}>
                        Selecciona una imagen
                    </Typography>
                </Box>
            )}

            <Box component="label" sx={{ cursor: "pointer" }}>
                <input type="file" accept="image/*" onChange={handleImageChange} hidden />
                <Button component="span" variant="outlined" fullWidth
                    sx={(theme: Theme) => ({
                        textTransform: "none", fontWeight: 600,
                        borderColor: theme?.custom?.whiteDark,
                        color: theme?.custom?.whiteDark,
                        "&:hover": {
                            borderColor: "rgba(3,134,238,0.5)",
                            backgroundColor: "rgba(3,134,238,0.05)",
                        },
                    })}
                >
                    📷 Subir imagen
                </Button>
            </Box>

            {errors.image_file && (
                <Typography sx={{ fontSize: "0.75rem", color: "#ff5252", mt: 0.5 }}>
                    {errors.image_file as string}
                </Typography>
            )}
        </Box>
    );
};

export default ImageUpload;