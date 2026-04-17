import * as Yup from "yup";

export const productFormSchema = Yup.object().shape({
    name: Yup.string()
        .required("Campo requerido")
        .min(2, "Mínimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .trim(),
    description: Yup.string()
        .required("Campo requerido")
        .min(5, "Mínimo 5 caracteres")
        .max(500, "Máximo 500 caracteres")
        .trim(),
    brand: Yup.string()
        .required("Campo requerido")
        .trim(),
    image_url: Yup.string().optional(),
});

export type ProductFormValues = Yup.InferType<typeof productFormSchema>;

export const stepFieldsMap: Record<number, (keyof ProductFormValues)[]> = {
    0: ["name", "description", "brand"],
};

export const getProductFormInitialValues = (): ProductFormValues => ({
    name: "",
    description: "",
    brand: "",
    image_url: "",
});