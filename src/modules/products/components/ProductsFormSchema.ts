import * as Yup from "yup";

export type ProductFormValues = {
    // Step 1: Datos del producto
    name: string;
    description: string;
    brand: string;
    image_url: string;

    // Step 2: Datos técnicos
    productType: string;
    stock: number;
    minStock: number;
    productImage: File | null;

    // Step 3: Datos técnicos II
    size: string;
    barcode: string;
    expirationDate: Date | null;

    // Step 4: Datos finales
    supplierId: string;
};

export const getProductFormInitialValues = (): ProductFormValues => ({
    // Step 1
    name: "",
    description: "",
    brand: "",
    image_url: "",

    // Step 2
    productType: "",
    stock: 0,
    minStock: 0,
    productImage: null,

    // Step 3
    size: "",
    barcode: "",
    expirationDate: null,

    // Step 4
    supplierId: "",
});

export const productFormSchema = Yup.object().shape({
    // Step 1: Validación
    name: Yup.string()
        .required("El nombre del producto es requerido")
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .max(100, "El nombre no puede exceder 100 caracteres"),
    description: Yup.string()
        .required("La descripción es requerida")
        .min(10, "La descripción debe tener al menos 10 caracteres")
        .max(500, "La descripción no puede exceder 500 caracteres"),
    brand: Yup.string()
        .required("La marca es requerida")
        .min(2, "La marca debe tener al menos 2 caracteres")
        .max(50, "La marca no puede exceder 50 caracteres"),
    image_url: Yup.string()
        .url("Debe ser una URL válida")
        .optional(),

    // Step 2: Validación
    productType: Yup.string()
        .required("El tipo de producto es requerido"),
    stock: Yup.number()
        .required("El stock es requerido")
        .min(0, "El stock no puede ser negativo")
        .typeError("El stock debe ser un número"),
    minStock: Yup.number()
        .required("El stock mínimo es requerido")
        .min(0, "El stock mínimo no puede ser negativo")
        .typeError("El stock mínimo debe ser un número"),
    productImage: Yup.mixed()
        .optional(),

    // Step 3: Validación
    size: Yup.string()
        .required("El tamaño es requerido"),
    barcode: Yup.string()
        .optional()
        .max(50, "El código de barras no puede exceder 50 caracteres"),
    expirationDate: Yup.date()
        .optional()
        .nullable()
        .typeError("La fecha debe ser válida"),

    // Step 4: Validación
    supplierId: Yup.string(),
});

// Mapeo de campos por paso
export const stepFieldsMap: Record<number, (keyof ProductFormValues)[]> = {
    0: ["name", "description", "brand", "image_url"], // Step 1
    1: ["productType", "stock", "minStock", "productImage"], // Step 2
    2: ["size", "barcode", "expirationDate"], // Step 3
    3: [], // Step 4
};
