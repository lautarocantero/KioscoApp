/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { Presentation } from "@typings/presentation/presentationTypes";
import type {
    CreatedProductInterface,
    UpdatedProductInterface,
} from "./productTypes";
import type { PresentationAnalyticsData } from "@typings/ui/analytics.types";
import type { Dayjs } from "dayjs";
import type { AnalyticsFiltersInterface } from "@typings/shared/types/useAnalytics.types";
import type { FormModeEnum } from "@typings/shared/sharedEnums";


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
export interface ProductCreatedComponentProps {
    createdProduct: CreatedProductInterface;
    onCreateAnother: () => void;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 FORMULARIO — Campos  📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

interface FieldIconConfig {
    icon: React.ReactNode;
    color: string;
}

export interface ProductFormProps {
    mode?: FormModeComplexEnum;
}

export  interface FieldWithIconProps {
    iconConfig?: FieldIconConfig;
    children: React.ReactNode;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ ✏️ PRODUCTO — Edición  ✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️✏️            ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

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
    initialPresentationId?: string;
}

export interface PresentationAnalyticsProps {
    data: PresentationAnalyticsData;
    error: strin | null;
    presentations?: Presentation[];
    selectedPresentationId?: string;
    onPresentationChange?: (presentationId: string) => void;
    isPresentationSelectorDisabled?: boolean;
    onApplyFilters?: (filters: AnalyticsFiltersInterface) => void;
    hidePresentationFilter: boolean;
}

