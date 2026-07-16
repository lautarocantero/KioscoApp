import type { FormikErrors } from "formik";
import type { NavigateFunction } from "react-router-dom";
import type { Dispatch, SetStateAction, FormEvent } from "react";
import type { GridColDef } from "@mui/x-data-grid";
import type { DeleteDialogState } from "@typings/ui/dialog.types";
import type { FormModeComplexEnum } from "@typings/shared/sharedEnums";


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface ProductEntity {
    _id:          string;
    name:         string;
    description:  string;
    brand:        string;
    image_url:    string;
    created_at:   string;
    updated_at:   string;
    presentations:     Presentation[];
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🧩 DERIVADOS 🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩🧩                ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Derivado principal — evita exponer ProductEntity directamente
export type Product = ProductEntity;

// Solo los campos públicos (sin _id)
export type ProductPublic = Omit<ProductEntity, "_id">;

// Producto existente devuelto por GET /product/:id — presentations opcionales
export type ExistingProductInterface = Omit<ProductEntity, "presentations"> & {
    presentations?: Presentation[];
};

// Referencia mínima tras crear un producto (respuesta del POST)
export interface CreatedProductInterface {
    _id:  string;
    name: string;
}

// Referencia mínima tras actualizar un producto (respuesta del PATCH)
export type UpdatedProductInterface = CreatedProductInterface;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 API 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Respuesta de POST /product/create-product.
// El backend no devuelve el Product completo, solo `{ _id, message }`;
// la reconstrucción del objeto completo queda a cargo del thunk.
export type CreateProductResponse = {
    _id:     string;
    message: string;
};

// Cuerpo enviado al PUT /product/edit-product
export type EditProductBody = Partial<Product> & Pick<Product, "_id">;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 FORMULARIOS 📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋               ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Campos editables base — compartidos por creación y edición
interface ProductBaseFormValues {
    name:         string;
    description:  string;
    brand:        string;
    image_url:    string;
}

// Formulario de CREACIÓN — idéntico a la base por ahora (sin campos extra de variante/stock)
export type ProductFormValues = ProductBaseFormValues;

// Formulario de EDICIÓN — solo los campos editables base
export type ProductEditFormValues = ProductBaseFormValues;

// Cuerpo enviado al POST /product/create-product
export type CreateProductBody = ProductBaseFormValues & {
    created_at:   string;
    updated_at:   string;
    presentations:     unknown[];
};

// Cuerpo enviado al PATCH /product/:id
export type UpdateProductBody = ProductBaseFormValues & {
    updated_at: string;
};

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductState {
    products:             Product[];
    currentProduct:       Product | null;
    isLoading:            boolean;
    errorMessage:         string | null;
    isLoadingCurrent:     boolean;
    currentProductError:  string | null;
}

export type ProductStateError = Pick<ProductState, "errorMessage">;

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪝 HOOKS  🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝🪝                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Base reutilizable para hooks de formulario con entidad genérica
interface UseFormStateBase<TEntity> {
    createdProduct:    TEntity | null;
    isSubmitting:     boolean;
    submitError:      string | null;
    stepErrors:       string[];
    setCreatedProduct: Dispatch<SetStateAction<TEntity | null>>;
    setIsSubmitting:  Dispatch<SetStateAction<boolean>>;
    setSubmitError:   Dispatch<SetStateAction<string | null>>;
}

// Base reutilizable para hooks de formulario multi-paso
interface UseFormStepsBase {
    currentStep: number;
    totalSteps:  number;
    handlePrevStep: () => void;
}

// Base reutilizable para hooks de carga async simple (dato + loading + error)
interface UseAsyncLoadBase {
    isLoading: boolean;
    error:     string | null;
}

// Hook de datos de un producto individual
export interface UseProductDataResult extends UseAsyncLoadBase {
    productData: Product | null;
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
    handleCreateAnother: () => void
}

// Hook de formulario de EDICIÓN
// Reutiliza el subconjunto común de UseFormStateBase (submit state) y solo
// redefine lo que es propio de edición (entidad existente vs. entidad creada).
export interface UseProductsEditFormReturn
    extends Omit<UseFormStateBase<UpdatedProductInterface>, "createdProduct" | "setCreatedProduct">,
            UseFormStepsBase {
    editingProduct:    ExistingProductInterface | null;
    updatedProduct:    UpdatedProductInterface | null;
    isLoadingProduct:  boolean;
    setEditingProduct: Dispatch<SetStateAction<ExistingProductInterface | null>>;
    setUpdatedProduct: Dispatch<SetStateAction<UpdatedProductInterface | null>>;
    handleNextStep: (
        validateForm: () => Promise<FormikErrors<ProductEditFormValues>>,
        onValidSubmit?: () => void,
    ) => Promise<void>;
    handleEdit: (values: ProductEditFormValues) => Promise<void>;
}

export interface UseProductsDetailFormReturn {
    viewingEntity:    ExistingProductInterface | null;
    isLoadingEntity:  boolean;
    loadError:        string | null;
    setViewingEntity: Dispatch<SetStateAction<ExistingProductInterface | null>>;
}


// Hook de listado y eliminación de productos
export interface UseProductsReturn {
    productsWithPresentations: ProductWithPresentations[]; // viene de state.product.products
    loading:              boolean;
    error:                string | null;
    deleteDialog:         DeleteDialogState;
    clearError:           () => void;
    handleDeleteRequest:  (id: string, name: string) => void;
    handleDeleteCancel:   () => void;
    handleDeleteConfirm:  () => Promise<void>;
    searchTerm:           string;
    setSearchTerm:        (term: string) => void;
    columns:              GridColDef[];
}

// useProductStats

export interface ProductStats {
    totalProducts:    number;
    lowStockProducts: number;
}

// Mismos campos que ProductStats pero nullables (aún no cargados) + estado async
export type UseProductStatsResult = {
    [K in keyof ProductStats]: ProductStats[K] | null;
} & UseAsyncLoadBase;

export interface UseProductsListDataResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
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
    onPrev:        () => void;
    onSubmit:      (e?: FormEvent<HTMLFormElement>) => void;
    validateForm?: () => Promise<FormikErrors<ProductFormValues>>;
    actionTitle?:  FormModeComplexEnum;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🗂️ COLUMNAS  🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️🗂️           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Argumentos para construir las columnas del grid de productos
export interface BuildColumnsArgs {
    onDeleteRequest: (id: string, name: string) => void;
    navigate:        NavigateFunction;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🛞 UTILIDADES  🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞🛞                 ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface NoProductLoadedComponentProps {
    productError: string | null;
}

export interface PresentationSummary {
    sku:         string;
    name:        string;
    description: string;
    model_type:  string;
    model_size:  string;
    stock:       number;
}

export interface ProductWithPresentations extends Omit<Product, "presentations"> {
    presentations: PresentationSummary[];
}