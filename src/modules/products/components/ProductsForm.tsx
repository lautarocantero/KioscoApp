import { useState } from "react";
import { Grid, Box, Button, Typography, Stepper, Step, StepLabel, type Theme } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useFormSteps } from "../../../hooks/shared/useFormSteps";
import {
    getProductFormInitialValues,
    productFormSchema,
    stepFieldsMap,
    type ProductFormValues,
} from "./ProductsFormSchema";
import ProductsFormFirstStep from "./ProductsFormFirstStep";
import ProductsFormSecondStep from "./ProductsFormSecondStep";
import ProductsFormThirdStep from "./ProductsFormThirdStep";
import ProductsFormForthStep from "./ProductsFormForthStep";
import AddSupplierDialog from "./AddSupplierDialog";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { createContext, useContext } from "react";

type CreatedProduct = { _id: string; name: string };

interface Supplier {
    id: string;
    name: string;
}

export interface FormNavigationContextType {
    currentStep: number;
    totalSteps: number;
    onNext: (validateForm: () => Promise<Partial<Record<keyof ProductFormValues, string>>>) => Promise<void>;
    onPrev: () => void;
    onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
    validateForm?: () => Promise<Partial<Record<keyof ProductFormValues, string>>>;
}

export const FormNavigationContext = createContext<FormNavigationContextType | undefined>(undefined);

export const useFormNavigation = () => {
    const context = useContext(FormNavigationContext);
    if (!context) {
        throw new Error("useFormNavigation must be used within FormNavigationProvider");
    }
    return context;
};

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const STEPS_LABELS = [
    "Datos del producto",
    "Datos técnicos",
    "Datos técnicos II",
    "Datos finales",
];

const ProductsFormComponent = (): React.ReactNode => {
    const navigate = useNavigate();
    const [createdProduct, setCreatedProduct] = useState<CreatedProduct | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loadingSuppliers, setLoadingSuppliers] = useState(false);
    const [openAddSupplierDialog, setOpenAddSupplierDialog] = useState(false);

    const stepsConfig = [
        { title: "Datos del producto", content: <ProductsFormFirstStep /> },
        { title: "Datos técnicos", content: <ProductsFormSecondStep /> },
        { title: "Datos técnicos II", content: <ProductsFormThirdStep /> },
        {
            title: "Datos finales",
            content: (
                <ProductsFormForthStep
                    suppliers={suppliers}
                    onAddSupplier={() => setOpenAddSupplierDialog(true)}
                    loadingSuppliers={loadingSuppliers}
                />
            ),
        },
    ];

    // ─── Hook unificado — única fuente de verdad para el paso actual ─────────
    const { stepState, goToNext, goToPrev, totalSteps } = useFormSteps(stepsConfig);

    const handleSupplierCreated = (newSupplier: Supplier) => {
        setSuppliers((prev) => [...prev, newSupplier]);
        setOpenAddSupplierDialog(false);
    };

    // ─── Validar campos del paso actual antes de avanzar ────────────────────
    const handleNextStep = async (
        validateForm: () => Promise<Partial<Record<keyof ProductFormValues, string>>>
    ) => {
        const errors = await validateForm();
        const currentStepFields = stepFieldsMap[stepState.currentStep];
        const hasErrors = currentStepFields.some((field) => errors[field]);

        if (!hasErrors) {
            goToNext();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handlePrevStep = () => {
        goToPrev();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ─── Submit → llama a POST /product/create-product ───────────────────────
    const handleSubmit = async (values: ProductFormValues) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const now = new Date().toISOString().split("T")[0];

            const body = {
                name: values.name,
                description: values.description,
                brand: values.brand,
                image_url: values.image_url ?? "",
                gallery_urls: [],
                variants: [],
                created_at: now,
                updated_at: now,
                productType: values.productType,
                stock: values.stock,
                minStock: values.minStock,
                size: values.size,
                barcode: values.barcode,
                expirationDate: values.expirationDate,
                supplierId: values.supplierId,
            };

            const response = await fetch(`${API_BASE_URL}/product/create-product`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.message ?? `Error ${response.status}`);
            }

            const data: { _id: string; message: string } = await response.json();
            setCreatedProduct({ _id: data._id, name: values.name });
        } catch (error) {
            console.error("❌ Error al crear producto:", error);
            setSubmitError(
                error instanceof Error
                    ? error.message
                    : "Error inesperado al crear el producto"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // ─── Pantalla post-submit ─────────────────────────────────────────────────
    if (createdProduct) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap={3}
                mt={6}
                px={2}
            >
                <Typography variant="h6" textAlign="center">
                    ✅ Producto <strong>"{createdProduct.name}"</strong> creado correctamente.
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                    ¿Querés agregar una presentación para este producto?
                </Typography>

                <Box display="flex" flexDirection="column" gap={2} width="100%" maxWidth={340}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => navigate(`/products/${createdProduct._id}/variants/new`)}
                        sx={{ textTransform: "none", fontWeight: 600 }}
                    >
                        Crear presentación
                    </Button>

                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate("/products")}
                        sx={(theme: Theme) => ({
                            textTransform: "none",
                            borderColor: theme?.custom?.fontColorTransparent,
                            color: theme?.custom?.fontColorTransparent,
                        })}
                    >
                        Volver a productos
                    </Button>
                </Box>
            </Box>
        );
    }

    // ─── Formulario ───────────────────────────────────────────────────────────
    return (
        <>
            <Formik
                initialValues={getProductFormInitialValues()}
                validationSchema={productFormSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {({ handleSubmit: formikSubmit, validateForm }) => (
                    <FormNavigationContext.Provider
                        value={{
                            currentStep: stepState.currentStep,
                            totalSteps,
                            onNext: handleNextStep,
                            onPrev: handlePrevStep,
                            onSubmit: formikSubmit,
                            isSubmitting,
                            validateForm,
                        }}
                    >
                        <Grid container component="form" onSubmit={formikSubmit}>
                            {/* ─── Header con Stepper ─────────────────────────────────────────── */}
                            <Grid size={12} sx={{ mb: 4 }}>
                                <Box
                                    sx={(theme: Theme) => ({
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2.5,
                                        p: 3,
                                        backgroundColor: theme.custom?.backgroundDark,
                                        borderRadius: "16px",
                                        border: "0.5px solid rgba(255,255,255,0.08)",
                                    })}
                                >
                                    {/* ─── Indicador de paso actual ─────────────────────────────── */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Box>
                                            <Typography
                                                sx={(theme: Theme) => ({
                                                    fontSize: "0.80rem",
                                                    color: theme.custom?.fontColorTransparent,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.05em",
                                                    fontWeight: 500,
                                                    mb: 0.5,
                                                })}
                                            >
                                                Paso {stepState.currentStep + 1} de {STEPS_LABELS.length}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: "1.1rem",
                                                    fontWeight: 600,
                                                    color: "#0386EE",
                                                }}
                                            >
                                                {STEPS_LABELS[stepState.currentStep]}
                                            </Typography>
                                        </Box>

                                        {/* ─── Barra de progreso circular ──────────────────────── */}
                                        <Box
                                            sx={{
                                                position: "relative",
                                                width: 48,
                                                height: 48,
                                                flexShrink: 0,
                                            }}
                                        >
                                            <svg
                                                width="48"
                                                height="48"
                                                viewBox="0 0 48 48"
                                                style={{ transform: "rotate(-90deg)" }}
                                            >
                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="20"
                                                    fill="none"
                                                    stroke="rgba(255,255,255,0.1)"
                                                    strokeWidth="2"
                                                />
                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="20"
                                                    fill="none"
                                                    stroke="#0386EE"
                                                    strokeWidth="2"
                                                    strokeDasharray={2 * Math.PI * 20}
                                                    strokeDashoffset={
                                                        2 * Math.PI * 20 *
                                                        (1 - (stepState.currentStep + 1) / STEPS_LABELS.length)
                                                    }
                                                    strokeLinecap="round"
                                                    style={{ transition: "stroke-dashoffset 0.5s ease" }}
                                                />
                                            </svg>
                                            <Box
                                                sx={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    left: "50%",
                                                    transform: "translate(-50%, -50%)",
                                                    textAlign: "center",
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        fontSize: "0.75rem",
                                                        fontWeight: 700,
                                                        color: "#0386EE",
                                                    }}
                                                >
                                                    {Math.round(
                                                        ((stepState.currentStep + 1) / STEPS_LABELS.length) * 100
                                                    )}%
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    {/* ─── Banner explicativo — solo en el paso 0 ─── */}
                                    {stepState.currentStep === 0 && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: 1.5,
                                          alignItems: "flex-start",
                                          p: "12px 14px",
                                          backgroundColor: "rgba(3,134,238,0.07)",
                                          border: "0.5px solid rgba(3,134,238,0.2)",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <Box>
                                          <Typography sx={{ fontSize: "0.81rem", fontWeight: 500, color: "rgba(255,255,255,0.85)", mb: 0.5 }}>
                                            ¿Cómo funciona la carga de productos?
                                          </Typography>
                                          <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                                            Primero creás el producto una sola vez — nombre, marca, descripción. Luego agregás sus{" "}
                                            <Box component="span" sx={{ color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>presentaciones</Box>
                                            {" "}(2L, retornable, lata...) con el stock y precio de cada una.
                                          </Typography>
                                        </Box>
                                        <Box
                                          component="img"
                                          src="/images/productExample/ilustration.png"
                                          alt="Producto y presentaciones"
                                          sx={{ width: 420, height: 220, objectFit: "contain", flexShrink: 0 }}
                                        />
                                      </Box>
                                    )}
                                    {/* ─── Stepper visual ──────────────────────────────────────── */}
                                    <Stepper
                                        activeStep={stepState.currentStep}
                                        sx={{
                                            backgroundColor: "transparent",
                                            "& .MuiStepLabel-root": { cursor: "default" },
                                            "& .MuiStepConnector-root": {
                                                marginLeft: "0",
                                                marginRight: "0",
                                            },
                                        }}
                                    >
                                        {STEPS_LABELS.map((label) => (
                                            <Step key={label}>
                                                <StepLabel
                                                    sx={(theme: Theme) => ({
                                                        "& .MuiStepLabel-label": {
                                                            fontSize: "0.75rem",
                                                            color: theme.custom?.fontColorTransparent,
                                                            mt: 1,
                                                        },
                                                        "& .MuiStepLabel-label.Mui-active": {
                                                            color: "#0386EE",
                                                            fontWeight: 600,
                                                        },
                                                        "& .MuiStepLabel-label.Mui-completed": {
                                                            color: theme.custom?.fontColorTransparent,
                                                        },
                                                    })}
                                                >
                                                    {label}
                                                </StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                            </Grid>

                            {/* Error de API */}
                            {submitError && (
                                <Grid size={12} sx={{ mb: 2 }}>
                                    <Typography color="error" variant="body2" textAlign="center">
                                        ❌ {submitError}
                                    </Typography>
                                </Grid>
                            )}

                            {/* ─── Contenido del paso actual — viene del hook ───────────────── */}
                            <Grid size={12} sx={{ mb: 4 }}>
                                {stepState.content}
                            </Grid>

                            {/* Botón cancelar */}
                            <Grid size={12}>
                                <Button
                                    fullWidth
                                    variant="text"
                                    onClick={() => navigate("/products")}
                                    sx={(theme: Theme) => ({
                                        textTransform: "none",
                                        color: theme?.custom?.fontColorTransparent,
                                        fontSize: "0.9rem",
                                    })}
                                >
                                    ← Cancelar y volver a productos
                                </Button>
                            </Grid>
                        </Grid>
                    </FormNavigationContext.Provider>
                )}
            </Formik>

            {/* ─── Diálogo para agregar proveedor ─────────────────────────────── */}
            <AddSupplierDialog
                open={openAddSupplierDialog}
                onClose={() => setOpenAddSupplierDialog(false)}
                onSupplierCreated={handleSupplierCreated}
            />
        </>
    );
};

export default ProductsFormComponent;
