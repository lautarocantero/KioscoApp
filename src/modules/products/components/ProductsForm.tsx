
import { Grid } from "@mui/material";
import { Formik } from "formik";
// import { useDispatch } from "react-redux";
import { useFormSteps } from "../../../hooks/shared/useFormSteps";
// import type { AppDispatch } from "../../../store/product/productSlice";
import FormGridComponent from "../../shared/components/FormGrid/FormGrid";
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

// ─── Suppliers de ejemplo — reemplazar con selector de Redux ─────────────────
const MOCK_SUPPLIERS = [
    { id: "1", name: "Proveedor A" },
    { id: "2", name: "Proveedor B" },
];

const ProductsFormComponent = (): React.ReactNode => {
    // const dispatch = useDispatch<AppDispatch>();

    // ─── Config de steps ──────────────────────────────────────────────────────
    // Los steps se definen aquí para poder pasarle props a Step4.
    // Los componentes hijos acceden a Formik vía useFormikContext().
    const stepsConfig = [
        { title: "Datos principales",  content: <ProductsFormFirstStep /> },
        { title: "Datos técnicos",     content: <ProductsFormSecondStep /> },
        { title: "Datos técnicos II",  content: <ProductsFormThirdStep /> },
        {
            title: "Datos finales",
            content: (
                <ProductsFormForthStep
                    suppliers={MOCK_SUPPLIERS}
                    onAddSupplier={() => {
                        // abrir modal / navegar a crear proveedor
                        console.log("Agregar proveedor");
                    }}
                />
            ),
        },
    ];

    const formSteps = useFormSteps(stepsConfig);

    // ─── Submit ───────────────────────────────────────────────────────────────
    const handleSubmit = async (values: ProductFormValues) => {
        try {
            console.log("✅ Producto a crear:", values);
            // dispatch(startCreateProduct(values));
        } catch (error) {
            console.error("❌ Error al crear producto:", error);
        }
    };

    // ─── Validación parcial por step ──────────────────────────────────────────
    // Esta función se expone a FormGridComponent para validar antes de avanzar.
    // Se usa validateForm + revisar si los campos del step tienen errores.
    const validateCurrentStep = async (
        validateForm: () => Promise<Partial<Record<keyof ProductFormValues, string>>>,
        currentStep: number
    ): Promise<boolean> => {
        const errors = await validateForm();
        const currentStepFields = stepFieldsMap[currentStep];
        return !currentStepFields.some((field) => errors[field]);
    };

    return (
        <Formik
            initialValues={getProductFormInitialValues()}
            validationSchema={productFormSchema}
            onSubmit={handleSubmit}
            validateOnBlur={false}
            validateOnChange={false}
        >
            {({ handleSubmit: formikSubmit, validateForm }) => (
                <Grid
                    container
                    component="form"
                    onSubmit={formikSubmit}
                >
                    <FormGridComponent
                        formSteps={formSteps}
                        prevLink="/products"
                        validateStep={(step) => validateCurrentStep(validateForm, step)}
                    />
                </Grid>
            )}
        </Formik>
    );
};

export default ProductsFormComponent;
