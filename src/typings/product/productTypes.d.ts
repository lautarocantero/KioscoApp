import type { FormikErrors } from "formik";


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface ProductEntity {
    _id:          string;
    name:         string;
    description:  string;
    brand:        string;
    image_url:    string;
    gallery_urls: string[];
    created_at:   string;
    updated_at:   string;
    variants:     ProductVariant[];
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Derivado principal — evita exponer ProductEntity directamente
export type Product = ProductEntity;

// Solo los campos públicos (sin _id)
export type ProductPublic = Omit<ProductEntity, "_id">;

// Producto existente devuelto por GET /product/:id — variants opcionales
export type ExistingProductInterface = Omit<ProductEntity, "variants"> & {
    variants?: ProductVariant[];
};

// Referencia mínima tras crear un producto (respuesta del POST)
export interface CreatedProductInterface {
    _id:  string;
    name: string;
}

// Referencia mínima tras actualizar un producto (respuesta del PATCH)
export type UpdatedProductInterface = CreatedProductInterface;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 FORMULARIOS 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Campos editables base — compartidos por creación y edición
interface ProductBaseFormValues {
    name:         string;
    description:  string;
    brand:        string;
    image_url:    string;
    gallery_urls: string[];
}

// Formulario de CREACIÓN — agrega campos de variante y stock
export type ProductFormValues = ProductBaseFormValues & {
    // Step 2: Presentación — identidad de la variante
    sku:               string;
    model_type:        string;
    model_size:        string;
    price:             number;
    variant_image_url: string;

    // Step 3: Stock y operación
    stock:           number;
    min_stock:       number;
    expiration_date: string | null;
};

// Formulario de EDICIÓN — solo los campos editables base
export type ProductEditFormValues = ProductBaseFormValues;

// Cuerpo enviado al POST /product/create-product
export type CreateProductBody = Omit<ProductBaseFormValues, "gallery_urls"> & {
    created_at:   string;
    updated_at:   string;
    gallery_urls: string[];
    variants:     unknown[];
};

// Cuerpo enviado al PATCH /product/:id
export type UpdateProductBody = ProductBaseFormValues & {
    updated_at: string;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface ProductState {
    products:       Product[];
    currentProduct: Product | null;
    isLoading:      boolean;
    errorMessage:   string | null;
}

export type ProductStateError = Pick<ProductState, "errorMessage">;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 HOOKS  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Base reutilizable para hooks de formulario con entidad genérica
interface UseFormStateBase<TEntity> {
    createdEntity:    TEntity | null;
    isSubmitting:     boolean;
    submitError:      string | null;
    stepErrors:       string[];
    setCreatedEntity: React.Dispatch<React.SetStateAction<TEntity | null>>;
    setIsSubmitting:  React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitError:   React.Dispatch<React.SetStateAction<string | null>>;
}

// Base reutilizable para hooks de formulario multi-paso
interface UseFormStepsBase {
    currentStep: number;
    totalSteps:  number;
    handlePrevStep: () => void;
}

// Hook de datos de un producto individual
export interface UseProductDataResult {
    productData: Product | null;
    isLoading:   boolean;
    error:       string | null;
}

// Hook de formulario de CREACIÓN
export interface UseProductsFormReturn
    extends UseFormStateBase<CreatedProductInterface>,
            UseFormStepsBase {
    handleNextStep: (
        validateForm: () => Promise<FormikErrors<ProductFormValues>>,
        onValidSubmit?: () => void,
    ) => Promise<void>;
    handleSubmit: (values: ProductFormValues) => Promise<void>;
}

// Hook de formulario de EDICIÓN
export interface UseProductsEditFormReturn extends UseFormStepsBase {
    editingEntity:    ExistingProductInterface | null;
    updatedEntity:    UpdatedProductInterface | null;
    isLoadingEntity:  boolean;
    isSubmitting:     boolean;
    submitError:      string | null;
    stepErrors:       string[];
    setEditingEntity: React.Dispatch<React.SetStateAction<ExistingProductInterface | null>>;
    setUpdatedEntity: React.Dispatch<React.SetStateAction<UpdatedProductInterface | null>>;
    setIsSubmitting:  React.Dispatch<React.SetStateAction<boolean>>;
    setSubmitError:   React.Dispatch<React.SetStateAction<string | null>>;
    handleNextStep: (
        validateForm: () => Promise<FormikErrors<ProductEditFormValues>>,
        onValidSubmit?: () => void,
    ) => Promise<void>;
    handleEdit: (values: ProductEditFormValues) => Promise<void>;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 💱 CONTEXT  💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface FormNavigationContextType {
    currentStep:  number;
    totalSteps:   number;
    isSubmitting: boolean;
    submitError:  string | null;
    stepErrors:   string[];
    onNext: (
        validateForm: () => Promise<FormikErrors<ProductFormValues>>,
        onValidSubmit?: () => void,
    ) => Promise<void>;
    onPrev:     () => void;
    onSubmit:   (e?: React.FormEvent<HTMLFormElement>) => void;
    validateForm?: () => Promise<FormikErrors<ProductFormValues>>;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛞 UTILIDADES  🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞                 ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface NoProductLoadedComponentProps {
    productError: string | null;
}