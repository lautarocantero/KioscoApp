import { Box, Card, CardContent, type Theme } from "@mui/material";
import NavButtons from "../Buttons/NavButtons";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";
import type { FormHeaderProps } from "./FormHeader";

export interface FormCardProps {
    children:     React.ReactNode;
    submitText?:  string;
    showButtons?: boolean;
    readOnly?:    boolean;
    backPath?:    string;
    maxWidth?:    number | string;
    /** Props del header estático (título + subtitle) — mutuamente excluyente con multiStepHeader */
    header?: Pick<FormHeaderProps, "title" | "subtitle" | "icon">;
    /** Props del header multi-step — mutuamente excluyente con header */
    multiStepHeader?: {
        stepsLabels: string[];
        currentStep: number;
    };
}

const FormCard = ({
    children,
    submitText,
    showButtons,
    readOnly,
    backPath,
    maxWidth,
    header,
    multiStepHeader,
}: FormCardProps): React.ReactNode => (
    <Card sx={(theme: Theme) => ({
        width: "100%",
        ...(maxWidth ? { maxWidth } : {}),
        bgcolor: theme.custom?.backgroundDark,
        border: "0.5px solid", borderColor: "rgba(255,255,255,0.08)",
        borderRadius: "16px",
        boxShadow: `
            0 1px 3px rgba(0,0,0,0.06),
            4px 8px 16px rgba(0,0,0,0.10),
            8px 16px 28px rgba(0,0,0,0.08)
        `,
    })}>

        {/* Header estático */}
        {header && (
            <FormHeader
                title={header.title}
                subtitle={header.subtitle}
                icon={header.icon}
            />
        )}

        {/* Header multi-step */}
        {multiStepHeader && (
            <FormHeader
                title={multiStepHeader.stepsLabels[multiStepHeader.currentStep]}
                isMultiStep
                stepsLabels={multiStepHeader.stepsLabels}
                currentStep={multiStepHeader.currentStep}
            />
        )}

        <CardContent sx={{ p: 3 }}>
            <Box sx={(theme: Theme) => ({
                backgroundColor: "background.paper",
                borderRadius: 2,
                p: 3,
                color: theme.custom?.fontColorDark,
            })}>
                {children}
            </Box>
        </CardContent>

        <FormFooter />
        {showButtons && <NavButtons SubmitText={submitText ?? ""} />}
        {readOnly    && <NavButtons readOnly backPath={backPath} />}
    </Card>
);

export default FormCard;
