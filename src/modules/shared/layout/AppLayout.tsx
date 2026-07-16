import { Box } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";
import OptionsHeader from "./components/OptionsHeader";
import type { AppLayoutProps } from "@typings/ui/layout.types";

const AppLayout = ({
    children,
    isOptions,
    fullWidth,
    noCenter,
    noPadding,
    title,
    greetings,
    icon,
}: PropsWithChildren<AppLayoutProps>): ReactNode => {
    return (
        <Box
            component="main"
            sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: noCenter ? 0 : "3em",
                justifyContent: noCenter || fullWidth ? "flex-start" : "center",
                p: noPadding ? 0 : { xs: 2, sm: 3 },
                gap: { xs: "1.5em", sm: "2em" },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", sm: fullWidth ? "stretch" : "flex-start" },
                    width: fullWidth ? "100%" : { xs: "98%", sm: "90%", md: "720px" },
                    gap: "1em",
                }}
            >
                <OptionsHeader isOptions={isOptions} title={title} icon={icon} greetings={greetings} />

                {children}
            </Box>
        </Box>
    );
};

export default AppLayout;