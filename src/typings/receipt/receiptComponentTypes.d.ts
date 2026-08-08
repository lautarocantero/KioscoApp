export interface ReceiptUploadAreaProps {
    acceptedFormats: string[];
    maxSize: string;
    onSelectFile: () => void;
}

export interface ReceiptSummaryCardProps {
    status: string;
    description: string;
}

export interface ReceiptAdviceCardProps {
    adviceItems: string[];
}

export interface ReceiptHelpCardProps {
    helpDescription: string;
    buttonLabel: string;
    onSupportClick: () => void;
}
