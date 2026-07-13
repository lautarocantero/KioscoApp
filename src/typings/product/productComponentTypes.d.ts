/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Presentation } from "@typings/presentation/presentationTypes";
import type {
    CreatedProductInterface,
    UpdatedProductInterface,
    DeleteDialogState,
} from "./productTypes";
import type { PresentationAnalyticsData } from "@typings/ui/analytics.types";
import type { Dayjs } from "dayjs";
import type { AnalyticsFiltersInterface } from "@typings/shared/types/useAnalyticsFormState.types";


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔒 BASE PRINCIPAL 🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒🔒                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Base para cualquier componente que muestra un nombre de producto
interface ProductNameBase {
    name: string;
}

// Base para cualquier componente que trabaja con el ID de un producto
interface ProductIdBase {
    productId: string;
}

// Base para componentes de feedback post-acción (creado / editado)
interface ProductFeedbackBase extends ProductNameBase {
    productId: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🥔 PRODUCTO — Creación  🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔             ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductImagePreviewProps {
    imageUrl: string;
}

// Props del contenedor de éxito post-creación
export interface ProductCreatedProps {
    createdProduct: CreatedProductInterface;
}

// Props del cuerpo informativo (nombre del producto recién creado)
export interface ProductCreatedBodyProps extends ProductNameBase {}

// Props del bloque de acciones (botones de navegación post-creación)
export interface ProductCreatedActionsProps extends ProductIdBase {}

export interface ProductCreatedNameProps {
    name: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 FORMULARIO — Campos  📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductFormFieldsProps {
    mode?: "create" | "edit" | "detail";
    readOnly?: boolean;
    icons?: {
        name?: FieldIconConfig;
        brand?: FieldIconConfig;
        description?: FieldIconConfig;
        image_url?: FieldIconConfig;
    };
}

export interface ProductFormProps {
    mode?: "create" | "edit" | "detail";
}

export interface FieldIconConfig {
    icon: React.ReactNode;
    color: string;
}

export  interface FieldWithIconProps {
    iconConfig?: FieldIconConfig;
    children: React.ReactNode;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ ✏️ PRODUCTO — Edición  ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️            ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Props del contenedor de éxito post-edición
export interface ProductEditSuccessProps {
    updatedProduct: UpdatedProductInterface;
}

// Props del cuerpo informativo (nombre del producto recién editado)
export interface ProductEditSuccessBodyProps extends ProductNameBase {}

// Props del bloque de acciones post-edición (ver / seguir editando)
export interface ProductEditSuccessActionsProps extends ProductFeedbackBase {}

export interface ProductEditedActionsProps {
    productId: string;
}

export interface ProductEditedBodyProps {
    name: string;
}

export interface ProductEditedCardProps {
    updatedProduct: UpdatedProductInterface;
}

export interface ProductEditedNameProps {
    name: string;
}

export interface ProductEditedProps {
    updatedProduct: UpdatedProductInterface;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔍 PRODUCTO — DETALLE  🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface PresentationSelectorProps {
    presentations: Presentation[];
    selectedPresentationId: string | undefined;
    onChange: (presentationId: string) => void;
    disabled?: boolean;
}

export interface ProductAnalyticsSectionProps {
    productId: string | undefined;
}

export interface PresentationAnalyticsProps {
    data: PresentationAnalyticsData;
    presentations?: Presentation[];
    selectedPresentationId?: string;
    onPresentationChange?: (presentationId: string) => void;
    isPresentationSelectorDisabled?: boolean;
    onApplyFilters?: (filters: AnalyticsFiltersInterface) => void;
}

export interface AnalyticsFiltersProps extends AnalyticsFiltersInterface {}


// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🏴‍☠️ BANNER  🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductBannerComponentProps {
    currentStep:  number;
    banner:       React.ReactNode;
    banner_text?: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🗑️ PRODUCTO — Eliminación  🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️🗑️       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Props del diálogo de confirmación de eliminación
export interface ProductDeleteDialogProps {
    deleteDialog: DeleteDialogState;
    onConfirm:    () => void;
    onCancel:     () => void;
}