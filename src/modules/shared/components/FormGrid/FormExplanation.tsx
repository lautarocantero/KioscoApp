import { Box, Grid, Typography, type Theme } from "@mui/material";
import type { ProductsFormHeaderComponentProps } from "@typings/ui/uiModules";
import ProductBannerComponent from "../../../../modules/products/components/ProductForm/ProductBanner";
import VisualStepperComponent from "../../../../modules/products/components/ProductForm/VisualStepper";


const FormExplanationComponent = ({ 
    stepsLabels, 
    currentStep,
    showProgressIndicator = false,
    banner,
    banner_text,
}: ProductsFormHeaderComponentProps) => {

    return (
        <Grid size={12} sx={{ mb: 4 }}>
            <Box
                sx={(theme: Theme) => ({
                    display: "flex",
                    flexDirection: "column",
                    gap: 2.5,
                    p: 3,
                    backgroundColor: theme.custom?.backgroundDark,
                    borderRadius: "16px",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                })}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                        <Typography sx={{ fontSize: "1.1rem", fontWeight: 600, color: "#0386EE" }}>
                            {stepsLabels[currentStep]}
                        </Typography>
                    </Box>

                    {showProgressIndicator && (
                    <Box sx={{ position: "relative", width: 48, height: 48, flexShrink: 0 }}>
                        <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: "rotate(-90deg)" }}>
                            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                            <circle
                                cx="24" cy="24" r="20"
                                fill="none"
                                stroke="#0386EE"
                                strokeWidth="2"
                                strokeDasharray={2 * Math.PI * 20}
                                strokeDashoffset={2 * Math.PI * 20 * (1 - (currentStep + 1) / stepsLabels.length)}
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 0.5s ease" }}
                            />
                        </svg>
                        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
                            <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#0386EE" }}>
                                {Math.round(((currentStep + 1) / stepsLabels.length) * 100)}%
                            </Typography>
                        </Box>
                    </Box>
                    )}
                </Box>
                
                {showProgressIndicator && (
                    <VisualStepperComponent stepsLabels={stepsLabels} currentStep={currentStep} />
                )}

                <ProductBannerComponent
                    currentStep={currentStep}
                    banner={banner}
                    banner_text={banner_text}
                />
            </Box>
        </Grid>
    );
};

export default FormExplanationComponent;