import { useState } from "react";
import {
    Box,
    CardContent,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    type Theme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NavButtons from "../Buttons/NavButtons";
import FormFooter from "./FormFooter";
import FormHeader from "./FormHeader";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import type { FormCardProps } from "@typings/shared/reactComponents";


const FormCard = ({
    children,
    submitText,
    showButtons,
    readOnly,
    backPath,
    maxWidth,
    header,
    multiStepHeader,
    accordion,
}: FormCardProps): React.ReactNode => {
    const [expanded, setExpanded] = useState(accordion?.defaultExpanded ?? false);

    return (
        <NoisyCard maxWidth={maxWidth}>
            {header && !multiStepHeader && (
                <FormHeader
                    title={header.title}
                    subtitle={header.subtitle}
                    icon={header.icon}
                />
            )}

            {multiStepHeader && (
                <FormHeader
                    title={header?.title ?? ""}
                    isMultiStep
                    stepsLabels={multiStepHeader.stepsLabels}
                    currentStep={multiStepHeader.currentStep}
                />
            )}

            <CardContent>
                <Box sx={(theme: Theme) => ({
                    borderRadius: 2,
                    px: 2,
                    color: theme.custom?.darkWhite,
                })}>

                    {accordion && (
                        <Accordion
                            expanded={expanded}
                            onChange={(_, isExpanded) => setExpanded(isExpanded)}
                            disableGutters
                            elevation={0}
                            sx={(theme: Theme) => ({
                                mb: 3,
                                backgroundColor: theme.custom?.darkBackground ?? "rgba(3,134,238,0.06)",
                                borderRadius: "12px !important",
                                border: `1px solid ${theme.palette?.primary?.main ?? "#0386EE"}33`,
                                "&:before": { display: "none" },
                            })}
                        >
                            <AccordionSummary
                                expandIcon={
                                    <ExpandMoreIcon sx={(theme: Theme) => ({ color: theme.palette?.primary?.main ?? "#0386EE" })} />
                                }
                                sx={{
                                    minHeight: "60px",
                                    px: 2,
                                    "& .MuiAccordionSummary-content": { alignItems: "center", gap: 1.5, my: 1.5 },
                                }}
                            >
                                <Box
                                    sx={(theme: Theme) => ({
                                        width: 32,
                                        height: 32,
                                        borderRadius: "50%",
                                        border: `1.5px solid ${theme.palette?.primary?.main ?? "#0386EE"}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    })}
                                >
                                    <InfoOutlinedIcon
                                        sx={(theme: Theme) => ({ fontSize: "1.1rem", color: theme.palette?.primary?.main ?? "#0386EE" })}
                                    />
                                </Box>
                                <Typography
                                    sx={(theme: Theme) => ({
                                        fontSize: "0.95rem",
                                        fontWeight: 600,
                                        color: theme.palette?.primary?.main ?? "#0386EE",
                                    })}
                                >
                                    {accordion.title}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails
                                sx={(theme: Theme) => ({
                                    pt: 0,
                                    pb: 2,
                                    pl: "60px",
                                    pr: 2,
                                    color: theme.custom?.darkWhite ?? theme.custom?.translucidWhite,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                })}
                            >
                                <Typography sx={{ fontSize: "0.85rem", lineHeight: 1.5 }}>
                                    {accordion.content}
                                </Typography>
                                {accordion.bannerImage && (
                                    <Box
                                        component="img"
                                        src={accordion.bannerImage.src}
                                        alt={accordion.bannerImage.alt}
                                        sx={{
                                            maxHeight: accordion.bannerImage.maxHeight ?? 220,
                                            maxWidth: "100%",
                                            objectFit: "contain",
                                            alignSelf: "flex-start",
                                        }}
                                    />
                                )}
                            </AccordionDetails>
                        </Accordion>
                    )}

                    {children}
                </Box>
            </CardContent>

            <FormFooter />
            {showButtons && <NavButtons SubmitText={submitText ?? ""} backPath={backPath} />}
            {readOnly    && <NavButtons readOnly backPath={backPath} />}
        </NoisyCard>
    );
};

export default FormCard;