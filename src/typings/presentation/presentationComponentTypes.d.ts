
// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍋 Presentation Created  🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋🍋                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface VariantCreatedActionsProps {
    onCreateAnother: () => void;
}

export interface VariantCreatedBodyProps {
    name: string;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🟥 CARD  🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface PresentationFormCardProps {
    children: React.ReactNode;
    submitText: string;
    showButtons?: boolean;
    currentStep: number;
}