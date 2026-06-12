/* eslint-disable @typescript-eslint/no-empty-object-type */
import type {
    CreatedProductInterface,
    UpdatedProductInterface,
    DeleteDialogState,
} from "./productTypes";


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

export interface ProductFormFieldsProps {
    mode?: "create" | "edit" | "view";
    disabled?: boolean;
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
// ║ 🟥 CARD  🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductFormCardProps {
    children: React.ReactNode;
    submitText: string;
    showButtons?: boolean;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🏴‍☠️ BANNER  🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductBannerComponentProps {
    currentStep:  number;
    banner:       React.ReactNode;
    banner_text?: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📋 FORMULARIO — Header  📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋📋           ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// Props del encabezado del form (stepper + banner)
export interface ProductsFormHeaderComponentProps extends ProductBannerComponentProps {
    stepsLabels:           string[];
    showProgressIndicator?: boolean;
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
