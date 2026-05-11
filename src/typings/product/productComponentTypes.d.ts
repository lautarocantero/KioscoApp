
// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🥔 Product  🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔🥔                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductImagePreviewProps {
    imageUrl: string;
}

export interface ProductCreatedProps {
    createdProduct: CreatedProductInterface;
}

export interface ProductCreatedActionsProps {
    productId: string;
}

export interface ProductCreatedBodyProps {
    name: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🏴‍☠️ Banner  🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️🏴‍☠️                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface ProductBannerComponentProps {
    currentStep: number;
    banner: React.ReactNode;
    banner_text?: string;
}





