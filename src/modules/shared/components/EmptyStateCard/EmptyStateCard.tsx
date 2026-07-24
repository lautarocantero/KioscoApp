import { Box, Typography, type Theme } from "@mui/material";
import NoisyCard from "../Cards/NoisyCard";
import PrimaryButtonComponent from "../Buttons/PrimaryButtonComponent";
import { useBreakpoint } from "../../../../hooks/ui/useBreakpoint";
import type { EmptyStateCardProps } from "@typings/ui/noContent.types";
import type { ReactNode } from "react";


const EmptyStateCard = ({
    imageSrc,
    imageAlt,
    title,
    description,
    button,
    height = "37em",
    centered = false,
}: EmptyStateCardProps): ReactNode => {
    
    const bp = useBreakpoint();
    const isMobile = bp === "xs";

    return (
        <Box
            component="section"
            aria-label={title}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 1 : 2,
                width: { xs: "100%", sm: "69%", md: "90%" },
                height,
                m: { xs: "3em auto", sm: centered ? "3em auto" : "3em 1em" },
            }}
        >
            <NoisyCard sx={{ height: "100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2.5,
                        p: 2.5,
                        height: "100%",
                        boxSizing: "border-box",
                        userSelect: "none",
                    }}
                >
                    <Box
                        component="img"
                        src={imageSrc}
                        alt={imageAlt}
                        aria-hidden="true"
                        draggable={false}
                        sx={{
                            width: { xs: 300, sm: 300, md: 400 },
                            height: { xs: 300, sm: 300, md: 400 },
                            flexShrink: 0,
                            mt: 2,
                            userSelect: "none",
                            pointerEvents: "none",
                        }}
                    />

                    <Box
                        component="header"
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                            <Typography
                                component="h2"
                                sx={(theme: Theme) => ({
                                    fontSize: { xs: theme?.typography?.h5?.fontSize, sm: theme?.typography?.h4?.fontSize },
                                    textAlign: { xs: "start", sm: "center" },
                                })}
                                variant="h2"
                            >
                                {title}
                            </Typography>
                            <Typography
                                component="p"
                                sx={(theme: Theme) => ({
                                    fontSize: { xs: theme?.typography?.body2?.fontSize, md: theme?.typography?.body1?.fontSize },
                                    textAlign: { xs: "start", sm: "center" },
                                })}
                                variant="h3"
                            >
                                {description}
                            </Typography>
                        </Box>
                        {button && (
                            <Box sx={{ userSelect: "auto" }}>
                                <PrimaryButtonComponent
                                    buttonText={button.buttonText}
                                    buttonOnClick={button.onButtonClick}
                                    buttonWidth="200px"
                                />
                            </Box>
                        )}
                    </Box>
                </Box>
            </NoisyCard>
        </Box>
    );
};

export default EmptyStateCard;