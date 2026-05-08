import type { FormikErrors } from "formik";
import type { ProductFormValues } from "modules/productVariants/schema/ProductsVariantFormSchema";

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface ProductEntity {
    _id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    image_url: string;
    gallery_urls: string[];
    brand: string;
    variants: ProductVariant[];
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// // derivado para no utilizar directamente el ProductEntity
export type Product = ProductEntity;

// // derivado para los datos publicos
export type ProductPublic = Omit<ProductEntity, '_id'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// tipo del slice
interface ProductState { 
    products: Product[],
    currentProduct: Product | null,
    isLoading: boolean,          
    errorMessage: string | null,
}

export type ProductStateError = Pick <ProductState, 'errorMessage'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 Hooks  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface UseProductsFormReturn {
    createdProduct: CreatedProduct | null;
    isSubmitting: boolean;
    submitError: string | null;
    setCreatedProduct: (product: CreatedProduct | null) => void;
    setIsSubmitting: (value: boolean) => void;
    setSubmitError: (error: string | null) => void;
}

export interface UseProductDataResult {
    productData: Product | null;
    isLoading:   boolean;
    error:       string | null;
};

export interface UseFormStateReturn<T> {
    createdEntity: T | null;
    isSubmitting: boolean;
    submitError: string | null;
    setCreatedEntity: (entity: T | null) => void;
    setIsSubmitting: (value: boolean) => void;
    setSubmitError: (error: string | null) => void;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 💱 Context  💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱💱                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface FormNavigationContextType {
    currentStep: number;
    totalSteps: number;
    onNext: (validateForm: () => Promise<FormikErrors<ProductFormValues>>) => Promise<void>;
    onPrev: () => void;
    onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
    validateForm?: () => Promise<FormikErrors<ProductFormValues>>;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛞 Utilidades  🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞                 ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface CreatedProductInterface { _id: string; name: string };

export interface NoProductLoadedComponentProps {
    productError: string | null;
}

export type ProductFormValues = {
    // Step 1: Producto base
    name: string;
    description: string;
    brand: string;
    image_url: string;


    // Step 2: Presentación — identidad de la variante
    sku: string;
    model_type: string;
    model_size: string;
    price: number;
    variant_image_url: string;
    gallery_urls: string[];


    // Step 3: Stock y operación
    stock: number;
    min_stock: number;
    expiration_date: string | null;
};

export type CreateProductBody = {
    name:         string;
    description:  string;
    created_at:   string;
    updated_at:   string;
    image_url:    string;
    gallery_urls: string[];
    brand:        string;
    variants:     unknown[];
};